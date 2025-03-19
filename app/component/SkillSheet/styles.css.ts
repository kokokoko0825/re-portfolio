import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const skillSheet = style({
    padding: "40px",
    width: "40%",
});

export const title = style({
    fontSize: "48px",
    color: vars.color.lightText,
    marginBottom: "32px",
    textAlign: "center",
    fontFamily: vars.typography.fontFamily.jap,
});

export const skillGrid = style({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "24px",
    justifyContent: "center",
});

export const skillCard = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    backgroundColor: vars.color.background,
    borderRadius: "8px",
    border: `2px solid ${vars.color.lightText}`,
    transition: "transform 0.3s ease",

    ":hover": {
        transform: "translateY(-5px)",
    },
    '@media': {
        'screen and (max-width: 767px)': {
            width: "auto",
            height: "auto",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
            width: "auto",
        }
    }
});

export const skillIcon = style({
    width: "64px",
    height: "64px",
    marginBottom: "16px",
});

export const skillName = style({
    fontSize: "20px",
    color: vars.color.lightText,
    marginBottom: "12px",
    fontFamily: vars.typography.fontFamily.jap,
});

export const starContainer = style({
    display: "flex",
    gap: "4px",
});

export const star = style({
    fontSize: "24px",
    transition: "color 0.3s ease",
});

export const starFilled = style({
    color: "#FFD700", // 金色
});

export const starEmpty = style({
    color: "#4A4A4A",
});