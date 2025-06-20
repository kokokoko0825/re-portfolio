import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const adminBlogItem = style({
    display: "inline-flex",
    padding: "10px 50px",
    alignItems: "center",
    gap: "50px",
    "@media": {
        "screen and (max-width: 768px)": {
            display: "flex",
            width: "100%",
            padding: "10px 0px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            alignSelf: "stretch",
            gap: "10px",
        }
    }
})

export const adminItemIcon = style({
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "50px",
    "@media": {
        "screen and (max-width: 768px)": {
            padding: "0px",
            justifyContent: "center",
            alignItems: "center",
        }
    }
})