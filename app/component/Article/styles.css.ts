import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const article = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px 40px",
    //margin: "16px 0",
    backgroundColor: vars.color.background,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    //maxWidth: "800px",
    width: "40%",
    border: "4px solid white",
    alignSelf: "stretch",

    ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    }
});

export const thumbnail = style({
    width: "80%",
    height: "133px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    //backgroundColor: "#f0f0f0",
});

export const content = style({
    width: "100%",
    padding: "16px",
    overflow: "hidden",
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
});

export const readMore = style({
    display: "inline-block",
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
    width: "auto",
    //minWidth: "60%",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gap: "15px",
    flexWrap: "wrap",
});