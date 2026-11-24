import { space } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";

export const adminWorkItem = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: space[8],
})

export const adminItemIcon = style({
    display: "flex",
    padding: space[8],
    alignItems: "center",
    gap: space[48],
})