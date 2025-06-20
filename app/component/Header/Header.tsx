import { ReactNode, useEffect, useState } from "react";
import * as styles from "./styles.css";
import { Link, useLocation } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useEffect, useState } from "react";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    
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
                
                {/* 拡張デバッグ情報（開発時のみ） */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{
                        position: 'fixed',
                        top: '60px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.9)',
                        color: 'white',
                        padding: '10px',
                        fontSize: '11px',
                        borderRadius: '5px',
                        zIndex: 9999,
                        maxWidth: '350px',
                        fontFamily: 'monospace'
                    }}>
                        <div style={{fontWeight: 'bold', marginBottom: '5px'}}>🔍 Header Debug Info</div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#ffeb3b'}}>Server Detection:</div>
                            <div>• Type: {serverDevice.deviceType}</div>
                            <div>• Mobile: {serverDevice.isMobile ? '✅' : '❌'}</div>
                            <div>• Context Init: {serverDevice.contextInitialized ? '✅' : '❌'}</div>
                            {serverDevice.detectionReason && (
                                <div style={{fontSize: '10px', color: '#ccc'}}>
                                    {serverDevice.detectionReason}
                                </div>
                            )}
                        </div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#4caf50'}}>Client Detection:</div>
                            <div>• Hydrated: {isClient ? '✅' : '❌'}</div>
                            <div>• Media Query: {isClient ? (clientIsMobile ? '✅' : '❌') : '⏳'}</div>
                            <div>• User-Agent: {directMobileCheck === null ? '⏳' : (directMobileCheck ? '✅' : '❌')}</div>
                            {isClient && typeof window !== 'undefined' && (
                                <div>• Width: {window.innerWidth}px</div>
                            )}
                        </div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#ff9800'}}>Final Decision:</div>
                            <div>• Source: {isClient ? 'Client' : 'Server'}</div>
                            <div>• Result: {finalIsMobile ? '📱 Mobile' : '🖥️ Desktop'}</div>
                            <div>• Logic: {isClient ? 
                                `MediaQuery(${clientIsMobile}) OR UserAgent(${directMobileCheck})` : 
                                `ServerContext(${serverDevice.isMobile})`}
                            </div>
                        </div>
                        
                        <div style={{marginTop: '8px', fontSize: '10px', color: finalIsMobile ? '#4caf50' : '#f44336'}}>
                            <div>Current Display:</div>
                            <div>• Desktop Menu: {!finalIsMobile ? 'VISIBLE' : 'HIDDEN'}</div>
                            <div>• Mobile Button: {finalIsMobile ? 'VISIBLE' : 'HIDDEN'}</div>
                        </div>
                    </div>
                )}
            </div>
            <MobileMenu />
        </>
    );
}