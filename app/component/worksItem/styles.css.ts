import { typeStyle, layout, mobile } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";
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
export const cardLink = style({ color: "inherit", textDecoration: "none" });
export const title = style({ ...typeStyle("title3"), margin: 0, wordBreak: "break-word" });
export const description = style({ ...typeStyle("body"), margin: 0, wordBreak: "break-word" });
export const thumbnail = style({
    width: "300px", height: "200px", objectFit: "cover",
    "@media": { [mobile]: { width: "200px", height: "133px" } },
});
