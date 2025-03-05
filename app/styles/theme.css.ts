import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
    color: {
        background: "",
        text: "",
        lightText: "",
        highlight: "",
        headerBottom: "",
        footerBg: "",
        btnBg: "",
        bgLine: "",
        bgMask: "",
    },
    typography: {
        fontFamily: {
            eng: "",
            jap: "",
        },
    },
});

createGlobalTheme(":root", vars, {
    color: {
        background: "#000000",
        text: "#3C4063",
        lightText: "#FFFFFF",
        highlight: "#8467D7",
        headerBottom: "#EEE9F9",
        footerBg: "#9BA2A8",
        btnBg: "#C4CED4",
        bgLine: "#8467D7",
        bgMask: "#F9F7FF",
    },
    typography: {
        fontFamily: {
            eng: "Jersey 10",
            jap: "DotGothic16",
        },
    },
});