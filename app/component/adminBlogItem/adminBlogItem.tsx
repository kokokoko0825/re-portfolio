import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { BlogItem } from "../blogItem";

export function AdminBlogItem() : ReactNode {
    return (
        <div className={styles.adminBlogItem}>
        <BlogItem />
        <div className={styles.adminItemIcon}>
            <Link to="/admin/blog/$blogId">
                <h1>✏️</h1>
            </Link>
            <h1>🗑️</h1>
        </div>
    </div>
    );
}