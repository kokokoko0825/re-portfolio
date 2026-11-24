import { typeStyle, space } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const tocNav = style({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
});

export const tocList = style({
    listStyle: "none",
    margin: 0,
    padding: 0,
});

export const tocListItem = style({
    marginBottom: space[4],
});

export const tocLink = style({
    ...typeStyle("footnote"),
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    paddingBlock: space[8],
    minHeight: "2.75rem",

    color: vars.color.muted.foreground,
    textDecoration: "none",
    transition: "color 0.2s ease, opacity 0.2s ease",
    opacity: 0.7,
    ":hover": {
        color: vars.color.text,
        opacity: 1,
    },
});

export const tocLinkLevel1 = style({
    paddingLeft: 0,
});

export const tocLinkLevel2 = style({
    paddingLeft: space[16],
});

export const tocLinkLevel3 = style({
    paddingLeft: space[32],
});

export const tocLinkLevel4 = style({
    paddingLeft: space[48],
});

export const tocLinkActive = style({
    ...typeStyle("caption"),
    color: vars.color.text,

    opacity: 1,
});
