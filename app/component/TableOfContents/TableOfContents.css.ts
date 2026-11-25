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
    borderLeft: `2px solid ${vars.color.borderColor}`,
});

export const tocListItem = style({
    position: "relative",
});

export const tocLink = style({
    ...typeStyle("footnote"),
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    paddingBlock: space[8],
    minHeight: "2.75rem",
    "@media": {
        "(pointer: fine)": { minHeight: "2rem", paddingBlock: space[4] },
        "(any-pointer: coarse)": { minHeight: "2.75rem", paddingBlock: space[8] },
    },

    color: vars.color.tocMuted,
    overflowWrap: "anywhere",
    textDecoration: "none",
    ":hover": {
        color: vars.color.text,
    },
});

export const tocLinkLevel1 = style({
    paddingLeft: 0,
    color: vars.color.text,
});

export const tocLinkNested = style({ ...typeStyle("tocNested") });

export const tocLinkLevel2 = style({
    paddingLeft: space[12],
});

export const tocLinkLevel3 = style({
    paddingLeft: space[24],
});

export const tocLinkLevel4 = style({
    paddingLeft: "2.25rem",
});

export const tocLinkActive = style({
    fontWeight: 500,
    color: vars.color.text,
    "::before": {
        content: '""',
        position: "absolute",
        left: "-2px",
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: vars.color.primary.DEFAULT,
    },
});
