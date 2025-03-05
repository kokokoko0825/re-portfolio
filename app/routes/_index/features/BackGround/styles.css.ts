import { vars } from "~/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const backGround = style({
    display: "flex",
    width: "auto",
    height: "6168px",
    //background: "url(/images/back-ground.png)",
    backgroundColor: vars.color.background,
    backgroundPositionX: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    boxSizing: "border-box",
    //border: "1px solid red",
});