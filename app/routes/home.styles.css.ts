import { typeStyle, space, layout } from "~/styles/tokens";
import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const Home = style({
    display: "flex",
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    gap: layout.sectionGap,
    "@media": { "screen and (max-width: 768px)": { gap: layout.mobile.sectionGap } },
    backgroundColor: vars.color.background,
})

export const mobileView = style({})

export const item = style({
    display: "flex",
    // モバイルファーストのアプローチ - デフォルトでモバイルサイズに設定
    paddingTop: `calc(${space[96]} + ${space[24]})`,
    flexDirection: "column",
    alignItems: "center",
    gap: layout.mobile.sectionGap,
    "@media": {
        // デスクトップサイズはメディアクエリで上書き
        "screen and (min-width: 769px)": {
            paddingTop: `calc(${space[96]} + ${space[24]} + ${space[4]})`,
            gap: layout.sectionGap,
        }
    }
})

export const icon = style({
    // モバイルファーストのアプローチ - デフォルトでモバイルサイズに設定
    width: "100px",
    height: "100px",
    flexShrink: 0,
    aspectRatio: "1/1",
    borderRadius: "50%",
    background: "url(/images/icon.jpg) lightgray 50% / cover no-repeat",
    "@media": {
        // デスクトップサイズはメディアクエリで上書き
        "screen and (min-width: 769px)": {
            width: "200px",
            height: "200px",
        }
    }
})

export const myName = style({
    display: "flex",
    padding: space[12],
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: layout.cardContentGap,
})

export const accontFrame = style({
    display: "flex",
    padding: space[12],
    alignItems: "center",
    // モバイルファーストのアプローチ - デフォルトでモバイルサイズに設定
    gap: layout.cardContentGap,
    "@media": {
        // デスクトップサイズはメディアクエリで上書き
        "screen and (min-width: 769px)": {
            gap: space[20],
        }
    }
})
export const heroName = style(typeStyle("heroName"));

export const subtitle = style({ ...typeStyle("title2"), margin: 0 });
globalStyle(`${accontFrame} svg`, { width: "25px", height: "25px", color: vars.color.text, "@media": { "screen and (max-width: 768px)": { width: "15px" } } });
