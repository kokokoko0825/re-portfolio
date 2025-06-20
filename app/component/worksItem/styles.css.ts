import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const worksItem = style({
    display: "inline-flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            display: "flex",
        }
    }
})