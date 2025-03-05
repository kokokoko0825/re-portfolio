import type { ReactNode } from "react";
import * as styles from "./styles.css";

export function Hero(): ReactNode {
    return (
        <div className={styles.hero}>
            <div className={styles.title}>Koshi Quest(仮)</div>
        </div>
    );
}