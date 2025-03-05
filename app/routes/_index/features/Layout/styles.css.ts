import { style } from "@vanilla-extract/css";

export const container = style({
    position: "relative",
    width: "100%",
    minHeight: "100vh",
});

export const content = style({
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    //padding: "44px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "290px",
    zIndex: 1,
}); 