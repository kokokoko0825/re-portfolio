import { ReactNode } from "react";
import * as styles from "./styles.css";

export function BlogItem() : ReactNode {
    return (
        <div className={styles.blogItem}>
            <small>2025-06-15</small>
            <h2>Article Title</h2>
        </div>
    );
}