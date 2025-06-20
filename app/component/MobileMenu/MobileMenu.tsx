import { ReactNode, useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { useIsMobile, useIsClient } from "../../hooks/useMediaQuery";
import { useServerSafeDevice } from "../../contexts/DeviceContext";

export function MobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useMenu();
    const clientIsMobile = useIsMobile();
    const isClient = useIsClient();
    const serverDevice = useServerSafeDevice();
    
    // Headerと同じ判定ロジック - より詳細な判定
    const [directMobileCheck, setDirectMobileCheck] = useState<boolean | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.navigator) {
            const ua = window.navigator.userAgent.toLowerCase();
            const isMobileUA = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua);
            const isSmallScreen = window.innerWidth <= 768;
            setDirectMobileCheck(isMobileUA || isSmallScreen);
        }
    }, []);

    // 複数の判定方法を組み合わせて最終判定
    let finalIsMobile: boolean;
    
    if (isClient) {
        // クライアントサイドでは複数の判定を組み合わせ
        finalIsMobile = clientIsMobile || (directMobileCheck === true);
    } else {
        // サーバーサイドではDeviceContextの値を使用
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
            {/* オーバーレイ - モバイルかつメニューが開いている時のみ表示 */}
            {isMenuOpen && (
                <div 
                    style={{
                        display: "block",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999
                    }}
                    onClick={closeMenu}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeMenu();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close menu overlay"
                />
            )}
            
            {/* メニュー本体 */}
            <div 
                style={{
                    display: "flex",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "70%",
                    height: "100vh",
                    background: "#03031B", // テーマのbackground色
                    borderLeft: "2px solid #2C2E47", // テーマのborderColor
                    flexDirection: "column",
                    padding: "20px",
                    transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.3s ease-in-out",
                    zIndex: 1000
                }}
            >
                <button 
                    onClick={closeMenu}
                    aria-label="Close menu"
                    style={{
                        alignSelf: "flex-end",
                        background: "none",
                        border: "none",
                        color: "#DEDBFF", // テーマのtext色
                        fontSize: "24px",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >
                    ✕
                </button>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    paddingTop: "20px"
                }}>
                    <Link 
                        to="/home" 
                        onClick={closeMenu}
                        style={{
                            color: "#DEDBFF",
                            textDecoration: "none",
                            fontSize: "18px",
                            padding: "10px 0",
                            borderBottom: "1px solid #2C2E47"
                        }}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/about" 
                        onClick={closeMenu}
                        style={{
                            color: "#DEDBFF",
                            textDecoration: "none",
                            fontSize: "18px",
                            padding: "10px 0",
                            borderBottom: "1px solid #2C2E47"
                        }}
                    >
                        About
                    </Link>
                    <Link 
                        to="/blog" 
                        onClick={closeMenu}
                        style={{
                            color: "#DEDBFF",
                            textDecoration: "none",
                            fontSize: "18px",
                            padding: "10px 0",
                            borderBottom: "1px solid #2C2E47"
                        }}
                    >
                        Blog
                    </Link>
                    <Link 
                        to="/works" 
                        onClick={closeMenu}
                        style={{
                            color: "#DEDBFF",
                            textDecoration: "none",
                            fontSize: "18px",
                            padding: "10px 0",
                            borderBottom: "1px solid #2C2E47"
                        }}
                    >
                        Works
                    </Link>
                </div>
            </div>
        </>
    );
} 