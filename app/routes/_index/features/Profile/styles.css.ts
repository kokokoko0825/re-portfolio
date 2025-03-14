import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const Profile = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "100px",
});

export const subTitleFrame = style({
    display: "flex",
    padding: "10px 0",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderBottom: "4px solid #541BFF",
});

export const subTitle = style({
    color: vars.color.lightText,
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "70px",
    fontStyle: "normal",
    fontWeight: "400",
});

export const profileFrame = style({
    display: "flex",
    maxWidth: "45%",
    padding: "60px",
    alignItems: "flex-start",
    gap: "50px",
    border: "4px solid white",
    borderRadius: "10px",
    background: vars.color.background,
    '@media': {
        'screen and (max-width: 767px)': {
            flexDirection: "column",
        },
        'screen and (max-width: 1020px) and (min-width: 768px)': {
        }
    }
});

export const icon = style({
    width: "145px",
    height: "145px",
    aspectRatio: "1/1",
    borderRadius: "200px",
    border: "4px solid black",
    background: "url(/images/account_icon_v2.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
});

export const aboutMe = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
});

export const text = style({
    color: vars.color.lightText,
    textAlign: "center",
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "400",
});

export const link = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "10px",
});

export const linkItem = style({
    display: "flex",
    gap: "10px",
    color: vars.color.lightText,
    textAlign: "center",
    fontFamily: vars.typography.fontFamily.jap,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    flexDirection: "row",
});

export const github = style({
    width: "20px",
    height: "20px",
    background: "url(/images/github-mark-white-1.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
});

export const twitter = style({
    width: "20px",
    height: "20px",
    background: "url(/images/twitter-x-line-1.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
});