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

// デフォルト（ダークモード）
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

// Lightモード（data-theme="light"またはOS設定がライトでユーザー設定がない場合）
globalStyle(":root[data-theme='light']", {
    vars: {
        [vars.color.text]: "#03031B",
        [vars.color.background]: "#F2F1FF",
        [vars.color.borderColor]: "#9496AD",
    }
});

// OS設定がライトのときに色を上書き（ユーザーが手動で変更していない場合のみ）
globalStyle(":root:not([data-theme])", {
    "@media": {
        "(prefers-color-scheme: light)": {
            vars: {
                [vars.color.text]: "#03031B",
                [vars.color.background]: "#F2F1FF",
                [vars.color.borderColor]: "#9496AD",
            }
        }
    }
});