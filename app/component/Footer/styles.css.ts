import { space } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";

export const footer = style({
    display: "inline-flex",
    padding: space[8],
    alignItems: "flex-start",
    gap: space[8],
});