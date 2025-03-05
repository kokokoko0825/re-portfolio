import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const frame = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    border: "4px solid white",
    borderRadius: "10px",
    padding: "50px 30px",
});

export const menuItem = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    justifySelf: "stretch",
    gap: "50px",
    position: "relative",
});

export const arrow = style({
    visibility: "hidden",
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: "400",
});

export const text = style({
    display: "flex",
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "50px",
    fontStyle: "normal",
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
});