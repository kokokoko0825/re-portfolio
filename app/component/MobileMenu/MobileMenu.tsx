import { ReactNode } from "react";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { useDevice } from "../../contexts/DeviceContext";
import * as styles from "../Header/styles.css";

export function MobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useMenu();
    const { isMobile } = useDevice();
    
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
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeMenu();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close menu overlay"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                />
            )}
            
            {/* メニュー本体 */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
                <button 
                    className={styles.closeButton}
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <div className={styles.mobileMenuLinks}>
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/works" onClick={closeMenu}>Works</Link>
                </div>
            </div>
        </>
    );
}