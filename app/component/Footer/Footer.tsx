import { ReactNode } from "react";
import * as styles from "./styles.css";

export function Footer(): ReactNode {
    return (
        <div className={styles.footer}>
            <small>&copy; 2025 Koshi Tanaka</small>
        </div>
    )
}