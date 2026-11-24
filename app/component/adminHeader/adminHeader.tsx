import { typeStyle } from "~/styles/tokens";
import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link, useNavigate } from "@remix-run/react";
import { useAuth } from "../../contexts/AuthContext";
import { vars } from "../../styles/theme.css";
import { useAdminMenu } from "../../contexts/AdminMenuContext";
import { AdminMobileMenu } from "../AdminMobileMenu/AdminMobileMenu";
import { useDevice } from "../../contexts/DeviceContext";
import { useTheme } from "../../contexts/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export function AdminHeader(): ReactNode {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { isMenuOpen, toggleMenu } = useAdminMenu();
    const { isMobile } = useDevice();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

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
            <header className={`${styles.adminHeader} ${mobileClass}`}>
                <div className={styles.adminHomeIcon}>
                    <Link to="/" aria-label="ホーム">
                        <span className={styles.logo}>🐶🐱.admin</span>
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

                    <nav aria-label="メイン" className={styles.adminLinkList} style={{textDecoration: "none"}}>
                        <Link to="/admin">Admin</Link>
                        <Link to="/admin/blog">Blog</Link>
                        <Link to="/admin/works">Works</Link>
                        <button 
                            onClick={handleLogout}
                            style={{
                                background: "none",
                                border: "none",
                                color: vars.color.text,
                                cursor: "pointer",
                                ...typeStyle("uiBody"),
                                padding: "0",
                                margin: "0",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            ログアウト
                        </button>
                    </nav>

                    {/* モバイルハンバーガーボタン */}
                    <button type="button" className={styles.adminHamburgerIcon}
                        onClick={toggleMenu} 
                        aria-label={hamburgerAriaLabel}
                        aria-expanded={isMenuOpen}
                        aria-controls="admin-mobile-menu"
                    >
                        <img 
                            src={hamburgerIconSrc}
                            alt=""
                            style={{width: "25.9px", height: "17px"}}
                        />
                    </button>
                </div>
            </header>
            <AdminMobileMenu />
        </>
    );
}
