import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const frame = style({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 0",
    gap: "10px",
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

export const subTitle = style({
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: "400",
    '@media': {
        'screen and (max-width: 767px)': {
            fontSize: "30px"
        }
    }
});

export const thumbnail = style({
    maxWidth: "50%",
    height: "auto",
    objectFit: "contain",
});

export const img = style({
    width: "100%",
    height: "auto",
    objectFit: "contain",
});

export const text = style({
    color: vars.color.lightText,
    width: "60%",
    textAlign: "center",
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    overflowWrap: "break-word",
    '@media': {
        "screen and (maw-width: 767px)": {
            fontSize: "16px",
        }
    }
});

export const menu = style({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px 0",
    gap: "10px",
    width: "100%",
});

export const form = style({
    display: "flex",
    width: "100%",
    height: "800px",
    padding: "10px 0",
    justifySelf: "stretch",
});