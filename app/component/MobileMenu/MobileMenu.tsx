import { ReactNode } from "react";
import * as styles from "../Header/styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";

export function MobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useMenu();

    return (
        <>
            {isMenuOpen && (
                <div 
                    className={styles.mobileMenuOverlay} 
                    onClick={closeMenu}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeMenu();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close menu overlay"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                />
            )}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
                <button 
                    className={styles.closeButton} 
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <div className={styles.mobileMenuLinks}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/works" onClick={closeMenu}>Works</Link>
                </div>
            </div>
        </>
    );
} 