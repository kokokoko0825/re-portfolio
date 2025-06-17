import { ReactNode } from "react";
import { Timestamp } from "firebase/firestore";
import * as styles from "./styles.css";

interface BlogItemProps {
    title: string;
    updatedAt: Timestamp | null;
}

export function BlogItem({ title, updatedAt }: BlogItemProps): ReactNode {
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
        <div className={styles.blogItem}>
            <small>{formatDate(updatedAt)}</small>
            <h2>{title}</h2>
        </div>
    );
}