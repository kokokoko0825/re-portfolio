import { ReactNode } from "react";
import { Timestamp } from "firebase/firestore";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

interface BlogItemProps {
    id: string;
    title: string;
    createdAt: Timestamp | null;
    externalUrl?: string;
}

export function BlogItem({ id, title, createdAt, externalUrl }: BlogItemProps): ReactNode {
    // FirestoreのTimestampを日付文字列に変換
    const formatDate = (timestamp: Timestamp | null) => {
        if (!timestamp) return "";

        const date = timestamp.toDate();
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const content = (
        <div className={styles.blogItem}>
            <small>{formatDate(createdAt)}</small>
            <h2>{title}</h2>
        </div>
    );

    if (externalUrl) {
        return (
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" style={{ width: "100%", textDecoration: "none", display: "block" }}>
                {content}
            </a>
        );
    }

    return (
        <Link to={`/blog/${id}`} style={{ width: "100%", textDecoration: "none", display: "block" }}>
            {content}
        </Link>
    );
}