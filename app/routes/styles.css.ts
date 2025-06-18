import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";
import "zenn-content-css";

export const frame = style({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
});

export const about = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "30px",
})

export const blog = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
})

export const works = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
})

export const blogId = style({
    display: "flex",
    width: "800px",
    padding: "100px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
})

export const login = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
})

export const admin = style({
    display: "flex",
    padding: "120px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "150px",
})

export const adminManagement = style({
    display: "flex",
    padding: "120px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "30px",
})

export const adminnewCreate = style({
    display: "flex",
    width: "760px",
    padding: "100px 10px 0px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
})

export const section = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
})

export const list = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
})

export const workList = style({
    display: "flex",
    width: "750px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: "40px",
    flexWrap: "wrap",
})

export const thumbnail = style({
    display: "flex",
    padding: "20px, 10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    alignSelf: "stretch",
    borderBottom: `2px solid ${vars.color.borderColor}`,
})

export const textFrame = style({
    display: "flex",
    width: "600px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: "10px",
    flexWrap: "wrap",
})

export const backFrame = style({
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "10px",
    alignSelf: "stretch",
})

export const loginCard = style({
    display: "flex",
    padding: "50px 30px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "30px",
    borderRadius: "10px",
    border: `2px solid ${vars.color.borderColor}`,
})

export const adminSelect = style({
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "150px",
    alignSelf: "stretch",
})

export const adminSection = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    alignSelf: "stretch",
})

export const newCreate = style({
    display: "flex",
    padding: "10px",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "10px",
    alignSelf: "stretch",
})

export const adminWorksList = style({
    display: "flex",
    width: "750px",
    padding: "27px 33px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    gap: "40px",
})

export const title = style({
    display: "flex",
    padding: "10px",
    alignItems: "center",
    gap: "10px",
    alignSelf: "stretch",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    fontSize: "36px",
})

export const description = style({
    display: "flex",
    padding: "10px",
    alignItems: "center",
    gap: "10px",
    alignSelf: "stretch",
    borderBottom: `2px solid ${vars.color.borderColor}`,
    fontSize: "24px",
})