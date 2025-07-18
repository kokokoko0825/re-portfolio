import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const Home = style({
    display: "flex",
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
    backgroundColor: vars.color.background,
})

export const item = style({
    display: "flex",
    paddingTop: "124px",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
})

export const icon = style({
    width: "200px",
    height: "200px",
    flexShrink: 0,
    aspectRatio: "1/1",
    borderRadius: "50%",
    background: "url(/public/images/icon.jpg) lightgray 50% / cover no-repeat",
})

export const myName = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
})

export const accontFrame = style({
    display: "flex",
    padding: "10px",
    alignItems: "center",
    gap: "20px",
})