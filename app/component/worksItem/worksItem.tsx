import { ReactNode } from "react";
import * as styles from "./styles.css";

interface WorksItemProps {
    thumbnail: string;
    title: string;
    description: string;
}

export function WorksItem({ thumbnail, title, description }: WorksItemProps): ReactNode {
    return (
        <div className={styles.worksItem}>
            <img src={thumbnail || "/public/images/icon.jpg"} alt="thumbnail" />
            <h2>{title}</h2>
            <small>{description}</small>
        </div>
    );
}