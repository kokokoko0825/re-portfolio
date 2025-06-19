import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

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