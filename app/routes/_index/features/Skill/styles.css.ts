import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const skill = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
});

export const subtitleFrame = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    gap: "10px",
    marginBottom: "100px",
    borderBottom: "4px solid #541BFF",
});

export const subTitle = style({
    color: vars.color.lightText,
    fontSize: "70px",
    fontFamily: vars.typography.fontFamily.jap,
    fontStyle: "normal",
    fontWeight: "400",
});

export const text = style({
    color: vars.color.lightText,
    fontSize: "20px",
    fontFamily: vars.typography.fontFamily.jap,
    fontStyle: "normal",
    fontWeight: "400",
});