import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { useMenu } from "../../contexts/MenuContext";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export function Header(): ReactNode {
    const { toggleMenu } = useMenu();

    return (
        <>
            {/* クリティカルCSSのクラス名も追加 */}
            <div className={`${styles.header} header-container`}>
                <div className={`${styles.homeIcon} home-icon`}>
                    <Link to="/">
                        <h1>🐶🐱</h1>
                    </Link>
                </div>
                <div className={`${styles.linkList} desktop-menu`} style={{textDecoration: "none"}}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/works">Works</Link>
                </div>
                <div 
                    className={`${styles.hamburgerIcon} hamburger-icon`}
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
            <MobileMenu />
        </>
    );
}