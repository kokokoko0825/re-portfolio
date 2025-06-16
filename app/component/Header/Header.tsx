import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export function Header(): ReactNode {
    return (
        <div className={styles.header}>
            <div className={styles.homeIcon}>
                <Link to="/">
                    <h1>🐶🐱</h1>
                </Link>
            </div>
            <div className={styles.linkList} style={{textDecoration: "none"}}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/works">Works</Link>
            </div>
        </div>
    );
}