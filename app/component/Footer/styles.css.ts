import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const footer = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: vars.color.lightText,
});

export const text = style({
    color: vars.color.lightText,
    fontSize: "20px",
    fontFamily: vars.typography.fontFamily.jap,
    fontStyle: "normal",
    fontWeight: "400",
});