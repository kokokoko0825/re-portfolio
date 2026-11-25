import { ReactNode, useEffect, useState } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useDevice } from "../../contexts/DeviceContext";
import { useTheme } from "../../contexts/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export function Header(): ReactNode {
    const { isMenuOpen, toggleMenu } = useMenu();
    const { isMobile } = useDevice();
    const { theme, toggleTheme } = useTheme();
    
    const [isDark, setIsDark] = useState<boolean>();
    useEffect(() => {
        setIsDark(document.documentElement.dataset.theme === "dark");
    }, [theme]);

    // モバイル用のクラス名
    const mobileClass = isMobile ? styles.mobileView : '';
    const hamburgerAriaLabel = isMenuOpen ? "Close menu" : "Open menu";
    return (
        <>
            <header className={`${styles.header} ${mobileClass}`}>
                <div className={styles.homeIcon}>
                    <Link to="/" aria-label="ホーム">
                        <span className={styles.logo}>🐶🐱</span>
                    </Link>
                </div>
                <div className={styles.controls}>
                    {/* テーマ切り替えボタン */}
                    <button type="button" className={styles.themeToggle}
                        onClick={toggleTheme} 
                        aria-label="テーマを切り替え"
                        aria-pressed={isDark}
                    >
                        <DarkModeOutlinedIcon className={styles.moonIcon} />
                        <LightModeOutlinedIcon className={styles.sunIcon} />
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
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </header>
            <MobileMenu />
        </>
    );
}
