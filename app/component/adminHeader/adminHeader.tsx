import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link, useNavigate } from "@remix-run/react";
import { useAuth } from "../../contexts/AuthContext";
import { vars } from "../../styles/theme.css";
import { useAdminMenu } from "../../contexts/AdminMenuContext";
import { AdminMobileMenu } from "../AdminMobileMenu/AdminMobileMenu";

export function AdminHeader(): ReactNode {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { toggleMenu } = useAdminMenu();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <div className={styles.adminHeader}>
                <div className={styles.adminHomeIcon}>
                    <Link to="/admin">
                        <h1>🐶🐱.admin</h1>
                    </Link>
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
                    <img src="/images/humberger.svg" alt="Menu" style={{width: "25.9px", height: "17px"}}/>
                </div>
            </div>
            <AdminMobileMenu />
        </>
    );
}