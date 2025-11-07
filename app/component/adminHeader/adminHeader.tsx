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
    const { toggleMenu } = useAdminMenu();
    const { isMobile } = useDevice();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // モバイル用のクラス名
    const mobileClass = isMobile ? styles.mobileView : '';

    return (
        <>
            <div className={`${styles.adminHeader} ${mobileClass}`}>
                <div className={styles.adminHomeIcon}>
                    <Link to="/admin">
                        <h1>🐶🐱.admin</h1>
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

                    <div className={styles.adminLinkList} style={{textDecoration: "none"}}>
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
                                fontSize: "16px",
                                padding: "0",
                                margin: "0"
                            }}
                        >
                            ログアウト
                        </button>
                    </div>
                    
                    {/* モバイルハンバーガーボタン */}
                    <div 
                        className={styles.adminHamburgerIcon} 
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
            <AdminMobileMenu />
        </>
    );
}