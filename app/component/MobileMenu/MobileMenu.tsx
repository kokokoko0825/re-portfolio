import { ReactNode } from "react";
import * as styles from "../Header/styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { useIsMobile, useIsClient } from "../../hooks/useMediaQuery";
import { useServerSafeDevice } from "../../contexts/DeviceContext";

export function MobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useMenu();
    const clientIsMobile = useIsMobile();
    const isClient = useIsClient();
    const serverDevice = useServerSafeDevice();

    // サーバーサイドの情報を最初に使用し、ハイドレーション後はクライアントサイドの判定を使用
    const isMobile = isClient ? clientIsMobile : serverDevice.isMobile;

    // モバイルでない場合は何も表示しない
    if (!isMobile) {
        return null;
    }

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
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/works" onClick={closeMenu}>Works</Link>
                </div>
            </div>
        </>
    );
} 