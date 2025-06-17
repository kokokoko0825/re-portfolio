import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const adminWorkItem = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
})

export const adminItemIcon = style({
    display: "flex",
    padding: "10px",
    alignItems: "center",
    gap: "50px",
})