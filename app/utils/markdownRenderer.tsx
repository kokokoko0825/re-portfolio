import MarkdownIt from "markdown-it";

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
    error?: string;
}

const md = new MarkdownIt({
    highlight: (code) => {
        // SSRではハイライトしない（クライアントで highlightAllUnder を実行）
        // markdown-it が自動でエスケープしてくれるため生のコードを返す
        return code;
    },
});

// Ensure <pre> gets line-numbers class for Prism plugin
const originalFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const rendered = originalFence
        ? originalFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    return rendered.replace('<pre', '<pre class="line-numbers"');
};

// Twitter/X URLを検出する正規表現（x.comとtwitter.comの両方に対応）
const TWITTER_URL_REGEX = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/\d+/g;

// 通常のURLを検出する正規表現（Twitter URLを除く）
const GENERAL_URL_REGEX = /https?:\/\/(?!.*(?:twitter\.com|x\.com)\/\w+\/status\/)[^\s<>"{}|\\^`[\]]+/g;

// YouTube URL を検出する正規表現（youtube.com / youtu.be / shorts に対応）
const YOUTUBE_URL_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/g;

// Google Slides URL を検出する正規表現
const GOOGLE_SLIDES_URL_REGEX = /https?:\/\/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/g;

// <p>URL</p> または <p><a href="URL">URL</a></p> 双方にマッチする段落置換用の正規表現を生成
// 汎用URL段落マッチ（現在未使用）

function isYouTubeUrl(url: string): boolean {
    // g フラグのない使い捨て正規表現で安定評価
    const re = /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/;
    return re.test(url);
}

// YouTubeの段落置換用: videoId を含むURL（生テキスト or a要素）を段落単位で検出
function buildYouTubeParagraphRegex(videoId: string): RegExp {
    const id = videoId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const baseUrlPattern = `https?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/(?:watch\\?v=|shorts\\/)|youtu\\.be\\/)${id}`;
    // テキストURLはクエリ・フラグメント付きも許容。a要素はhrefが上記ベースパターンを含めばOK。
    const textUrl = `${baseUrlPattern}(?:[^<\\s]*)?`;
    const anchor = `<a[^>]*href=["']${baseUrlPattern}[^"']*["'][^>]*>[^<]*<\\/a>`;
    return new RegExp(`<p>(?:${textUrl}|${anchor})<\\/p>`, 'g');
}

// Google Slides 段落置換用: presentationId を含むURL（生テキスト or a要素）を段落単位で検出
function buildGoogleSlidesParagraphRegex(presentationId: string): RegExp {
    const id = presentationId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const baseUrlPattern = `https?:\\/\\/docs\\.google\\.com\\/presentation\\/d\\/${id}`;
    const textUrl = `${baseUrlPattern}(?:[^<\\s]*)?`;
    const anchor = `<a[^>]*href=["']${baseUrlPattern}[^"']*["'][^>]*>[^<]*<\\/a>`;
    return new RegExp(`<p>(?:${textUrl}|${anchor})<\\/p>`, 'g');
}

function isGoogleSlidesUrl(url: string): boolean {
    const re = /https?:\/\/docs\.google\.com\/presentation\/d\/[a-zA-Z0-9_-]+/;
    return re.test(url);
}

// URLを正規化する関数（x.comをtwitter.comに変換）
function normalizeTwitterUrl(url: string): string {
    return url.replace(/^https?:\/\/(?:www\.)?x\.com/, 'https://twitter.com');
}

// ツイートIDを抽出する関数
function extractTweetId(url: string): string | null {
    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
    return match ? match[1] : null;
}

// URLがTwitter URLかどうかを判定する関数
function isTwitterUrl(url: string): boolean {
    return TWITTER_URL_REGEX.test(url);
}

// Markdownコンテンツをレンダリングし、URLを埋め込みコンポーネントに変換する関数
export function renderMarkdownWithEmbeds(content: string): { __html: string } {
    // まず通常のMarkdownをレンダリング
    let html = md.render(content);
    // Prism line-numbers 用に <pre> にクラスを付与
    // class 未指定の <pre>
    html = html.replace(/<pre(?![^>]*class=)/g, '<pre class="line-numbers"');
    // 既に class がある <pre> には追記
    html = html.replace(/<pre([^>]*class=")([^"]*)"/g, '<pre$1$2 line-numbers"');
    
    // Twitter/X URLを検出して埋め込みコンポーネントに変換
    const twitterUrls = content.match(TWITTER_URL_REGEX);
    
    if (twitterUrls) {
        twitterUrls.forEach((url) => {
            // URLを正規化
            const normalizedUrl = normalizeTwitterUrl(url);
            const tweetId = extractTweetId(normalizedUrl);
            
            if (tweetId) {
                // URLをエスケープしてHTML内で安全に使用
                const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`<p>${escapedUrl}</p>`, 'g');
                
                // Twitter埋め込みウィジェットを挿入
                const embedHtml = `
                    <div class="twitter-embed-wrapper" style="
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        box-sizing: border-box;
                    ">
                        <div id="tweet-${tweetId}" style="
                            max-width: 600px;
                            width: 100%;
                        "></div>
                    </div>
                `;
                
                html = html.replace(regex, embedHtml);
            }
        });
    }
    
    // YouTube URL を検出してサムネイル埋め込みに変換
    const youtubeMatches = Array.from(content.matchAll(YOUTUBE_URL_REGEX));
    if (youtubeMatches.length > 0) {
        youtubeMatches.forEach((match) => {
            const fullUrl = match[0];
            const videoId = match[1];
            if (!videoId) return;

            // URLをエスケープしてHTML内で安全に使用
            const regex = buildYouTubeParagraphRegex(videoId);

            const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

            const embedHtml = `
                <div class="youtube-embed-wrapper" style="
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                    margin: 2rem 0;
                ">
                    <a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="youtube-embed" style="
                        position: relative;
                        display: block;
                        width: 100%;
                        max-width: 800px;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #2C2E47;
                        background-color: #000;
                        aspect-ratio: 16 / 9;
                        text-decoration: none;
                        color: inherit;
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
                            <div style="
                                width: 68px;
                                height: 48px;
                                background: rgba(0,0,0,0.6);
                                border-radius: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">
                                <svg viewBox="0 0 68 48" width="38" aria-hidden="true">
                                    <path d="M66.52 7.74a8 8 0 0 0-5.64-5.66C56.62 1 34 1 34 1S11.38 1 7.12 2.08a8 8 0 0 0-5.64 5.66A84.2 84.2 0 0 0 0 24a84.2 84.2 0 0 0 1.48 16.26 8 8 0 0 0 5.64 5.66C11.38 47 34 47 34 47s22.62 0 26.88-1.08a8 8 0 0 0 5.64-5.66A84.2 84.2 0 0 0 68 24a84.2 84.2 0 0 0-1.48-16.26z" fill="#212121" fill-opacity="0.8"></path>
                                    <path d="M45 24 27 14v20" fill="#fff"></path>
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            html = html.replace(regex, embedHtml);
        });
    }

    // Google Slides を検出して簡易埋め込みに変換
    const slidesMatches = Array.from(content.matchAll(GOOGLE_SLIDES_URL_REGEX));
    if (slidesMatches.length > 0) {
        slidesMatches.forEach((match) => {
            const presId = match[1];
            if (!presId) return;

            const regex = buildGoogleSlidesParagraphRegex(presId);
            // Google Slides のプレゼンは preview 埋め込みにする（操作は最小限で簡易表示）
            const embedSrc = `https://docs.google.com/presentation/d/${presId}/preview`;
            const embedHtml = `
                <div class="gslides-embed-wrapper" style="
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                    margin: 2rem 0;
                ">
                    <div style="
                        position: relative;
                        width: 100%;
                        max-width: 800px;
                        aspect-ratio: 16 / 9;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #2C2E47;
                        background-color: #000;
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

            html = html.replace(regex, embedHtml);
        });
    }

    // 通常のURLを検出して埋め込みコンポーネントに変換
    const generalUrls = content.match(GENERAL_URL_REGEX);
    
    if (generalUrls) {
        generalUrls.forEach((url) => {
            // Twitter URLは既に処理済みなのでスキップ
            if (isTwitterUrl(url)) {
                return;
            }
            // YouTube URL は別途処理済みなのでスキップ（gフラグのない検査）
            if (isYouTubeUrl(url)) {
                return;
            }
            // Google Slides は別途処理済みなのでスキップ
            if (isGoogleSlidesUrl(url)) {
                return;
            }
            
            // URLをエスケープしてHTML内で安全に使用
            const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`<p>${escapedUrl}</p>`, 'g');
            
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
                        max-width: 600px;
                        width: 100%;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #2C2E47;
                        background-color: #03031B;
                        text-decoration: none;
                        color: inherit;
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div class="link-embed-content" style="
                            flex: 1;
                            width: 100%;
                            box-sizing: border-box;
                            padding: 1rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        ">
                            <div>
                                <h3 class="link-embed-title" style="
                                    font-size: 1.1rem;
                                    font-weight: 600;
                                    margin: 0 0 0.5rem 0;
                                    color: #DEDBFF;
                                    line-height: 1.4;
                                ">リンクを読み込み中...</h3>
                                <p class="link-embed-description" style="
                                    font-size: 0.9rem;
                                    color: #999;
                                    margin: 0 0 0.5rem 0;
                                    line-height: 1.4;
                                ">メタデータを取得中...</p>
                            </div>
                            <div class="link-embed-meta" style="
                                display: flex;
                                flex-direction: column;
                                gap: 0.25rem;
                            ">
                                <span class="link-embed-url" style="
                                    font-size: 0.75rem;
                                    color: #999;
                                    word-break: break-all;
                                ">${url}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            html = html.replace(regex, embedHtml);
        });
    }
    
    return { __html: html };
}

// 後方互換性のため、既存の関数名も維持
export const renderMarkdownWithTwitterEmbed = renderMarkdownWithEmbeds;

// Twitter埋め込みウィジェットを初期化する関数
export function initializeTwitterEmbeds(): void {
    // Twitter埋め込みスクリプトが既に読み込まれているかチェック
    if (typeof window !== 'undefined' && !window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
            // スクリプト読み込み後に埋め込みを初期化
            setTimeout(() => {
                const tweetContainers = document.querySelectorAll('[id^="tweet-"]');
                tweetContainers.forEach((container) => {
                    const tweetId = container.id.replace('tweet-', '');
                    if (window.twttr && window.twttr.widgets) {
                        window.twttr.widgets.createTweet(tweetId, container as HTMLElement, {
                            conversation: 'none',
                            theme: 'dark'
                        });
                    }
                });
            }, 100);
        };
        document.head.appendChild(script);
    } else if (typeof window !== 'undefined' && window.twttr) {
        // 既にスクリプトが読み込まれている場合は直接初期化
        setTimeout(() => {
            const tweetContainers = document.querySelectorAll('[id^="tweet-"]');
            tweetContainers.forEach((container) => {
                const tweetId = container.id.replace('tweet-', '');
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.createTweet(tweetId, container as HTMLElement, {
                        conversation: 'none',
                        theme: 'dark'
                    });
                }
            });
        }, 100);
    }
}

// リンク埋め込みを初期化する関数
export function initializeLinkEmbeds(): void {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            const linkEmbeds = document.querySelectorAll('.link-embed');
            linkEmbeds.forEach((embed) => {
                const urlElement = embed.querySelector('.link-embed-url');
                if (urlElement) {
                    const url = urlElement.textContent;
                    if (url) {
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
                                    metaElement.innerHTML = `
                                        <span style="
                                            font-size: 0.8rem;
                                            font-weight: 500;
                                            color: #007acc;
                                            text-transform: uppercase;
                                            letter-spacing: 0.5px;
                                        ">${linkData.siteName}</span>
                                        <span style="
                                            font-size: 0.75rem;
                                            color: #999;
                                            word-break: break-all;
                                        ">${url}</span>
                                    `;
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