import { vars } from "~/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const products = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "100px",
    justifyContent: "center",
});

export const subtitleFrame = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    gap: "10px",
    borderBottom: "4px solid #541BFF",
});

export const subTitle = style({
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "70px",
    fontStyle: "normal",
    fontWeight: "400",
});

export const productList = style({
    display: "flex",
    width: "60%",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "0 20px",
    boxSizing: "border-box",
});