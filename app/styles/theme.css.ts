import { createGlobalTheme, createThemeContract, globalStyle } from "@vanilla-extract/css";

export const vars = createThemeContract({
    color: {
        background: "",
        text: "",
        borderColor: "",
        muted: {
            foreground: "",
        },
        primary: {
            DEFAULT: "",
        },
    },
    typography: {
        fontFamily: {
        },
    },
});

createGlobalTheme(":root", vars, {
    color: {
        background: "#03031B",
        text: "#DEDBFF",
        borderColor: "#2C2E47",
        muted: {
            foreground: "#999",
        },
        primary: {
            DEFAULT: "#007acc",
        },
    },
    typography: {
        fontFamily: {
        },
    },
});

// Lightモード（OS設定がライト）のときに色を上書き
globalStyle(":root", {
    "@media": {
        "(prefers-color-scheme: light)": {
            vars: {
                [vars.color.text]: "#03031B",
                [vars.color.background]: "#F2F1FF",
            }
        }
    }
});