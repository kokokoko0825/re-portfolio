import { typeStyle, space, layout, mobile } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
export const linkEmbedContainer = style({
    display: "flex",
    justifyContent: "center",
    margin: `${space[32]} 0`,
    width: "100%",
});
export const linkEmbed = style({
    display: "flex",
    maxWidth: "600px",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    border: `1px solid ${vars.color.borderColor}`,
    backgroundColor: vars.color.background,
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    },
});
export const linkEmbedImage = style({
    flexShrink: 0,
    width: "120px",
    height: "120px",
    overflow: "hidden",
    "@media": {
        [mobile]: {
            width: "80px",
            height: "80px",
        },
    },
});
export const linkEmbedContent = style({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: layout.cardPadding,
    gap: layout.cardContentGap,
    boxSizing: "border-box",
    "@media": { [mobile]: { padding: layout.mobile.cardPadding, gap: layout.mobile.cardContentGap } }
});
export const linkEmbedTitle = style({
    ...typeStyle("title3"),
    margin: 0,
    color: vars.color.text,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});
export const linkEmbedDescription = style({
    ...typeStyle("body"),
    color: vars.color.muted?.foreground || "#666",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});
export const linkEmbedMeta = style({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
});
export const linkEmbedSite = style({
    ...typeStyle("caption"),
    color: vars.color.primary?.DEFAULT || "#007acc",
    textTransform: "uppercase",
});
export const linkEmbedUrl = style({
    ...typeStyle("footnote"),
    color: vars.color.muted?.foreground || "#999",
    wordBreak: "break-all",
});
export const linkEmbedLoading = style({
    ...typeStyle("uiBody"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: space[32],
    color: vars.color.text,
});
export const linkEmbedError = style({
    ...typeStyle("uiBody"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: space[16],
    margin: `${space[16]} 0`,
    color: "#ff6b6b",
    border: `1px solid #ff6b6b`,
    borderRadius: "8px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    gap: space[8],
});
export const fallbackLink = style({
    color: vars.color.primary?.DEFAULT || "#007acc",
    textDecoration: "underline",
    wordBreak: "break-all",
    ":hover": {
        textDecoration: "none",
    },
});
// カード内の余白と文字階層。
