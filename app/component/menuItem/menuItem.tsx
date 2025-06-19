import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export function MenuItem(): ReactNode {
    return (
        <div className={styles.menuItem}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/works">Works</Link>
        </div>
    );
}