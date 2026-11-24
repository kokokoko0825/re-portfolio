import { ReactNode, useEffect } from "react";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { useDevice } from "../../contexts/DeviceContext";
import * as styles from "../Header/styles.css";

export function MobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useMenu();
    const { isMobile } = useDevice();

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen, closeMenu]);
    
    // モバイルでない場合は何も表示しない
    if (!isMobile) {
        return null;
    }

    return (
        <>
            {/* オーバーレイ - モバイルかつメニューが開いている時のみ表示 */}
            {isMenuOpen && (
                <div 
                    className={styles.mobileMenuOverlay}
                    onClick={closeMenu}
                    aria-hidden="true"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                />
            )}
            
            {/* メニュー本体 */}
            <div id="mobile-menu" hidden={!isMenuOpen} className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
                <button type="button"
                    className={styles.closeButton}
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <nav aria-label="メイン" className={styles.mobileMenuLinks}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/works" onClick={closeMenu}>Works</Link>
                </nav>
            </div>
        </>
    );
}
