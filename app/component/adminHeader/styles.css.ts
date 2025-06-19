import { vars } from "../../styles/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

export const adminHeader = style ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    background: vars.color.background,
    boxSizing: "content-box",
    position: "fixed",
})

export const adminHomeIcon = style({
    display: "flex",
    padding: "10px 0px 10px 30px",
})

export const adminLinkList = style({
    display: "flex",
    padding: "10px 50px",
    alignItems: "center",
    gap: "30px",
    "@media": {
        "screen and (max-width: 768px)": {
            display: "none"
        }
    }
})

export const adminHamburgerIcon = style({
    display: "none",
    padding: "10px 30px",
    cursor: "pointer",
    color: vars.color.text,
    alignItems: "center",
    justifyContent: "center",
    "@media": {
        "screen and (max-width: 768px)": {
            display: "flex"
        }
    }
})

export const adminMobileMenu = style({
    position: "fixed",
    top: 0,
    right: 0,
    width: "70%",
    height: "100vh",
    background: vars.color.background,
    borderLeft: `2px solid ${vars.color.borderColor}`,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1000
})

export const adminMobileMenuOpen = style({
    transform: "translateX(0)"
})

export const adminCloseButton = style({
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    color: vars.color.text,
    fontSize: "24px",
    cursor: "pointer",
    marginBottom: "20px"
})

export const adminMobileMenuLinks = style({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px"
})

// グローバルスタイルでリンクのスタイリングを行う
globalStyle(`${adminMobileMenuLinks} a`, {
    color: vars.color.text,
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "opacity 0.2s ease"
})

globalStyle(`${adminMobileMenuLinks} a:hover`, {
    opacity: 0.8
})

globalStyle(`${adminMobileMenuLinks} button`, {
    background: "none",
    border: "none",
    color: vars.color.text,
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "0",
    margin: "0",
    textAlign: "left",
    transition: "opacity 0.2s ease"
})

globalStyle(`${adminMobileMenuLinks} button:hover`, {
    opacity: 0.8
})

export const adminMobileMenuOverlay = style({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "none"
})

export const adminMobileMenuOverlayOpen = style({
    display: "block"
})