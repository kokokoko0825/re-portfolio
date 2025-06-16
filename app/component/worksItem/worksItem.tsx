import { ReactNode } from "react";
import * as styles from "./styles.css";

export function WorksItem() : ReactNode {
    return (
        <div className={styles.worksItem}>
            <img src="/public/images/icon.jpg" alt="works"></img>
            <h2>Work Title</h2>
            <small>description</small>
        </div>
    );
}