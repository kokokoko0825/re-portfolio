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

const md = new MarkdownIt();

// Twitter/X URLを検出する正規表現（x.comとtwitter.comの両方に対応）
const TWITTER_URL_REGEX = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/\d+/g;

// URLを正規化する関数（x.comをtwitter.comに変換）
function normalizeTwitterUrl(url: string): string {
    return url.replace(/^https?:\/\/(?:www\.)?x\.com/, 'https://twitter.com');
}

// ツイートIDを抽出する関数
function extractTweetId(url: string): string | null {
    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
    return match ? match[1] : null;
}

// Markdownコンテンツをレンダリングし、Twitter URLを埋め込みコンポーネントに変換する関数
export function renderMarkdownWithTwitterEmbed(content: string): { __html: string } {
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
                    ">
                        <div id="tweet-${tweetId}" style="
                            width: 100%;
                        "></div>
                    </div>
                `;
                
                html = html.replace(regex, embedHtml);
            }
        });
    }
    
    return { __html: html };
}

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