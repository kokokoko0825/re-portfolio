import { useState, ReactNode, useEffect } from "react";
import * as styles from "./styles.css";
import { Menu } from "../Menu/Menu";

export function Header(): ReactNode {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const smoothScroll = (e: MouseEvent): void => {
        e.preventDefault();
        const targetElement = e.currentTarget as HTMLAnchorElement;
        const href = targetElement.getAttribute("href");
        if (!href) return;

        const target = document.querySelector(href) as HTMLElement | null;
        if (!target) return;

        const position = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: position,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const buttons = document.querySelectorAll<HTMLAnchorElement>(`.${styles.menuItem}`);

        buttons.forEach((button) => {
            button.addEventListener("click", smoothScroll);
        });

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener("click", smoothScroll);
            });
        };
    }, []);

    const handleButtonClick = () => {
        console.log("ボタンがクリックされました");
        toggleMenu();
    };

    return (
        <>
            <div className={styles.header}>
                {menuOpen && (
                    <div className={styles.menu}>
                        <Menu />
                    </div>
                )}
                <button className={styles.menuButton} onClick={handleButtonClick}>
                    {menuOpen ? (
                        <div className={styles.closeButton}>
                            <div className={styles.closeButtonLine1}></div>
                            <div className={styles.closeButtonLine2}></div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                        </>
                    )}
                </button>
            </div>
        </>
    );
}