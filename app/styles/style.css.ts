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
    gap: "10px",
    borderRadius: "10px",
    background: vars.color.text,
    color: vars.color.background,
    border: "none",
    cursor: "pointer",
})

// codefont
globalStyle("code", {
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: vars.color.text,
})
globalStyle("code", {
    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "12px", // 11px
        }
    }
});

// PrismJS code block styles
globalStyle('pre[class*="language-"]', {
    background: vars.color.codeBlock.background,
    border: `1px solid ${vars.color.codeBlock.border}`,
    borderRadius: "10px",
    padding: "16px 0 16px 0",
    overflow: "auto",
    margin: "16px 0",
});

globalStyle('pre[class*="language-"].line-numbers', {
    paddingLeft: "3.5rem",
});

globalStyle('code[class*="language-"]', {
    fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "16px",
    lineHeight: "1.8",
    color: vars.color.codeBlock.text,
});

// Prism が各トークンを span でラップするため、全体の span スタイルの影響を受けないようにする
globalStyle('code[class*="language-"] span', {
    fontSize: "inherit",
    lineHeight: "inherit",
});

globalStyle(".line-numbers-rows > span:before", {
    color: vars.color.codeBlock.lineNumber,
});

// 行番号のガター幅・余白
globalStyle('pre.line-numbers', {
    paddingLeft: "3.6rem",
});
globalStyle('pre.line-numbers .line-numbers-rows', {
    width: "3.2rem",
});

// トップに薄いラインを追加（画像の雰囲気寄せ）
// 以前はトップの水平線を演出していたが、不要なため削除

// Prism トークン色の微調整（画像の配色に寄せる）
globalStyle('.token.comment, .token.prolog, .token.doctype, .token.cdata', {
    color: vars.color.codeBlock.tokens.comment,
});
globalStyle('.token.punctuation', {
    color: vars.color.codeBlock.tokens.punctuation,
});
globalStyle('.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted', {
    color: vars.color.codeBlock.tokens.property,
});
globalStyle('.token.boolean, .token.number', {
    color: vars.color.codeBlock.tokens.boolean,
});
globalStyle('.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted', {
    color: vars.color.codeBlock.tokens.selector,
});
globalStyle('.token.operator, .token.entity, .token.url', {
    color: vars.color.codeBlock.tokens.operator,
});
globalStyle('.token.atrule, .token.attr-value, .token.keyword', {
    color: vars.color.codeBlock.tokens.atrule,
});
globalStyle('.token.function, .token.class-name', {
    color: vars.color.codeBlock.tokens.function,
});
globalStyle('.token.regex, .token.important, .token.variable', {
    color: vars.color.codeBlock.tokens.regex,
});

// Twitter埋め込みのスタイル調整
globalStyle('.twitter-embed-wrapper', {
    margin: '2rem 0',
});

// Twitter APIが生成する要素のマージンをリセット
globalStyle('.twitter-embed-wrapper blockquote.twitter-tweet', {
    margin: '0 !important',
    marginTop: '0 !important',
    marginBottom: '0 !important',
});

// Twitter埋め込みコンテナ内の余分な空間を削除
globalStyle('[id^="tweet-"]', {
    margin: '0',
    padding: '0',
});

globalStyle('[id^="tweet-"] > *', {
    margin: '0 !important',
    marginTop: '0 !important',
    marginBottom: '0 !important',
});