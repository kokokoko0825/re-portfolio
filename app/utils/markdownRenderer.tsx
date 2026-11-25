import MarkdownIt from "markdown-it";
import { splitPhrases } from "./phraseText";
import { phrase as phraseClass } from "~/component/PhraseText.css";
import { vars } from "../styles/theme.css";
import { getHttpUrl } from "./httpUrl";

// Twitter埋め込みAPIの型定義
declare global {
    interface Window {
        twttr?: {
            widgets: {
                createTweet: (tweetId: string, container: HTMLElement, options?: {
                    conversation?: string;
                    theme?: string;
                }) => Promise<HTMLElement | null>;
            };
        };
    }
}

// リンクプレビューAPIレスポンスの型定義
interface LinkPreviewData {
    title: string;
    description: string;
    siteName: string;
    image?: string;
    favicon?: string;
    error?: string;
}

// フェンス内のコードは markdown-it の既定処理でエスケープする。
const md = new MarkdownIt();

// Ensure <pre> gets line-numbers class for Prism plugin
const originalFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const rendered = originalFence
        ? originalFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    return rendered.replace('<pre', '<pre class="line-numbers"');
};

// 見出しにidを付与（目次用アンカー）
function slugify(text: string): string {
    const slug = text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    return slug || "section";
}

md.renderer.rules.heading_open = (tokens, idx, _options, env) => {
    const token = tokens[idx];
    const tag = `h${Math.min(Number(token.tag.slice(1)) + 1, 6)}`;
    // 元の #〜#### を h2〜h5 にして目次対象にする
    if (tag === "h6") {
        return "<h6>";
    }
    const nextToken = tokens[idx + 1];
    const text =
        nextToken?.type === "inline" ? nextToken.content : "";
    // 見出しのテキストだけを処理し、リンク・強調・コードと目次のIDを保つ。
    for (const child of nextToken?.children ?? []) {
        if (child.type === "text") child.meta = { phraseHeading: true };
    }
    const baseSlug = slugify(text);
    const headingIds = (env as { headingIds?: Record<string, number> })
        .headingIds ??= {};
    const count = headingIds[baseSlug] ?? 0;
    headingIds[baseSlug] = count + 1;
    const id = count === 0 ? baseSlug : `${baseSlug}-${count}`;
    return `<${tag} id="${id}">`;
};

md.renderer.rules.heading_close = (tokens, idx) =>
    `</h${Math.min(Number(tokens[idx].tag.slice(1)) + 1, 6)}>\n`;

md.renderer.rules.text = (tokens, idx) => {
    const token = tokens[idx];
    return token.meta?.phraseHeading
        ? splitPhrases(token.content).map((phrase) => `<span class="${phraseClass}">${md.utils.escapeHtml(phrase)}</span>`).join("<wbr>")
        : md.utils.escapeHtml(token.content);
};

// 段落全体がURLまたは単一リンクのときだけ埋め込む。クエリとfragmentもURL APIで扱う。
function getEmbedParagraphs(content: string) {
    return md.parse(content, {}).flatMap((token, index, tokens) => {
        if (token.type !== "inline" || tokens[index - 1]?.type !== "paragraph_open") return [];
        const children = token.children ?? [];
        const linked = children.length === 3 && children[0].type === "link_open" && children[1].type === "text" && children[2].type === "link_close";
        const value = linked ? children[0].attrGet("href") : token.content.trim();
        const url = value && getHttpUrl(value);
        if (!url || /\s/.test(value)) return [];
        return [{ url: new URL(url), linked, paragraph: `<p>${md.renderer.renderInline(children, md.options, {})}</p>` }];
    });
}

// Markdownコンテンツをレンダリングし、URLを埋め込みコンポーネントに変換する関数
export function renderMarkdownWithEmbeds(content: string): { __html: string } {
    const env: { headingIds?: Record<string, number> } = {};
    // まず通常のMarkdownをレンダリング（見出しid用にenvを渡す）
    let html = md.render(content, env);
    // Prism line-numbers 用に <pre> にクラスを付与
    // class 未指定の <pre>
    html = html.replace(/<pre(?![^>]*class=)/g, '<pre class="line-numbers"');
    // 既に class がある <pre> には追記
    html = html.replace(/<pre([^>]*class=")([^"]*)"/g, '<pre$1$2 line-numbers"');
    
    for (const { url: parsed, linked, paragraph } of getEmbedParagraphs(content)) {
        const url = parsed.href;
        const hostname = parsed.hostname;
        const tweetId = ["x.com", "www.x.com", "twitter.com", "www.twitter.com", "mobile.twitter.com", "www.mobile.twitter.com"].includes(hostname)
            ? parsed.pathname.match(/^\/\w+\/status\/(\d+)\/?$/)?.[1] : undefined;
        const youtubeId = ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(hostname)
            ? (parsed.pathname === "/watch" ? parsed.searchParams.get("v") : parsed.pathname.match(/^\/shorts\/([\w-]+)\/?$/)?.[1])
            : ["youtu.be", "www.youtu.be"].includes(hostname) ? parsed.pathname.slice(1).replace(/\/$/, "") : undefined;
        const videoId = youtubeId && /^[\w-]{6,}$/.test(youtubeId) ? youtubeId : undefined;
        const presId = hostname === "docs.google.com" ? parsed.pathname.match(/^\/presentation\/d\/([\w-]+)(?:\/|$)/)?.[1] : undefined;
        if (tweetId) {
                // Twitter埋め込みウィジェットを挿入
                const embedHtml = `
                    <div class="twitter-embed-wrapper" style="
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        box-sizing: border-box;
                    ">
                        <div id="tweet-${tweetId}" style="
                            max-width: 520px;
                            width: 100%;
                            margin: 0;
                            padding: 0;
                        "></div>
                    </div>
                `;
                
            html = html.replaceAll(paragraph, () => embedHtml);
        } else if (videoId) {
            const fullUrl = url;
            const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

            const embedHtml = `
                <div class="youtube-embed-wrapper" style="
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                    margin: 2rem 0;
                ">
                    <a href="${md.utils.escapeHtml(fullUrl)}" target="_blank" rel="noopener noreferrer" class="youtube-embed" aria-label="YouTube で動画を見る: ${videoId}" style="
                        position: relative;
                        display: block;
                        width: 100%;
                        max-width: 640px;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid ${vars.color.borderColor};
                        background-color: ${vars.color.background};
                        aspect-ratio: 16 / 9;
                        text-decoration: none;
                        color: ${vars.color.text};
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <img src="${thumbnailUrl}" alt="YouTube thumbnail" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                        "/>
                        <div style="
                            position: absolute;
                            inset: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: radial-gradient(transparent, rgba(0,0,0,0.35));
                        ">
                            <svg class="youtube-play" viewBox="0 0 68 48" aria-hidden="true">
                                <path class="youtube-play-background" d="M66.52 7.74a8 8 0 0 0-5.64-5.66C56.62 1 34 1 34 1S11.38 1 7.12 2.08a8 8 0 0 0-5.64 5.66A84.2 84.2 0 0 0 0 24a84.2 84.2 0 0 0 1.48 16.26 8 8 0 0 0 5.64 5.66C11.38 47 34 47 34 47s22.62 0 26.88-1.08a8 8 0 0 0 5.64-5.66A84.2 84.2 0 0 0 68 24a84.2 84.2 0 0 0-1.48-16.26z"></path>
                                <path d="M45 24 27 14v20" fill="#fff"></path>
                            </svg>
                        </div>
                    </a>
                </div>
            `;

            html = html.replaceAll(paragraph, () => embedHtml);
        } else if (presId) {
            // Google Slides のプレゼンは preview 埋め込みにする（操作は最小限で簡易表示）
            const embedSrc = `https://docs.google.com/presentation/d/${presId}/preview`;
            const embedHtml = `
                <div class="gslides-embed-wrapper" style="
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                ">
                    <div style="
                        position: relative;
                        width: 100%;
                        max-width: 640px;
                        aspect-ratio: 16 / 9;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid ${vars.color.borderColor};
                        background-color: ${vars.color.background};
                    ">
                        <iframe src="${embedSrc}" allowfullscreen style="
                            position: absolute;
                            inset: 0;
                            width: 100%;
                            height: 100%;
                            border: 0;
                        "></iframe>
                    </div>
                </div>
            `;

            html = html.replaceAll(paragraph, () => embedHtml);
        } else if (!linked) {
            // リンク埋め込みコンポーネントを挿入
            const embedHtml = `
                <div class="link-embed-wrapper" style="
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                    margin: 2rem 0;
                ">
                    <div class="link-embed" style="
                        display: flex;
                        flex-direction: column;
                        max-width: 540px;
                        width: 100%;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid ${vars.color.borderColor};
                        background-color: ${vars.color.background};
                        text-decoration: none;
                        color: ${vars.color.text};
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)';this.styleBoxShadow='0 8px 25px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='';this.styleBoxShadow=''">
                        <div class="link-embed-content" style="
                            flex: 1;
                            min-width: 0;
                            overflow-wrap: anywhere;
                            width: 100%;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        ">
                            <div>
                                <h3 class="link-embed-title" style="

                                    color: ${vars.color.text};
                                ">リンクを読み込み中...</h3>
                                <p class="link-embed-description" style="
                                    color: ${vars.color.muted.foreground};
                                ">メタデータを取得中...</p>
                            </div>
                            <div class="link-embed-meta" style="
                                display: flex;
                                flex-direction: column;
                            ">
                                <span class="link-embed-url" style="
                                    color: ${vars.color.muted.foreground};
                                    word-break: break-all;
                                ">${md.utils.escapeHtml(url)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            html = html.replaceAll(paragraph, () => embedHtml);
        }
    }

    return { __html: html };
}

// 後方互換性のため、既存の関数名も維持
export const renderMarkdownWithTwitterEmbed = renderMarkdownWithEmbeds;

// Twitter埋め込みウィジェットを初期化する関数
export function initializeTwitterEmbeds(forceReinit = false): void {
    // 現在のテーマを取得（data-theme属性から）
    const getCurrentTheme = (): 'light' | 'dark' => {
        if (typeof window === 'undefined') return 'dark';
        const theme = document.documentElement.getAttribute('data-theme');
        return (theme === 'light' || theme === 'dark') ? theme : 'dark';
    };

    const currentTheme = getCurrentTheme();

    // Twitter埋め込みを初期化する内部関数
    const initTweets = () => {
        const tweetContainers = document.querySelectorAll('[id^="tweet-"]');
        tweetContainers.forEach((container) => {
            const tweetId = container.id.replace('tweet-', '');
            const htmlElement = container as HTMLElement;
            
            // 既に初期化済みかどうかをチェック（data属性で管理）
            const isInitialized = htmlElement.dataset.twitterInitialized === 'true';
            const savedTheme = htmlElement.dataset.twitterTheme;
            
            // 強制再初期化の場合、または未初期化の場合、またはテーマが変更された場合のみ再初期化
            const shouldReinit = forceReinit || !isInitialized || (savedTheme && savedTheme !== currentTheme);
            
            if (!shouldReinit && isInitialized && savedTheme === currentTheme) {
                return; // 既に初期化済みでテーマも同じ場合はスキップ
            }
            
            // 既存の埋め込みを削除（blockquote、iframe、またはtwitter-tweetクラスが存在する場合）
            const hasExistingEmbed = container.querySelector('blockquote') || 
                                    container.querySelector('iframe') || 
                                    container.querySelector('.twitter-tweet') ||
                                    container.children.length > 0;
            if (hasExistingEmbed) {
                container.innerHTML = '';
                // data属性もクリア
                delete htmlElement.dataset.twitterInitialized;
                delete htmlElement.dataset.twitterTheme;
            }
            
            // 新しい埋め込みを作成
            if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.createTweet(tweetId, htmlElement, {
                    conversation: 'none',
                    theme: currentTheme
                }).then(() => {
                    // 初期化済みマークを設定
                    htmlElement.dataset.twitterInitialized = 'true';
                    htmlElement.dataset.twitterTheme = currentTheme;
                }).catch((error) => {
                    console.error('Twitter埋め込みの作成に失敗しました:', error);
                });
            }
        });
    };

    // Twitter埋め込みスクリプトが既に読み込まれているかチェック
    if (typeof window !== 'undefined' && !window.twttr) {
        // スクリプトが既に読み込み中かチェック
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (existingScript) {
            // スクリプトが読み込み中の場合は、読み込み完了を待つ
            existingScript.addEventListener('load', () => {
                setTimeout(initTweets, 100);
            });
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
            // スクリプト読み込み後に埋め込みを初期化
            setTimeout(initTweets, 100);
        };
        document.head.appendChild(script);
    } else if (typeof window !== 'undefined' && window.twttr) {
        // 既にスクリプトが読み込まれている場合は直接初期化
        setTimeout(initTweets, 100);
    }
}

// リンク埋め込みを初期化する関数
export function initializeLinkEmbeds(): void {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            const linkEmbeds = document.querySelectorAll('.link-embed');
            linkEmbeds.forEach((embed) => {
                const element = embed as HTMLElement;
                if (element.dataset.linkInitialized) return;
                element.dataset.linkInitialized = "true";
                const urlElement = embed.querySelector('.link-embed-url');
                if (urlElement) {
                    const url = urlElement.textContent;
                    if (url && getHttpUrl(url)) {
                        // APIからメタデータを取得
                        fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
                            .then(response => response.json())
                            .then((data: unknown) => {
                                const linkData = data as LinkPreviewData;
                                if (linkData.error) {
                                    throw new Error(linkData.error);
                                }
                                
                                const titleElement = embed.querySelector('.link-embed-title');
                                const descriptionElement = embed.querySelector('.link-embed-description');
                                const metaElement = embed.querySelector('.link-embed-meta');
                                
                                if (titleElement) {
                                    titleElement.textContent = linkData.title;
                                }
                                if (descriptionElement) {
                                    descriptionElement.textContent = linkData.description;
                                }
                                if (metaElement) {
                                    const site = document.createElement('span');
                                    site.className = 'link-embed-site';
                                    site.style.color = vars.color.primary.DEFAULT;
                                    site.style.textTransform = 'uppercase';
                                    site.textContent = linkData.siteName;
                                    const link = document.createElement('span');
                                    link.className = 'link-embed-url';
                                    link.style.color = vars.color.muted.foreground;
                                    link.style.wordBreak = 'break-all';
                                    link.textContent = url;
                                    metaElement.replaceChildren(site, link);
                                }
                                
                                for (const [field, className] of [["image", "link-embed-image"], ["favicon", "link-embed-favicon"]] as const) {
                                    const value = linkData[field];
                                    const src = typeof value === "string" ? getHttpUrl(value) : undefined;
                                    if (!src) continue;
                                    const img = document.createElement("img");
                                    img.className = className;
                                    img.alt = "";
                                    img.loading = "lazy";
                                    img.addEventListener("error", () => img.remove());
                                    img.src = src;
                                    const parent = field === "image" ? embed : metaElement?.querySelector(".link-embed-site");
                                    parent?.insertBefore(img, parent.firstChild);
                                }

                                // リンクをクリック可能にする
                                embed.addEventListener('click', () => {
                                    window.open(url, '_blank', 'noopener,noreferrer');
                                });
                                (embed as HTMLElement).style.cursor = 'pointer';
                            })
                            .catch(error => {
                                console.error('Link preview error:', error);
                                const titleElement = embed.querySelector('.link-embed-title');
                                if (titleElement) {
                                    titleElement.textContent = 'リンクの情報を取得できませんでした';
                                }
                                
                                // フォールバック: 通常のリンクを表示
                                embed.addEventListener('click', () => {
                                    window.open(url, '_blank', 'noopener,noreferrer');
                                });
                                (embed as HTMLElement).style.cursor = 'pointer';
                            });
                    }
                }
            });
        }, 100);
    }
}

// すべての埋め込みを初期化する関数
export function initializeAllEmbeds(): void {
    initializeTwitterEmbeds();
    initializeLinkEmbeds();
}
