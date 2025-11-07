import { ReactNode } from "react";
import * as styles from "../adminHeader/styles.css";
import { Link, useNavigate } from "@remix-run/react";
import { useAdminMenu } from "../../contexts/AdminMenuContext";
import { useAuth } from "../../contexts/AuthContext";
import { useDevice } from "../../contexts/DeviceContext";

export function AdminMobileMenu(): ReactNode {
    const { isMenuOpen, closeMenu } = useAdminMenu();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { isMobile } = useDevice();
    
    // モバイルでない場合は何も表示しない
    if (!isMobile) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
        closeMenu();
    };

    return (
        <>
            {/* オーバーレイ - モバイルかつメニューが開いている時のみ表示 */}
            {isMenuOpen && (
                <div 
                    className={styles.adminMobileMenuOverlay} 
                    onClick={closeMenu}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeMenu();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close menu overlay"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                />
            )}
            
            {/* メニュー本体 */}
            <div className={`${styles.adminMobileMenu} ${isMenuOpen ? styles.adminMobileMenuOpen : ""}`}>
                <button 
                    className={styles.adminCloseButton} 
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <div className={styles.adminMobileMenuLinks}>
                    <Link to="/admin" onClick={closeMenu}>Admin</Link>
                    <Link to="/admin/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/admin/works" onClick={closeMenu}>Works</Link>
                    <button onClick={handleLogout}>
                        ログアウト
                    </button>
                </div>
            </div>
        </>
    );
} 