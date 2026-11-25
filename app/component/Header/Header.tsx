import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useDevice } from "../../contexts/DeviceContext";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export function Header(): ReactNode {
    const { isMenuOpen, toggleMenu } = useMenu();
    const { isMobile } = useDevice();
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
                    <ThemeToggle className={styles.themeToggle} />

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
