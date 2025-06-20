import { vars } from "~/styles/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

export const header = style ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    background: vars.color.background,
    boxSizing: "content-box",
    position: "fixed",
    zIndex: 1001,
})

export const homeIcon = style({
    display: "flex",
    padding: "10px 0px 10px 30px",
})

export const linkList = style({
    display: "flex",
    padding: "10px 50px",
    alignItems: "flex-start",
    gap: "30px",
    "@media": {
        "screen and (max-width: 768px)": {
            display: "none"
        }
    }
})

export const hamburgerIcon = style({
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

export const mobileMenu = style({
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
    zIndex: 1000,
    // デスクトップでは完全に非表示にする
    "@media": {
        "screen and (min-width: 769px)": {
            display: "none"
        }
    }
})

export const mobileMenuOpen = style({
    transform: "translateX(0)"
})

export const closeButton = style({
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    color: vars.color.text,
    fontSize: "24px",
    cursor: "pointer",
    marginBottom: "20px"
})

export const mobileMenuLinks = style({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px"
})

// グローバルスタイルでリンクのスタイリングを行う
globalStyle(`${mobileMenuLinks} a`, {
    color: vars.color.text,
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "opacity 0.2s ease"
})

globalStyle(`${mobileMenuLinks} a:hover`, {
    opacity: 0.8
})

export const mobileMenuOverlay = style({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "none",
    // デスクトップでは完全に非表示にする
    "@media": {
        "screen and (min-width: 769px)": {
            display: "none !important"
        }
    }
})

export const mobileMenuOverlayOpen = style({
    display: "block",
    "@media": {
        "screen and (min-width: 769px)": {
            display: "none !important"
        }
    }
})