import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useIsMobile, useIsClient } from "../../hooks/useMediaQuery";
import { useServerSafeDevice } from "../../contexts/DeviceContext";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const clientIsMobile = useIsMobile();
    const isClient = useIsClient();
    const serverDevice = useServerSafeDevice();

    // サーバーサイドの情報を最初に使用し、ハイドレーション後はクライアントサイドの判定を使用
    const isMobile = isClient ? clientIsMobile : serverDevice.isMobile;

    return (
        <>
            <div className={styles.header}>
                <div className={styles.homeIcon}>
                    <Link to="/">
                        <h1>🐶🐱</h1>
                    </Link>
                </div>
                
                {/* デスクトップメニュー - サーバーサイドでも正確に判定 */}
                <div 
                    className={styles.linkList} 
                    style={{
                        textDecoration: "none",
                        display: !isMobile ? "flex" : "none"
                    }}
                >
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                </div>
                
                {/* モバイルハンバーガーボタン - サーバーサイドでも正確に判定 */}
                <div 
                    className={styles.hamburgerIcon}
                    style={{
                        display: isMobile ? "flex" : "none"
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
                
                {/* デバッグ情報（開発時のみ） */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{
                        position: 'fixed',
                        top: '60px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '5px',
                        fontSize: '10px',
                        borderRadius: '3px',
                        zIndex: 9999
                    }}>
                        Server: {serverDevice.isMobile ? 'Mobile' : 'Desktop'}<br/>
                        Client: {isClient ? (clientIsMobile ? 'Mobile' : 'Desktop') : 'Pending'}<br/>
                        Active: {isMobile ? 'Mobile' : 'Desktop'}
                    </div>
                )}
            </div>
            <MobileMenu />
        </>
    );
}