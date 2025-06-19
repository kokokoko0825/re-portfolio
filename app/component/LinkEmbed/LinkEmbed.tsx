import { ReactNode, useEffect, useState } from "react";
import * as styles from "./styles.css";

interface LinkEmbedProps {
    url: string;
}

interface LinkMetadata {
    title: string;
    description: string;
    image: string;
    siteName: string;
    url: string;
}

export function LinkEmbed({ url }: LinkEmbedProps): ReactNode {
    const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                // プロキシAPIを使用してメタデータを取得
                const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
                
                if (!response.ok) {
                    throw new Error('メタデータの取得に失敗しました');
                }
                
                const data = await response.json() as LinkMetadata;
                setMetadata(data);
            } catch (err) {
                console.error('リンクメタデータの取得エラー:', err);
                setError('リンクの情報を取得できませんでした');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, [url]);

    if (isLoading) {
        return (
            <div className={styles.linkEmbedContainer}>
                <div className={styles.linkEmbedLoading}>
                    <p>リンクを読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error || !metadata) {
        return (
            <div className={styles.linkEmbedContainer}>
                <div className={styles.linkEmbedError}>
                    <p>{error || 'リンクの情報を取得できませんでした'}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallbackLink}>
                        {url}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.linkEmbedContainer}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.linkEmbed}>
                {metadata.image && (
                    <div className={styles.linkEmbedImage}>
                        <img src={metadata.image} alt={metadata.title} />
                    </div>
                )}
                <div className={styles.linkEmbedContent}>
                    <h3 className={styles.linkEmbedTitle}>{metadata.title}</h3>
                    {metadata.description && (
                        <p className={styles.linkEmbedDescription}>{metadata.description}</p>
                    )}
                    <div className={styles.linkEmbedMeta}>
                        <span className={styles.linkEmbedSite}>{metadata.siteName}</span>
                        <span className={styles.linkEmbedUrl}>{url}</span>
                    </div>
                </div>
            </a>
        </div>
    );
} 