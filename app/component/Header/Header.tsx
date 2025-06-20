import { ReactNode, useEffect, useState } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useServerSafeDevice } from "../../contexts/DeviceContext";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const serverDevice = useServerSafeDevice();
    const [isMobile, setIsMobile] = useState(serverDevice.isMobile);
    
    // クライアントサイドでの画面サイズ検出
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // 初期チェック
        checkMobile();
        
        // リサイズイベントのリスナーを追加
        window.addEventListener('resize', checkMobile);
        
        // クリーンアップ
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.homeIcon}>
                    <Link to="/home">
                        <h1>🐶🐱</h1>
                    </Link>
                </div>
                <div className={styles.linkList} style={{
                    textDecoration: "none",
                    display: isMobile ? 'none' : 'flex'
                }}>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                </div>
                
                {/* モバイルハンバーガーボタン */}
                <div 
                    className={styles.hamburgerIcon}
                    style={{ display: isMobile ? 'flex' : 'none' }}
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