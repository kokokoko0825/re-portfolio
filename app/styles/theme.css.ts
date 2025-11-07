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
        codeBlock: {
            background: "",
            text: "",
            border: "",
            lineNumber: "",
            tokens: {
                comment: "",
                punctuation: "",
                property: "",
                boolean: "",
                selector: "",
                operator: "",
                atrule: "",
                function: "",
                regex: "",
            },
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
        codeBlock: {
            background: "#0f111a",
            text: "#DEDBFF",
            border: "#2C2E47",
            lineNumber: "#6b6f85",
            tokens: {
                comment: "#6b6f85",
                punctuation: "#b4b8d1",
                property: "#f4bf75",
                boolean: "#f4bf75",
                selector: "#c6ffdd",
                operator: "#b4b8d1",
                atrule: "#7fffd4",
                function: "#a2e8ff",
                regex: "#ff9ac1",
            },
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
        [vars.color.muted.foreground]: "#5B5D72",
        [vars.color.primary.DEFAULT]: "#2D5BFF",
        [vars.color.codeBlock.background]: "#F5F6FF",
        [vars.color.codeBlock.text]: "#1E1F3A",
        [vars.color.codeBlock.border]: "#C9CAE0",
        [vars.color.codeBlock.lineNumber]: "#8A8DA8",
        [vars.color.codeBlock.tokens.comment]: "#7C819F",
        [vars.color.codeBlock.tokens.punctuation]: "#52557A",
        [vars.color.codeBlock.tokens.property]: "#A05E12",
        [vars.color.codeBlock.tokens.boolean]: "#8B2D1B",
        [vars.color.codeBlock.tokens.selector]: "#1F6A39",
        [vars.color.codeBlock.tokens.operator]: "#52557A",
        [vars.color.codeBlock.tokens.atrule]: "#2F4FB2",
        [vars.color.codeBlock.tokens.function]: "#7A1FB2",
        [vars.color.codeBlock.tokens.regex]: "#9C234C",
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
                [vars.color.muted.foreground]: "#5B5D72",
                [vars.color.primary.DEFAULT]: "#2D5BFF",
                [vars.color.codeBlock.background]: "#F5F6FF",
                [vars.color.codeBlock.text]: "#1E1F3A",
                [vars.color.codeBlock.border]: "#C9CAE0",
                [vars.color.codeBlock.lineNumber]: "#8A8DA8",
                [vars.color.codeBlock.tokens.comment]: "#7C819F",
                [vars.color.codeBlock.tokens.punctuation]: "#52557A",
                [vars.color.codeBlock.tokens.property]: "#A05E12",
                [vars.color.codeBlock.tokens.boolean]: "#8B2D1B",
                [vars.color.codeBlock.tokens.selector]: "#1F6A39",
                [vars.color.codeBlock.tokens.operator]: "#52557A",
                [vars.color.codeBlock.tokens.atrule]: "#2F4FB2",
                [vars.color.codeBlock.tokens.function]: "#7A1FB2",
                [vars.color.codeBlock.tokens.regex]: "#9C234C",
            }
        }
    }
});