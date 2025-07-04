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


// title
globalStyle("h1", {
    fontFamily: "Inter",
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
});
globalStyle("h1", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "24px",
        }
    }
});


// subtitle
globalStyle("h2", {
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
    margin: 0,
})
globalStyle("h2", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "20px",
        }
    }
});

// subtitle
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
globalStyle("Link", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "20px",
        }
    }
});

// 多分Headerのリンク
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
globalStyle("a", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "20px",
        }
    }
});

// default
globalStyle("p", {
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("p", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "18px", // 12px
        }
    }
});

// linksize
globalStyle("small", {
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("small", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "12px", // 10px
        }
    }
});

// githubiconとか
globalStyle("svg", {
    width: "25px",
    height: "25px",
    aspectRatio: "1/1",
    color: vars.color.text,
})
globalStyle("svg", {
    "@media": {
        "screen and (max-width: 768px)": {
            width: "15px",
        }
    }
});

// 多分defaultと一緒
globalStyle("li", {
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("li", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "18px", // 12px
        }
    }
});

// worksの画像
globalStyle("img", {
    width: "300px",
    height: "200px",
    aspectRatio: "3/2",
    objectFit: "cover",
})
globalStyle("img", {
    "@media": {
        "screen and (max-width: 768px)": {
            width: "200px",
            height: "133px",
        }
    }
});

// thumbnail
globalStyle("span", {
    fontFamily: "Inter",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("span", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "48px",
        }
    }
});

// loginのinput
globalStyle("input", {
    maxWidth: "330px",
    height: "30px",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.background,
})
globalStyle("input", {
    "@media": {
        "screen and (max-width: 768px)": {
            width: "250px",
        }
    }
});

globalStyle("button", {
    display: "flex",
    padding: "10px 30px",
    alignItems: "flex-start",
    gap :"10px",
    borderRadius: "10px",
    background: vars.color.text,
})

// codefont
globalStyle("code", {
    fontFamily: "Inter",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("code", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "15px", // 11px
        }
    }
});