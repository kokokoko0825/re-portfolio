import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { WorksItem } from "../worksItem/worksItem";

interface AdminWorkItemProps {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
}

export function AdminWorkItem({ id, thumbnail, title, description }: AdminWorkItemProps): ReactNode {
    return (
        <div className={styles.adminWorkItem}>
            <WorksItem id={id} thumbnail={thumbnail} title={title} description={description} />
            <div className={styles.adminItemIcon}>
                <Link to={`/work/edit/${id}`}>
                    <h1>✏️</h1>
                </Link>
                <h1>🗑️</h1>
            </div>
        </div>
    );
}