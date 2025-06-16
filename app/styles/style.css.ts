import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("html, body", {
    color: vars.color.text,
    backgroundColor: vars.color.background,
    //fontFamily: vars.typography.fontFamily.jap,
    margin: 0,
    padding: 0,
    // width: "1440px",
    // maxWidth: "1440px",
    // minWidth: "1440px",
});

globalStyle("h1", {
    fontFamily: "Inter",
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
})

globalStyle("h2", {
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
})

globalStyle("Link", {
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
    textDecorationLine: "none",
    textDecorationColor: vars.color.text,
})

globalStyle("a", {
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
    textDecorationLine: "none",
    textDecorationColor: vars.color.text,
})

globalStyle("p", {
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})

globalStyle("small", {
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})

globalStyle("svg", {
    width: "25px",
    height: "25px",
    aspectRatio: "1/1",
    color: vars.color.text,
})

globalStyle("li", {
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})

globalStyle("img", {
    width: "300px",
    height: "200px",
    objectFit: "cover",
})

globalStyle("span", {
    fontFamily: "Inter",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})

globalStyle("input", {
    width: "330px",
    height: "30px",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.background,
})

globalStyle("button", {
    display: "flex",
    padding: "10px 30px",
    alignItems: "flex-start",
    gap :"10px",
    borderRadius: "10px",
    background: vars.color.text,
})