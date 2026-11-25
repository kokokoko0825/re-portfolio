import { globalStyle, style } from "@vanilla-extract/css";

// SSRと初回hydrationのDOMを揃え、表示だけをCSSで切り替える。
export const lightIcon = style({});
export const darkIcon = style({});

globalStyle(`:root ${darkIcon}`, { display: "block" });
globalStyle(`:root ${lightIcon}`, { display: "none" });
globalStyle(`:root[data-theme=light] ${darkIcon}`, { display: "none" });
globalStyle(`:root[data-theme=light] ${lightIcon}`, { display: "block" });
globalStyle(`:root:not([data-theme]) ${darkIcon}`, {
    "@media": { "(prefers-color-scheme: light)": { display: "none" } },
});
globalStyle(`:root:not([data-theme]) ${lightIcon}`, {
    "@media": { "(prefers-color-scheme: light)": { display: "block" } },
});
