import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";
import "zenn-content-css";

export const frame = style({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    "@media": {
        "screen and (max-width: 768px)": {
            gap: "10px",
        }
    }
});

export const about = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "30px",
    "@media": {
        "screen and (max-width: 768px)": {
            paddingTop: "77px 10px 10px 10px",
            gap: "10px",
            alignSelf: "stretch",
        }
    }
})

export const blog = style({
    display: "flex",
    padding: "120px 0px 0px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            paddingTop: "77px 10px 10px 10px",
            gap: "10px",
            alignItems: "center",
            alignSelf: "stretch",
        }
    }
})

export const works = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            paddingTop: "77px 10px 10px 10px",
            gap: "20px",
            alignItems: "center",
            alignSelf: "stretch",
        }
    }
})

export const blogId = style({
    display: "flex",
    width: "100%",
    maxWidth: "800px",
    padding: "100px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    boxSizing: "border-box",
    "@media": {
        "screen and (max-width: 768px)": {
            width: "auto",
            padding: "75px 10px 0px 10px",
            gap: "20px",
            alignSelf: "stretch",
        }
    }
})

export const login = style({
    display: "flex",
    padding: "120px 10px 10px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
    "@media": {
        "screen and (max-width: 768px)": {
            padding: "100px 10px",
        }
    }
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
    "@media": {
        "screen and (max-width: 768px)": {
            alignItems: "center",
            gap: "20px",
            alignSelf: "stretch",
        }
    }
})

export const adminnewCreate = style({
    display: "flex",
    width: "760px",
    padding: "100px 10px 0px 10px",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            width: "auto",
            padding: "100px 20px 0px 20px",
            alignSelf: "stretch",
        }
    }
})

export const section = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            padding: "10px 30px",
            gap: "20px",
            alignSelf: "stretch",
        }
    }
})

export const list = style({
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            gap: "5px",
            alignSelf: "stretch",
        }
    }
})

export const workList = style({
    display: "flex",
    maxWidth: "750px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: "40px",
    flexWrap: "wrap",
    "@media": {
        "screen and (max-width: 768px)": {
            width: "100%",
            boxSizing: "border-box",
            padding: "10px",
            gap: "20px",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
        }
    }
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
    "@media": {
        "screen and (max-width: 768px)": {
            padding: "20px 30px",
            gap: "20px",
            alignSelf: "stretch",
        }
    }
})

export const textFrame = style({
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: "10px",
    flexWrap: "wrap",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    "@media": {
        "screen and (max-width: 768px)": {
            width: "100%",
            boxSizing: "border-box",
            padding: "0px 30px",
        }
    }
});

// Zenn content CSS用のglobalStyleを追加
globalStyle(`${textFrame} .znc`, {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
});

globalStyle(`${textFrame} .znc *`, {
    maxWidth: "100%",
    boxSizing: "border-box",
});

globalStyle(`${textFrame} .znc img`, {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    objectFit: "contain",
});

globalStyle(`${textFrame} .znc pre`, {
    overflowX: "auto",
    maxWidth: "100%",
    boxSizing: "border-box",
});

globalStyle(`${textFrame} .znc code`, {
    overflowWrap: "break-word",
    wordBreak: "break-word",
});

globalStyle(`${textFrame} .znc table`, {
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    display: "block",
});

export const backFrame = style({
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "10px",
    alignSelf: "stretch",
    "@media": {
        "screen and (max-width: 768px)": {
            padding: "30px 10px",
            alignItems: "center",
        }
    }
})

export const loginCard = style({
    display: "flex",
    padding: "50px 30px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "30px",
    borderRadius: "10px",
    border: `2px solid ${vars.color.borderColor}`,
    "@media": {
        "screen and (max-width: 768px)": {
            gap: "30px",
        }
    }
})

export const adminSelect = style({
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "150px",
    alignSelf: "stretch",
    "@media": {
        "screen and (max-width: 768px)": {
            gap: "80px",
        }
    }
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
    "@media": {
        "screen and (max-width: 768px)": {
            width: "auto",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
        }
    }
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

export const adminThumbnailInput = style({
    fontSize: "96px", 
    width: "auto", 
    height: "auto", 
    textAlign: "center", 
    border: "none", 
    background: "none", 
    color: "#DEDBFF",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "48px",
        }
    }
})

export const adminTitleInput = style({
    fontSize: "36px", 
    width: "100%", 
    height: "auto", 
    background: "none", 
    border: "none", 
    color: "#DEDBFF",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "24px",
        }
    }
})

export const adminDescriptionInput = style({
    fontSize: "20px", 
    width: "100%", 
    height: "auto", 
    background: "none", 
    border: "none", 
    color: "#DEDBFF",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "12px",
        }
    }
})

export const adminTextareaInput = style({
    fontSize: "20px", 
    width: "100%", 
    height: "700px", 
    background: "#DEDBFF", 
    border: "none", 
    color: "#2C2E47", 
    borderRadius: "10px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "12px",
            height: "500px",
        }
    }
})

export const titleText = style({
    fontSize: "36px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "24px",
        }
    }
})

export const subtitleText = style({
    fontSize: "24px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "20px",
        }
    }
})

export const defaultText = style({
    fontSize: "20px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "18px",
        }
    }
})

export const linkText = style({
    fontSize: "16px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "12px",
        }
    }
})

export const careerText = style({
    fontSize: "20px",
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "15px",
        }
    }
})