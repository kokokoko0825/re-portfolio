import { space, mobile } from "~/styles/tokens";
import { style } from "@vanilla-extract/css";

export const adminBlogItem = style({
    display: "inline-flex",
    padding: `${space[8]} ${space[48]}`,
    alignItems: "center",
    gap: space[48],
    "@media": {
        [mobile]: {
            display: "flex",
            width: "100%",
            padding: `${space[8]} 0`,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            alignSelf: "stretch",
            gap: space[8],
        }
    }
})

export const adminItemIcon = style({
    display: "flex",
    padding: space[8],
    alignItems: "flex-start",
    gap: space[48],
    "@media": {
        [mobile]: {
            padding: "0",
            justifyContent: "center",
            alignItems: "center",
        }
    }
})