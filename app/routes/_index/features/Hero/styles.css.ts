import { vars } from "app/styles/theme.css";
import { style } from "@vanilla-extract/css";

//const cubicBezier = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

export const hero = style({
    display: "flex",
    width: "100%",
    padding: "300px 0 0 0",
    flexDirection: "column",
    alignItems: "center",
    gap: "300px",
    //boxSizing: "border-box",
    //marginLeft: "calc(-50vw + 50%)",
    '@media': {
        'screen and (max-width: 767px)': {
            //height: "844px",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
        }
    },

});

export const title = style({
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "128px",
    fontStyle: "normal",
    fontWeight: "400",
});