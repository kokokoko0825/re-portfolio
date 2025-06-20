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
                        maxWidth: '300px',
                        fontFamily: 'monospace'
                    }}>
                        <div style={{fontWeight: 'bold', marginBottom: '5px'}}>🔍 Device Detection Debug</div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#ffeb3b'}}>Server Detection:</div>
                            <div>• Type: {serverDevice.deviceType}</div>
                            <div>• Mobile: {serverDevice.isMobile ? '✅' : '❌'}</div>
                            <div>• Tablet: {serverDevice.isTablet ? '✅' : '❌'}</div>
                            <div>• OS: {serverDevice.os}</div>
                            {serverDevice.detectionReason && (
                                <div style={{fontSize: '10px', color: '#ccc'}}>
                                    Reason: {serverDevice.detectionReason}
                                </div>
                            )}
                        </div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#4caf50'}}>Client Detection:</div>
                            <div>• Hydrated: {isClient ? '✅' : '❌'}</div>
                            <div>• Mobile: {isClient ? (clientIsMobile ? '✅' : '❌') : '⏳'}</div>
                            {isClient && typeof window !== 'undefined' && (
                                <div>• Width: {window.innerWidth}px</div>
                            )}
                        </div>
                        
                        <div style={{marginBottom: '8px'}}>
                            <div style={{color: '#ff9800'}}>Current State:</div>
                            <div>• Active: {isMobile ? '📱 Mobile' : '🖥️ Desktop'}</div>
                            <div>• Menu: {isMobile ? 'Hamburger' : 'Links'}</div>
                        </div>
                        
                        {serverDevice.userAgent && (
                            <div style={{marginTop: '8px', fontSize: '9px', color: '#999'}}>
                                <div>User-Agent:</div>
                                <div style={{wordBreak: 'break-all', lineHeight: '1.2'}}>
                                    {serverDevice.userAgent.substring(0, 120)}
                                    {serverDevice.userAgent.length > 120 && '...'}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <MobileMenu />
        </>
    );
}