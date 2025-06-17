import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const adminBlogItem = style({
    display: "inline-flex",
    padding: "10px 50px",
    alignItems: "center",
    gap: "50px",
})

export const adminItemIcon = style({
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "50px",
})