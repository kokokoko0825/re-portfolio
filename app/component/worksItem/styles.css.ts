import { typeStyle, layout, mobile } from "~/styles/tokens";
import { style, globalStyle } from "@vanilla-extract/css";
export const worksItem = style({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    "@media": {
        [mobile]: {
            display: "flex",
            padding: layout.mobile.cardPadding, gap: layout.mobile.cardContentGap
        }
    },
    padding: layout.cardPadding,
    gap: layout.cardContentGap,
    boxSizing: "border-box"
});
// カード内の余白と文字階層。
globalStyle(`${worksItem} h2`, typeStyle("title3"));
globalStyle(`${worksItem} small`, typeStyle("body"));
