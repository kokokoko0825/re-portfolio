import { space } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";

export const menuItem = style({
    display: "inline-flex",
    padding: `${space[32]} ${space[48]}`,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: space[20],
})