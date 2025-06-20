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

const md = new MarkdownIt();

// Twitter/X URLを検出する正規表現（x.comとtwitter.comの両方に対応）
const TWITTER_URL_REGEX = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/\d+/g;

// 通常のURLを検出する正規表現（Twitter URLを除く）
const GENERAL_URL_REGEX = /https?:\/\/(?!.*(?:twitter\.com|x\.com)\/\w+\/status\/)[^\s<>"{}|\\^`[\]]+/g;

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
    
    // 通常のURLを検出して埋め込みコンポーネントに変換
    const generalUrls = content.match(GENERAL_URL_REGEX);
    
    if (generalUrls) {
        generalUrls.forEach((url) => {
            // Twitter URLは既に処理済みなのでスキップ
            if (isTwitterUrl(url)) {
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