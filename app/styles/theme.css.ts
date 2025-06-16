import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
    color: {
        background: "",
        text: "",
        borderColor: "",
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
    },
    typography: {
        fontFamily: {
        },
    },
});