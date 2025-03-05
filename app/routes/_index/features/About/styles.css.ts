import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const about = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "100px",
    alignSelf: "stretch",
});

export const titleFrame = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    gap: "10px",
    borderBottom: "4px solid #541BFF",
});
export const title = style({
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "70px",
    fontStyle: "normal",
    fontWeight: "400",
});

export const contentFrame = style({
    display: "flex",
    maxWidth: "60%",
    padding: "60px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "4px solid white",
    background: vars.color.background,
    borderRadius: "10px",
});

export const text = style({
    color: vars.color.lightText,
    textAlign: "center",
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
});