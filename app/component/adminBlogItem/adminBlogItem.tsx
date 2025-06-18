import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { BlogItem } from "../blogItem";
import { Timestamp } from "firebase/firestore";

interface AdminBlogItemProps {
    id: string;
    title: string;
    updatedAt: Timestamp | null;
}

export function AdminBlogItem({ id, title, updatedAt }: AdminBlogItemProps): ReactNode {
    return (
        <div className={styles.adminBlogItem}>
            <BlogItem id={id} title={title} updatedAt={updatedAt} />
            <div className={styles.adminItemIcon}>
                <Link to={`/blog/edit/${id}`}>
                    <h1>✏️</h1>
                </Link>
                <h1>🗑️</h1>
            </div>
        </div>
    );
}