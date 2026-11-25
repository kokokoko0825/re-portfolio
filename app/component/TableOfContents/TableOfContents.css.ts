import { typeStyle, space, mobile } from "~/styles/tokens";
import { globalStyle, style } from "@vanilla-extract/css";
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
    "@media": { [mobile]: { borderLeft: 0 } },
});

export const tocListItem = style({
    position: "relative",
});

export const tocLink = style({
    ...typeStyle("footnote"),
    display: "flex",
    position: "relative",
    alignItems: "center",
    boxSizing: "border-box",
    paddingBlock: space[8],
    minHeight: "2.75rem",
    "@media": {
        "(pointer: fine)": { minHeight: "2rem", paddingBlock: space[4] },
        "(any-pointer: coarse)": { minHeight: "2.75rem", paddingBlock: space[8] },
        [mobile]: { minHeight: "2.75rem", padding: `${space[8]} ${space[16]}` },
    },

    color: vars.color.tocMuted,
    overflowWrap: "anywhere",
    textDecoration: "none",
    ":hover": {
        color: vars.color.text,
    },
});

export const tocLinkLevel1 = style({
    paddingLeft: space[12],
    "@media": { [mobile]: { paddingLeft: space[16] } },
});

export const tocLinkNested = style({ ...typeStyle("tocNested") });

export const tocLinkLevel2 = style({
    paddingLeft: space[24],
    "@media": { [mobile]: { paddingLeft: space[32] } },
});

export const tocLinkLevel3 = style({
    paddingLeft: "2.25rem",
    "@media": { [mobile]: { paddingLeft: space[48] } },
});

export const tocLinkLevel4 = style({
    paddingLeft: space[48],
    "@media": { [mobile]: { paddingLeft: space[64] } },
});

export const tocLinkActive = style({
    fontWeight: 500,
    color: vars.color.text,
    "@media": { [mobile]: { fontWeight: 400, color: vars.color.tocMuted } },
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

export const tocAccordion = style({
    width: "100%",
    border: 0,
    backgroundColor: "transparent",
    boxSizing: "border-box",
    padding: 0,
    "@media": {
        [mobile]: {
            borderRadius: "8px",
            border: `1px solid ${vars.color.borderColor}`,
            backgroundColor: vars.color.tocBackground,
            overflow: "hidden",
        },
    },
});

export const tocSummary = style({
    ...typeStyle("caption"),
    display: "none",
    color: vars.color.text,
    cursor: "pointer",
    listStyle: "none",
    "@media": {
        [mobile]: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space[12],
            minHeight: space[48],
            padding: `0 ${space[16]}`,
            boxSizing: "border-box",
        },
    },
    ":focus-visible": {
        outline: `2px solid ${vars.color.primary.DEFAULT}`,
        outlineOffset: "-3px",
    },
});

export const tocChevron = style({
    flexShrink: 0,
    transition: "transform 0.2s ease",
    "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } },
});

export const tocTitle = style({
    ...typeStyle("caption"),
    paddingLeft: `calc(2px + ${space[12]})`,
    color: vars.color.text,
    marginBottom: space[8],
    "@media": { [mobile]: { display: "none" } },
});

globalStyle(`summary.${tocSummary}::-webkit-details-marker`, { display: "none" });
globalStyle(`.${tocAccordion}[open] > .${tocSummary}`, {
    "@media": { [mobile]: { borderBottom: `1px solid ${vars.color.borderColor}` } },
});
globalStyle(`.${tocAccordion}[open] .${tocChevron}`, { transform: "rotate(180deg)" });

globalStyle(`.${tocLinkActive}::before`, {
    "@media": { [mobile]: { display: "none" } },
});
