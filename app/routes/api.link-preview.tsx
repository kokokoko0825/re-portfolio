import { json } from "@remix-run/cloudflare";
import { getHttpUrl } from "../utils/httpUrl";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

interface LinkMetadata {
    title: string;
    description: string;
    image: string;
    favicon: string;
    siteName: string;
    url: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return json({ error: 'URL parameter is required' }, { status: 400 });
    }

    if (!getHttpUrl(targetUrl)) return json({ error: "Invalid HTTP(S) URL" }, { status: 400 });

    try {
        // 外部サイトからメタデータを取得
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const pageUrl = response.url || targetUrl;
        
        // メタデータを抽出
        const title = extractMetaContent(html, 'title') || 
                     extractMetaContent(html, 'og:title') || 
                     extractMetaContent(html, 'twitter:title') || 
                     'No title';
        
        const description = extractMetaContent(html, 'description') || 
                           extractMetaContent(html, 'og:description') || 
                           extractMetaContent(html, 'twitter:description') || 
                           '';
        
        const image = extractMetaContent(html, 'og:image') || 
                     extractMetaContent(html, 'twitter:image') || 
                     '';
        
        const siteName = extractMetaContent(html, 'og:site_name') || 
                        new URL(targetUrl).hostname || 
                        'Unknown site';

        const metadata: LinkMetadata = {
            title,
            description,
            image: resolveMetadataUrl(image, pageUrl),
            favicon: resolveMetadataUrl(extractFavicon(html) || "/favicon.ico", pageUrl),
            siteName,
            url: targetUrl,
        };

        return json(metadata);
    } catch (error) {
        console.error('Link preview error:', error);
        return json({ 
            error: 'Failed to fetch link preview',
            url: targetUrl 
        }, { status: 500 });
    }
}

function extractMetaContent(html: string, property: string): string | null {
    let regex: RegExp;
    
    if (property === 'title') {
        regex = /<title[^>]*>([^<]+)<\/title>/i;
    } else {
        regex = new RegExp(`<meta[^>]*(?:name|property)=["']${property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*content=["']([^"']*)["']`, 'i');
    }
    
    const match = html.match(regex);
    return match ? match[1] : null;
}
function resolveMetadataUrl(value: string, pageUrl: string): string {
    if (!value) return "";
    try {
        return getHttpUrl(new URL(value, pageUrl).href) ?? "";
    } catch {
        return "";
    }
}

function extractFavicon(html: string): string | undefined {
    for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
        const rel = tag.match(/\brel\s*=\s*["']([^"']*)["']/i)?.[1];
        if (!rel || !/(?:^|\s)(?:icon|apple-touch-icon)(?:\s|$)/i.test(rel)) continue;
        const href = tag.match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1];
        if (href) return href;
    }
}
