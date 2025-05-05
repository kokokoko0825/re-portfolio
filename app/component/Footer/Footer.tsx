import { ReactNode } from "react";
import * as styles from "./styles.css";

export function Footer(): ReactNode {
    return (
        <div className={styles.footer}>
            <a className={styles.text}>&copy; 2025 Koshi Tanaka</a>
        </div>
    )
}