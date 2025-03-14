import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const article = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    backgroundColor: vars.color.background,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    width: "100%",
    border: "4px solid white",
    height: "400px",
    boxSizing: "border-box",

    ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    },
    '@media': {
        'screen and (max-width: 767px)': {
            width: "100%",
            height: "400px",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
            width: "100%",
        }
    }
});

export const thumbnail = style({
    width: "80%",
    height: "160px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: "10px",
    '@media': {
        'screen and (max-width: 767px)': {
            height: "160px",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
            height: "160px",
        }
    }
});

export const content = style({
    width: "100%",
    padding: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 160px - 10px)",
});

export const title = style({
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "8px",
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
});

export const date = style({
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "8px",
});

export const description = style({
    fontSize: "16px",
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    lineHeight: "1.5",
    marginBottom: "16px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    maxHeight: "72px",
});

export const readMore = style({
    display: "flex",
    justifyContent: "center",
    padding: "8px 16px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.3s ease",

    ":hover": {
        backgroundColor: "#2980b9",
    }
});

export const articleList = style({
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: "5px",
    flexDirection: "row",
    flexWrap: "wrap",
    '@media': {
        'screen and (max-width: 767px)': {
            width: "100%",
            justifyContent: "center",
            gap: "5px",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
            justifyContent: "space-between",
        }
    }
});

export const articleWrapper = style({
    width: "calc(50% - 15px)",
    marginBottom: "10px",
    boxSizing: "border-box",
    '@media': {
        'screen and (max-width: 767px)': {
            width: "100%",
            marginBottom: "20px",
        }
    }
});

export const articleLink = style({
    textDecoration: "none",
    color: "inherit",
    display: "block",
    width: "100%",
    height: "100%",
});