import { ReactNode } from "react";
import * as styles from "./styles.css";
import { BackGround } from "../BackGround/BackGround";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): ReactNode => {
    return (
        <div className={styles.container}>
            <BackGround />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}; 