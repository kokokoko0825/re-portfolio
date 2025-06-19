import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

interface WorksItemProps {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
}

export function WorksItem({ id, thumbnail, title, description }: WorksItemProps): ReactNode {
    return (
        <Link to={`/works/${id}`}>
            <div className={styles.worksItem}>
                <img src={thumbnail || "/public/images/icon.jpg"} alt="thumbnail" />
                <h2 style={{wordBreak: "break-word"}}>{title}</h2>
                <small style={{wordBreak: "break-word"}}>{description}</small>
            </div>
        </Link>
    );
}