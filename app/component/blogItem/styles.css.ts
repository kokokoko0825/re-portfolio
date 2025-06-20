import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const blogItem = style({
    display: "flex",
    width: "600px",
    padding: "20px 50px",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: "10px",
    borderRadius: "30px",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    background: vars.color.background,
    "@media": {
        "screen and (max-width: 768px)": {
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "20px 30px",
            alignSelf: "stretch",
            borderRadius: "20px",
        }
    }
})