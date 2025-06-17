import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { WorksItem } from "../worksItem/worksItem";

export function AdminWorkItem() : ReactNode {
    return (
        <div className={styles.adminWorkItem}>
        <WorksItem />
        <div className={styles.adminItemIcon}>
            <Link to="/admin/blog/$blogId">
                <h1>✏️</h1>
            </Link>
            <h1>🗑️</h1>
        </div>
    </div>
    );
}