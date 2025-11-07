import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useDevice } from "../../contexts/DeviceContext";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const { isMobile } = useDevice();
    
    // モバイル用のクラス名
    const mobileClass = isMobile ? styles.mobileView : '';
    return (
        <>
            <div className={`${styles.header} ${mobileClass}`}>
                <div className={styles.homeIcon}>
                    <Link to="/">
                        <h1>🐶🐱</h1>
                    </Link>
                </div>
                <div className={styles.linkList}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                </div>
                
                {/* モバイルハンバーガーボタン */}
                <div 
                    className={styles.hamburgerIcon}
                    onClick={toggleMenu} 
                    role="button" 
                    tabIndex={0} 
                    aria-label="Open menu" 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            toggleMenu();
                        }
                    }}
                >
                    <picture>
                        <source media="(prefers-color-scheme: light)" srcSet="/images/light_humberger.svg" />
                        <img src="/images/humberger.svg" alt="Menu" style={{width: "25.9px", height: "17px"}}/>
                    </picture>
                </div>
            </div>
            <MobileMenu />
        </>
    );
}