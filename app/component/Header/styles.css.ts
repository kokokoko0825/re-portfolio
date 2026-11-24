import { typeStyle, space, layout, mobile } from "~/styles/tokens";
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

export const mobileView = style({
    // モバイル表示時のスタイル
})

export const homeIcon = style({
    display: "flex",
    padding: `${space[8]} 0 ${space[8]} ${layout.pageInset}`,
    "@media": { [mobile]: { paddingLeft: layout.mobile.pageInset } },
})

export const linkList = style({
    display: "flex",
    padding: `${space[8]} ${layout.pageInset}`,
    alignItems: "flex-start",
    gap: space[32],
    "@media": {
        [mobile]: {
            display: "none"
        }
    }
})

export const themeToggle = style({
    background: "none", border: "none", borderRadius: 0, gap: 0,
    display: "flex",
    padding: `${space[8]} ${space[20]}`,
    cursor: "pointer",
    color: vars.color.text,
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease",
    "@media": {
        [mobile]: {
            padding: `${space[8]} ${space[16]}`
        }
    }
})

globalStyle(`${themeToggle}:hover`, {
    opacity: 0.8
})

// ダークモードの時にテーマカラーボタンの色をtextcolorに設定
globalStyle(`:root[data-theme='dark'] ${themeToggle}`, {
    color: vars.color.text
})

// MUIアイコンの色を確実に適用（ダークモード）
globalStyle(`:root[data-theme='dark'] ${themeToggle} svg`, {
    color: vars.color.text,
    fill: vars.color.text
})

// ライトモードの時も明示的に設定
globalStyle(`:root[data-theme='light'] ${themeToggle} svg`, {
    color: vars.color.text,
    fill: vars.color.text
})

export const hamburgerIcon = style({
    background: "none", border: "none", borderRadius: 0, gap: 0,
    display: "none",
    padding: `${space[8]} ${space[32]}`,
    cursor: "pointer",
    color: vars.color.text,
    alignItems: "center",
    justifyContent: "center",
    "@media": {
        [mobile]: {
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
    padding: space[20],
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
    ...typeStyle("uiBody"),
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    color: vars.color.text,

    cursor: "pointer",
    marginBottom: space[20]
})

export const mobileMenuLinks = style({
    display: "flex",
    flexDirection: "column",
    gap: space[20],
    padding: space[20]
})

// グローバルスタイルでリンクのスタイリングを行う
globalStyle(`${mobileMenuLinks} a`, {
    color: vars.color.text,
    textDecoration: "none",
    ...typeStyle("subheadline"),
    fontSize: "1.25rem",
    display: "flex",
    alignItems: "center",
    minHeight: space[48],
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
globalStyle(`${linkList} a`, {
    ...typeStyle("subheadline"), display: "flex", alignItems: "center", minHeight: "2.75rem",
});

export const logo = style(typeStyle("largeTitle"));
globalStyle(`${homeIcon} a, ${linkList} a`, { color: vars.color.text, textDecoration: "none" });
globalStyle(`${themeToggle} svg`, { width: "25px", height: "25px", "@media": { [mobile]: { width: "15px" } } });

globalStyle("[hidden]", { display: "none !important" });
