import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const tocNav = style({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
});

export const tocList = style({
    listStyle: "none",
    margin: 0,
    padding: 0,
});

export const tocListItem = style({
    marginBottom: "4px",
});

export const tocLink = style({
    display: "block",
    fontSize: "0.875rem",
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
    paddingLeft: "12px",
});

export const tocLinkLevel3 = style({
    paddingLeft: "24px",
});

export const tocLinkLevel4 = style({
    paddingLeft: "36px",
});

export const tocLinkActive = style({
    color: vars.color.text,
    fontWeight: 600,
    opacity: 1,
});
