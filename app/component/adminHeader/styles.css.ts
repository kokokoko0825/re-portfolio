import { vars } from "../../styles/theme.css";
import { style } from "@vanilla-extract/css";

export const adminHeader = style ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    background: vars.color.background,
    boxSizing: "content-box",
    position: "fixed",
})

export const adminHomeIcon = style({
    display: "flex",
    padding: "10px 0px 10px 30px",
})

export const adminLinkList = style({
    display: "flex",
    padding: "10px 50px",
    alignItems: "flex-start",
    gap: "30px",
})