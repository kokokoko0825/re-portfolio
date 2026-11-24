import { typeStyle, space } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const twitterEmbedContainer = style({
    display: "flex",
    justifyContent: "center",
    margin: `${space[32]} 0`,
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
    ...typeStyle("uiBody"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: space[32],
    color: vars.color.text,
});

export const twitterEmbedError = style({
    ...typeStyle("uiBody"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: space[16],
    margin: `${space[16]} 0`,
    color: "#ff6b6b",

    border: `1px solid #ff6b6b`,
    borderRadius: "8px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
}); 