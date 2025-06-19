import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const twitterEmbedContainer = style({
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
    width: "100%",
});

export const twitterEmbed = style({
    maxWidth: "550px",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    border: `1px solid ${vars.color.borderColor}`,
    backgroundColor: vars.color.background,
});

export const twitterEmbedLoading = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    color: vars.color.text,
    fontSize: "1rem",
});

export const twitterEmbedError = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    margin: "1rem 0",
    color: "#ff6b6b",
    fontSize: "0.9rem",
    border: `1px solid #ff6b6b`,
    borderRadius: "8px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
}); 