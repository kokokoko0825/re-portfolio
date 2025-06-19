import { ReactNode } from "react";
import { Timestamp } from "firebase/firestore";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

interface BlogItemProps {
    id: string;
    title: string;
    createdAt: Timestamp | null;
}

export function BlogItem({ id, title, createdAt }: BlogItemProps): ReactNode {
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

    return (
        <Link to={`/blog/${id}`} style={{ width: "100%", textDecoration: "none", display: "block" }}>
            <div className={styles.blogItem}>
                <small>{formatDate(createdAt)}</small>
                <h2>{title}</h2>
            </div>
        </Link>
    );
}