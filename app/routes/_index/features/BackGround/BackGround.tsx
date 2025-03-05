import type { ReactNode } from "react";
import * as styles from "./styles.css";

export function BackGround({ children }: { children?: ReactNode }): ReactNode {
    return (
        <div className={styles.backGround}>
            {children}
        </div>
    );
}