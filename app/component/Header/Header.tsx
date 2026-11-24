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
    const { isMenuOpen, toggleMenu } = useMenu();
    const { isMobile } = useDevice();
    const { theme, toggleTheme } = useTheme();
    
    // モバイル用のクラス名
    const mobileClass = isMobile ? styles.mobileView : '';
    const hamburgerIconSrc = isMenuOpen
        ? theme === "light"
            ? "/images/light_humberger-close.svg"
            : "/images/humberger-close.svg"
        : theme === "light"
            ? "/images/light_humberger.svg"
            : "/images/humberger.svg";
    const hamburgerAriaLabel = isMenuOpen ? "Close menu" : "Open menu";
    return (
        <>
            <header className={`${styles.header} ${mobileClass}`}>
                <div className={styles.homeIcon}>
                    <Link to="/" aria-label="ホーム">
                        <span className={styles.logo}>🐶🐱</span>
                    </Link>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    {/* テーマ切り替えボタン */}
                    <button type="button" className={styles.themeToggle}
                        onClick={toggleTheme} 
                        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} 
                    >
                        {theme === "light" ? (
                            <DarkModeOutlinedIcon sx={{ color: "#03031B" }} />
                        ) : (
                            <LightModeOutlinedIcon sx={{ color: "#DEDBFF" }} />
                        )}
                    </button>

                    <nav aria-label="メイン" className={styles.linkList}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                    </nav>
                    
                    {/* モバイルハンバーガーボタン */}
                    <button type="button" className={styles.hamburgerIcon}
                        onClick={toggleMenu} 
                        aria-label={hamburgerAriaLabel}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <img 
                            src={hamburgerIconSrc}
                            alt=""
                            style={{width: "25.9px", height: "17px"}}
                        />
                    </button>
                </div>
            </header>
            <MobileMenu />
        </>
    );
}
