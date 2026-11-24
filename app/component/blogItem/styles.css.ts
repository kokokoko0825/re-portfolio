import { typeStyle, space, layout, mobile } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
export const blogItem = style({
    position: "relative",
    display: "flex",
    width: "600px",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: "30px",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    background: vars.color.background,
    "@media": {
        [mobile]: {
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            alignSelf: "stretch",
            borderRadius: "20px",
            padding: layout.mobile.cardPadding, gap: layout.mobile.cardContentGap
        }
    },
    padding: layout.cardPadding,
    gap: layout.cardContentGap,
    boxSizing: "border-box"
});
export const tagList = style({
    display: "flex",
    flexWrap: "wrap",
    gap: space[4],
});
export const tagChip = style({
    position: "relative",
    zIndex: 1,
    ...typeStyle("caption"),
    padding: `${space[4]} ${space[8]}`,
    borderRadius: "9999px",
    border: `1px solid ${vars.color.borderColor}`,
    color: vars.color.text,
    textDecoration: "none",
    ":hover": {
        background: vars.color.tagActive.background,
        color: vars.color.tagActive.text,
        borderColor: vars.color.tagActive.background,
    },
});
// カード内の余白と文字階層。
export const title = style({ ...typeStyle("title3"), margin: 0 });
export const titleLink = style({
    color: vars.color.text,
    textDecoration: "none",
    "::after": { content: '""', position: "absolute", inset: 0, borderRadius: "inherit" },
    selectors: { "&:focus-visible::after": { outline: "2px solid currentColor", outlineOffset: "2px" } },
});
