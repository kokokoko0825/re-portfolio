import { ReactNode, useEffect } from "react";
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

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen, closeMenu]);
    
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
                    aria-hidden="true"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                />
            )}
            
            {/* メニュー本体 */}
            <div id="admin-mobile-menu" hidden={!isMenuOpen} className={`${styles.adminMobileMenu} ${isMenuOpen ? styles.adminMobileMenuOpen : ""}`}>
                <button type="button"
                    className={styles.adminCloseButton} 
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <nav aria-label="メイン" className={styles.adminMobileMenuLinks}>
                    <Link to="/admin" onClick={closeMenu}>Admin</Link>
                    <Link to="/admin/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/admin/works" onClick={closeMenu}>Works</Link>
                    <button type="button" onClick={handleLogout}>
                        ログアウト
                    </button>
                </nav>
            </div>
        </>
    );
}
