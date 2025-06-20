import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const Home = style({
    display: "flex",
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
    backgroundColor: vars.color.background,
})

export const item = style({
    display: "flex",
    // モバイルファーストのアプローチ - デフォルトでモバイルサイズに設定
    paddingTop: "120px",
    flexDirection: "column",
    alignItems: "center",
    gap: "70px",
    "@media": {
        // デスクトップサイズはメディアクエリで上書き
        "screen and (min-width: 769px)": {
            paddingTop: "124px",
            gap: "50px",
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
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
})

export const accontFrame = style({
    display: "flex",
    padding: "10px",
    alignItems: "center",
    // モバイルファーストのアプローチ - デフォルトでモバイルサイズに設定
    gap: "10px",
    "@media": {
        // デスクトップサイズはメディアクエリで上書き
        "screen and (min-width: 769px)": {
            gap: "20px",
        }
    }
})