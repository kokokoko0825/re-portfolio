import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import * as styles from "./styles.css";

interface TwitterEmbedProps {
    url: string;
}

export function TwitterEmbed({ url }: TwitterEmbedProps): ReactNode {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme();

    // URLからツイートIDを抽出する関数
    const extractTweetId = (url: string): string | null => {
        // x.comとtwitter.comの両方に対応
        const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
        return match ? match[1] : null;
    };

    const tweetId = extractTweetId(url);

    useEffect(() => {
        if (!tweetId) {
            setError("無効なTwitter URLです");
            setIsLoading(false);
            return;
        }

        let cancelled = false;
        // Twitter埋め込みスクリプトを動的に読み込み
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
            if (cancelled) return;
            const container = document.getElementById(`tweet-${tweetId}`);
            if (!container) return;
            // 初回stateはdark固定なので、描画済みCSSと同じテーマを参照する。
            const currentTheme = document.documentElement.dataset.theme
                ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            // [at]ts-expect-error - Twitter埋め込みAPIはグローバルに定義される
            if (window.twttr) {
                container.replaceChildren();
                window.twttr.widgets.createTweet(tweetId, container, {
                    conversation: 'none',
                    theme: currentTheme
                }).then((el: HTMLElement | null) => {
                    if (cancelled) return;
                    if (el) {
                        setIsLoading(false);
                    } else {
                        setError("ツイートの読み込みに失敗しました");
                        setIsLoading(false);
                    }
                });
            }
        };
        script.onerror = () => {
            if (cancelled) return;
            setError("Twitter埋め込みの読み込みに失敗しました");
            setIsLoading(false);
        };

        document.head.appendChild(script);

        return () => {
            cancelled = true;
            script.remove();
        };
    }, [tweetId, theme]);

    if (!tweetId) {
        return (
            <div className={styles.twitterEmbedError}>
                <p>無効なTwitter URLです</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.twitterEmbedError}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.twitterEmbedContainer}>
            {isLoading && (
                <div className={styles.twitterEmbedLoading}>
                    <p>ツイートを読み込み中...</p>
                </div>
            )}
            <div id={`tweet-${tweetId}`} className={styles.twitterEmbed} />
        </div>
    );
}
