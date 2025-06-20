import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const linkEmbedContainer = style({
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
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
        "screen and (max-width: 768px)": {
            width: "80px",
            height: "80px",
        },
    },
});

export const linkEmbedContent = style({
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});

export const linkEmbedTitle = style({
    fontSize: "1.1rem",
    fontWeight: "600",
    margin: "0 0 0.5rem 0",
    color: vars.color.text,
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});

export const linkEmbedDescription = style({
    fontSize: "0.9rem",
    color: vars.color.muted?.foreground || "#666",
    margin: "0 0 0.5rem 0",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});

export const linkEmbedMeta = style({
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
});

export const linkEmbedSite = style({
    fontSize: "0.8rem",
    fontWeight: "500",
    color: vars.color.primary?.DEFAULT || "#007acc",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
});

export const linkEmbedUrl = style({
    fontSize: "0.75rem",
    color: vars.color.muted?.foreground || "#999",
    wordBreak: "break-all",
});

export const linkEmbedLoading = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    color: vars.color.text,
    fontSize: "1rem",
});

export const linkEmbedError = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    margin: "1rem 0",
    color: "#ff6b6b",
    fontSize: "0.9rem",
    border: `1px solid #ff6b6b`,
    borderRadius: "8px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    gap: "0.5rem",
});

export const fallbackLink = style({
    color: vars.color.primary?.DEFAULT || "#007acc",
    textDecoration: "underline",
    wordBreak: "break-all",
    ":hover": {
        textDecoration: "none",
    },
}); 