import { ReactNode } from "react";
import { Timestamp } from "firebase/firestore";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { DateText } from "../DateText";

interface BlogItemProps {
    id: string;
    title: string;
    createdAt: Timestamp | null;
    externalUrl?: string;
    tags?: string[];
}

export function BlogItem({ id, title, createdAt, externalUrl, tags = [] }: BlogItemProps): ReactNode {
    return (
        <div className={styles.blogItem}>
            <DateText value={createdAt} />
            <h2 className={styles.title}>
                {externalUrl ? (
                    <a className={styles.titleLink} href={externalUrl} target="_blank" rel="noopener noreferrer">{title}</a>
                ) : (
                    <Link className={styles.titleLink} to={`/blog/${id}`}>{title}</Link>
                )}
            </h2>
            {tags.length > 0 && (
                <div className={styles.tagList}>
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            to={`/blog?tag=${encodeURIComponent(tag)}`}
                            className={styles.tagChip}
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );

}
