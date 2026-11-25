import { typeStyle, type, space, layout, mobile } from "~/styles/tokens";
import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";
import "zenn-content-css";
export const frame = style({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: layout.sectionGap,
    "@media": { [mobile]: { gap: layout.mobile.sectionGap } }
});
export const about = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[32],
    "@media": {
        [mobile]: {
            gap: space[8],
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const blog = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[8],
    "@media": {
        [mobile]: {
            gap: space[8],
            alignItems: "center",
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const tagFilters = style({
    display: "flex",
    flexWrap: "wrap",
    gap: space[8],
    alignItems: "center",
    justifyContent: "center"
});
export const tagFilter = style({
    ...typeStyle("caption"),
    padding: `${space[4]} ${space[12]}`,
    border: `1px solid ${vars.color.borderColor}`,
    borderRadius: "9999px",
    background: vars.color.background,
    color: vars.color.text,
    cursor: "pointer"
});
export const tagFilterActive = style({
    ...typeStyle("caption"),
    padding: `${space[4]} ${space[12]}`,
    border: `1px solid ${vars.color.tagActive.background}`,
    borderRadius: "9999px",
    background: vars.color.tagActive.background,
    color: vars.color.tagActive.text,
    cursor: "pointer"
});
export const tagList = style({
    display: "flex",
    flexWrap: "wrap",
    gap: space[4]
});
export const tagChip = style({
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
    }
});
export const works = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[8],
    "@media": {
        [mobile]: {
            gap: space[20],
            alignItems: "center",
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const blogId = style({
    display: "flex",
    width: "100%",
    maxWidth: "1060px",
    flexDirection: "column",
    alignItems: "center",
    gap: space[32],
    "@media": {
        [mobile]: {
            width: "100%",
            gap: space[24],
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const blogDetailWrapper = style({
    display: "flex",
    width: "100%",
    maxWidth: `calc(${layout.articleMaxWidth} + ${space[48]} + 220px)`,
    marginInline: "auto",
    fontSize: type.articleBody.fontSize,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space[48],
    boxSizing: "border-box",
    marginTop: space[24],
    paddingTop: space[24],
    borderTop: `2px solid ${vars.color.borderColor}`,
    "@media": {
        [mobile]: {
            flexDirection: "column",
            fontSize: type.articleBody.mobileSize,
            gap: space[24],
            order: 0,
        },
    }
});
export const blogArticle = style({
    flex: 1,
    width: "100%",
    maxWidth: layout.articleMaxWidth,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    "@media": {
        [mobile]: {
            order: 1,
            gap: layout.mobile.cardContentGap
        }
    },
    gap: layout.cardContentGap
});
export const tocAside = style({
    flexShrink: 0,
    width: "220px",
    position: "sticky",
    top: "100px",
    "@media": {
        [mobile]: {
            position: "static",
            width: "100%",
            order: -1,
        },
    }
});
export const login = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[48],
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`,
    "@media": { [mobile]: { padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}` } }
});
export const admin = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[96],
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`,
    "@media": { [mobile]: { padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}` } }
});
export const adminManagement = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[32],
    "@media": {
        [mobile]: {
            alignItems: "center",
            gap: space[20],
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const adminnewCreate = style({
    display: "flex",
    width: "760px",
    flexDirection: "column",
    alignItems: "center",
    gap: space[8],
    "@media": {
        [mobile]: {
            width: "auto",
            alignSelf: "stretch",
            padding: `${space[96]} ${layout.mobile.pageInset} ${space[24]}`
        }
    },
    boxSizing: "border-box",
    padding: `${space[96]} ${layout.pageInset} ${space[24]}`
});
export const section = style({
    display: "flex",
    padding: space[8],
    flexDirection: "column",
    alignItems: "flex-start",
    "@media": {
        [mobile]: {
            padding: `${space[8]} 0`,
            alignSelf: "stretch",
            gap: layout.mobile.cardContentGap
        }
    },
    gap: layout.cardContentGap
});
export const list = style({
    display: "flex",
    padding: "0",
    flexDirection: "column",
    alignItems: "flex-start",
    "@media": {
        [mobile]: {
            alignSelf: "stretch",
            gap: layout.mobile.cardGap
        }
    },
    gap: layout.cardGap
});
export const workList = style({
    display: "flex",
    maxWidth: "750px",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    "@media": {
        [mobile]: {
            width: "100%",
            boxSizing: "border-box",
            padding: space[8],
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            gap: layout.mobile.cardGap
        }
    },
    gap: layout.cardGap
});
export const thumbnail = style({
    textAlign: "center",
    display: "flex",
    padding: `${space[24]} 0 ${space[16]} 0`,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    "@media": {
        [mobile]: {
            padding: `${space[20]} 0 ${space[12]} 0`,
            alignSelf: "stretch",
            gap: layout.mobile.cardContentGap
        }
    },
    gap: layout.cardContentGap
});
export const textFrame = style({
    display: "flex",
    width: "100%",
    maxWidth: layout.articleMaxWidth,
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: space[16],
    flexWrap: "wrap",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    marginInline: "auto",
    "@media": {
        [mobile]: {
            width: "100%",
            boxSizing: "border-box",
            padding: "0",
        }
    },
    ...typeStyle("articleBody")
});
// Zenn content CSS用のglobalStyleを追加
globalStyle(`${textFrame} .znc`, {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
});
globalStyle(`${textFrame} .znc *`, {
    maxWidth: "100%",
    boxSizing: "border-box",
});
globalStyle(`${textFrame} .znc img`, {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    objectFit: "contain",
});
globalStyle(`${textFrame} .znc pre`, {
    overflowX: "auto",
    maxWidth: "100%",
    boxSizing: "border-box",
});
globalStyle(`${textFrame} .znc code`, {
    overflowWrap: "break-word",
    wordBreak: "break-word",
});
globalStyle(`${textFrame} .znc table`, {
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    display: "block",
});
globalStyle(`${textFrame} .znc h2[id], ${textFrame} .znc h3[id], ${textFrame} .znc h4[id], ${textFrame} .znc h5[id]`, {
    scrollMarginTop: "100px",
});
export const backFrame = style({
    display: "flex",
    padding: `${space[24]} 0 0 0`,
    alignItems: "flex-start",
    gap: space[8],
    alignSelf: "stretch",
    "@media": {
        [mobile]: {
            padding: `${space[32]} 0 0 0`,
            alignItems: "flex-start",
        }
    }
});
export const loginCard = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: "10px",
    border: `2px solid ${vars.color.borderColor}`,
    gap: layout.cardContentGap,
    padding: layout.cardPadding,
    "@media": { [mobile]: { padding: layout.mobile.cardPadding, gap: layout.mobile.cardContentGap } }
});
export const adminSelect = style({
    display: "flex",
    padding: space[8],
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: layout.sectionGap,
    "@media": { [mobile]: { gap: layout.mobile.sectionGap } }
});
export const adminSection = style({
    display: "flex",
    padding: space[8],
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: layout.cardContentGap,
    "@media": { [mobile]: { gap: layout.mobile.cardContentGap } }
});
export const newCreate = style({
    display: "flex",
    padding: space[8],
    justifyContent: "flex-end",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: layout.cardContentGap,
    "@media": { [mobile]: { gap: layout.mobile.cardContentGap } }
});
export const adminWorksList = style({
    display: "flex",
    width: "750px",
    padding: `${space[24]} ${space[32]}`,
    alignItems: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    "@media": {
        [mobile]: {
            width: "auto",
            flexDirection: "column",
            alignItems: "center",
            gap: layout.mobile.cardGap
        }
    },
    gap: layout.cardGap
});
export const title = style({
    ...typeStyle("uiBody"),
    display: "flex",
    padding: space[8],
    alignItems: "center",
    alignSelf: "stretch",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    gap: layout.cardContentGap,
    "@media": { [mobile]: { gap: layout.mobile.cardContentGap } }
});
export const description = style({
    ...typeStyle("uiBody"),
    display: "flex",
    padding: space[8],
    alignItems: "center",
    alignSelf: "stretch",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    gap: layout.cardContentGap,
    "@media": { [mobile]: { gap: layout.mobile.cardContentGap } }
});
export const adminThumbnailInput = style({
    ...typeStyle("uiBody"),
    width: "auto",
    height: "auto",
    textAlign: "center",
    border: "none",
    background: "none",
    color: vars.color.text
});
export const adminTitleInput = style({
    ...typeStyle("uiBody"),
    width: "100%",
    height: "auto",
    background: "none",
    border: "none",
    color: vars.color.text
});
export const adminDescriptionInput = style({
    ...typeStyle("uiBody"),
    width: "100%",
    height: "auto",
    background: "none",
    border: "none",
    color: vars.color.text
});
export const adminTextareaInput = style({
    ...typeStyle("uiBody"),
    width: "100%",
    height: "700px",
    background: vars.color.codeBlock.background,
    border: `1px solid ${vars.color.borderColor}`,
    color: vars.color.text,
    borderRadius: "10px",
    "@media": {
        [mobile]: {
            height: "500px",
        }
    }
});
export const titleText = style({
    ...typeStyle("largeTitle")
});
export const subtitleText = style({
    ...typeStyle("title2")
});
export const defaultText = style({
    ...typeStyle("body")
});
export const linkText = style({
    ...typeStyle("footnote"),
    color: vars.color.text,
    textDecoration: "none",
});
export const careerText = style({
    ...typeStyle("body"),
    margin: "0"
});
export const linkUnderline = style({
    ...typeStyle("body"),
    textDecoration: "underline",
    color: vars.color.text
});
// Timeline styles
export const timeline = style({
    listStyle: "none",
    margin: 0,
    padding: `0 0 0 ${space[24]}`,
    position: "relative",
    "::before": {
        content: '""',
        position: "absolute",
        left: "5px",
        top: "5px",
        bottom: "5px",
        width: "2px",
        background: vars.color.borderColor,
    },
    "@media": {
        [mobile]: {
            paddingLeft: space[20],
        }
    }
});
export const timelineItem = style({
    position: "relative",
    paddingTop: space[24],
    selectors: {
        "&:first-child": {
            paddingTop: 0,
        },
    },
    "::before": {
        content: '""',
        position: "absolute",
        left: "-24px",
        bottom: "0px",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: vars.color.text,
        border: `2px solid ${vars.color.background}`,
        boxSizing: "border-box",
    },
    "@media": {
        [mobile]: {
            paddingTop: space[20],
            "::before": {
                left: "-20px",
                width: "10px",
                height: "10px",
            },
        }
    }
});
export const timelineYear = style({
    ...typeStyle("footnote"),
    color: vars.color.muted.foreground,
    marginBottom: space[4]
});
export const timelineTitle = style({
    ...typeStyle("title3"),
    color: vars.color.text,
    margin: 0
});
globalStyle(`${thumbnail} > span`, typeStyle("heroName"));
globalStyle(`${adminnewCreate} p, ${adminnewCreate} label, ${adminManagement} button, ${loginCard} p`, typeStyle("uiBody"));

export const sectionTitle = style({ ...typeStyle("largeTitle"), margin: 0 });
export const articleTitle = style({ ...typeStyle("articleTitle"), margin: 0, maxWidth: "56rem" });
export const subsectionTitle = style({ ...typeStyle("title2"), margin: 0 });
export const backLink = style({ ...typeStyle("footnote"), color: vars.color.text, textDecoration: "none" });
globalStyle(`${adminSelect} a, ${newCreate} a`, { color: vars.color.text, textDecoration: "none" });

globalStyle(`${textFrame} .znc h2, ${textFrame} .znc h3, ${textFrame} .znc h4, ${textFrame} .znc h5`, {
    wordBreak: "keep-all", overflowWrap: "anywhere",
});
