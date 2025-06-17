import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export function AdminHeader(): ReactNode {
    return (
        <div className={styles.adminHeader}>
            <div className={styles.adminHomeIcon}>
                <Link to="/admin">
                    <h1>🐶🐱.admin</h1>
                </Link>
            </div>
            <div className={styles.adminLinkList} style={{textDecoration: "none"}}>
                <Link to="/admin">Admin</Link>
                <Link to="/admin/blog">Blog</Link>
                <Link to="/admin/works">Works</Link>
            </div>
        </div>
    );
}