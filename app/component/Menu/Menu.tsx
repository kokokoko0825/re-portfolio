import React from "react";
import { ReactNode } from "react";
import * as styles from "./styles.css";

export const Menu = (): ReactNode => {
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={styles.frame}>
            <div
                className={styles.menuItem}
                onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "visible";
                }}
                onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "hidden";
                }}
                onClick={() => handleScroll("profile")}
            >
                <div className={styles.arrow}>➤</div>
                <div className={styles.text}>Profile</div>
            </div>
            <div
                className={styles.menuItem}
                onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "visible";
                }}
                onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "hidden";
                }}
                onClick={() => handleScroll("products")}
            >
                <div className={styles.arrow}>➤</div>
                <div className={styles.text}>Products</div>
            </div>
            <div
                className={styles.menuItem}
                onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "visible";
                }}
                onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "hidden";
                }}
                onClick={() => handleScroll("skill")}
            >
                <div className={styles.arrow}>➤</div>
                <div className={styles.text}>skill</div>
            </div>
            <div
                className={styles.menuItem}
                onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "visible";
                }}
                onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector(`.${styles.arrow}`) as HTMLElement;
                    if (arrow) arrow.style.visibility = "hidden";
                }}
                onClick={() => handleScroll("blog")}
            >
                <div className={styles.arrow}>➤</div>
                <div className={styles.text}>Blog</div>
            </div>
        </div>
    );
};