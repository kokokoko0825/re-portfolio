import { ReactNode, useEffect, useState } from "react";
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
    
    // Headerと同じ判定ロジック
    const [directMobileCheck, setDirectMobileCheck] = useState<boolean | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.navigator) {
            const ua = window.navigator.userAgent.toLowerCase();
            const isMobileUA = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua);
            setDirectMobileCheck(isMobileUA);
        }
    }, []);

    // 複数の判定方法を組み合わせて最終判定
    let finalIsMobile: boolean;
    
    if (isClient) {
        finalIsMobile = clientIsMobile || (directMobileCheck === true);
    } else {
        if (serverDevice.contextInitialized) {
            finalIsMobile = serverDevice.isMobile;
        } else {
            finalIsMobile = false;
        }
    }

    // モバイルでない場合は何も表示しない
    if (!finalIsMobile) {
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