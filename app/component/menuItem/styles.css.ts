import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const menuItem = style({
    display: "inline-flex",
    padding: "30px 50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
})