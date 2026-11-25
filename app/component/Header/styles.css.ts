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
    boxSizing: "border-box",
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
    padding: `${space[8]} 0 ${space[8]} ${space[20]}`,
    alignItems: "flex-start",
    gap: space[32],
    "@media": {
        [mobile]: {
            display: "none"
        }
    }
})

export const controls = style({
    display: "flex",
    alignItems: "center",
    paddingRight: layout.pageInset,
    "@media": { [mobile]: { paddingRight: layout.mobile.pageInset } },
});

const iconButton = style({
    background: "none", border: "none", borderRadius: 0, gap: 0,
    display: "flex",
    width: "44px", height: "44px", minWidth: "44px", minHeight: "44px",
    flexShrink: 0, boxSizing: "border-box", padding: 0,
    cursor: "pointer", color: vars.color.text,
    alignItems: "center", justifyContent: "center",
    ":hover": { opacity: 0.8 },
});

export const themeToggle = style([iconButton]);
export const hamburgerIcon = style([iconButton, {
    display: "none",
    "@media": { [mobile]: { display: "flex" } },
}]);

globalStyle(`${iconButton} svg`, {
    width: "24px", height: "24px", flexShrink: 0, fill: "currentColor",
});

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

globalStyle("[hidden]", { display: "none !important" });
