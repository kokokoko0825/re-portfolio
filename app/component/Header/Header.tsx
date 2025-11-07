import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useDevice } from "../../contexts/DeviceContext";
import { useTheme } from "../../contexts/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();
    const { isMobile } = useDevice();
    const { theme, toggleTheme } = useTheme();
    
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
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    {/* テーマ切り替えボタン */}
                    <div 
                        className={styles.themeToggle}
                        onClick={toggleTheme} 
                        role="button" 
                        tabIndex={0} 
                        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleTheme();
                            }
                        }}
                    >
                        {theme === "light" ? (
                            <DarkModeOutlinedIcon sx={{ color: "#03031B" }} />
                        ) : (
                            <LightModeOutlinedIcon sx={{ color: "#DEDBFF" }} />
                        )}
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
                        <img 
                            src={theme === "light" ? "/images/light_humberger.svg" : "/images/humberger.svg"} 
                            alt="Menu" 
                            style={{width: "25.9px", height: "17px"}}
                        />
                    </div>
                </div>
            </div>
            <MobileMenu />
        </>
    );
}