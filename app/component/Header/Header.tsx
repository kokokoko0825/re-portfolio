import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useIsMobile, useIsClient } from "../../hooks/useMediaQuery";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const isMobile = useIsMobile();
    const isClient = useIsClient();

    // ハイドレーション完了前は従来のCSSメディアクエリに依存
    // ハイドレーション完了後はJavaScriptでの判定を使用
    const showDesktopMenu = isClient ? !isMobile : true;
    const showMobileButton = isClient ? isMobile : true;

    return (
        <>
            <div className={styles.header}>
                <div className={styles.homeIcon}>
                    <Link to="/">
                        <h1>🐶🐱</h1>
                    </Link>
                </div>
                
                {/* デスクトップメニュー */}
                <div 
                    className={styles.linkList} 
                    style={{
                        textDecoration: "none",
                        display: showDesktopMenu ? "flex" : "none"
                    }}
                >
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                </div>
                
                {/* モバイルハンバーガーボタン */}
                <div 
                    className={styles.hamburgerIcon}
                    style={{
                        display: showMobileButton ? "flex" : "none"
                    }}
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
                    <img src="/images/humberger.svg" alt="Menu" style={{width: "25.9px", height: "17px"}}/>
                </div>
            </div>
            <MobileMenu />
        </>
    );
}