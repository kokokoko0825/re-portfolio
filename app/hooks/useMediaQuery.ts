import { useEffect, useState } from "react";

/**
 * メディアクエリの状態を監視するカスタムフック
 * サーバーサイドレンダリング時のハイドレーション問題を解決
 */
export function useMediaQuery(query: string): boolean {
    // 初期状態は false に設定（SSR時の安全なデフォルト）
    const [matches, setMatches] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行
        setIsClient(true);
        
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);
        
        // 初期値を設定
        setMatches(mediaQuery.matches);

        // メディアクエリの変更を監視
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handler);
        } else {
            // Legacy browsers
            mediaQuery.addListener(handler);
        }

        // クリーンアップ
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handler);
            } else {
                mediaQuery.removeListener(handler);
            }
        };
    }, [query]);

    // サーバーサイドレンダリング時は false を返す
    // クライアントサイドでハイドレーション後に正しい値を返す
    return isClient ? matches : false;
}

/**
 * モバイル画面サイズを検出するフック
 */
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 768px)');
}

/**
 * ハイドレーションが完了したかを検出するフック
 */
export function useIsClient(): boolean {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
} 