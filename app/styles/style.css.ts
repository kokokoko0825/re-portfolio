import { typeStyle, type, space, layout, mobile } from "./tokens";
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("html, body", {
    color: vars.color.text,
    backgroundColor: vars.color.background,
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    margin: 0,
    padding: 0,
    // width: "1440px",
    // maxWidth: "1440px",
    // minWidth: "1440px",
});

// rem の基準となる html の文字サイズはブラウザ設定に委ねる。
globalStyle("body", typeStyle("body"));

// 見出しの最終行に1〜2文字だけ残る折り返し（例:「…作っ／た」）を防ぐ
globalStyle("h1, h2, h3, h4, h5, h6", { textWrap: "pretty" });

// title
globalStyle("h1", {
    ...typeStyle("largeTitle"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
    margin: 0,
});

// subtitle
globalStyle("h2", {
    ...typeStyle("title2"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
    margin: 0,
})

// subtitle
globalStyle("Link", {
    ...typeStyle("subheadline"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
    margin: 0,
    textDecorationLine: "none",
    textDecorationColor: vars.color.text,
})

// 多分Headerのリンク
globalStyle("a", {
    fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", letterSpacing: "inherit",
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
    margin: 0,
    textDecorationLine: "none",
    textDecorationColor: vars.color.text,
})

// default
globalStyle("p", {
    ...typeStyle("body"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
})

// linksize
globalStyle("small", {
    ...typeStyle("footnote"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
})

// githubiconとか
globalStyle("svg", {
    width: "25px",
    height: "25px",
    aspectRatio: "1/1",
    color: vars.color.text,
})
globalStyle("svg", {
    "@media": {
        [mobile]: {
            width: "15px",
        }
    }
});

// 多分defaultと一緒
globalStyle("li", {
    ...typeStyle("body"),
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
})

// worksの画像
globalStyle("img", {
    width: "300px",
    height: "200px",
    aspectRatio: "3/2",
    objectFit: "cover",
})
globalStyle("img", {
    "@media": {
        [mobile]: {
            width: "200px",
            height: "133px",
        }
    }
});

// thumbnail
globalStyle("span", {
    fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", letterSpacing: "inherit",
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.text,
})

// loginのinput
globalStyle("input", {
    ...typeStyle("uiBody"),
    maxWidth: "330px",
    height: "30px",
    borderRadius: "10px",
    fontFamily:
        '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    fontStyle: "normal",

    color: vars.color.background,
})
globalStyle("input", {
    ...typeStyle("uiBody"),
    "@media": {
        [mobile]: {
            width: "250px",
        }
    }
});

globalStyle("button", {
    ...typeStyle("uiBody"),
    fontFamily: "inherit",
    display: "flex",
    padding: `${space[12]} ${space[32]}`,
    alignItems: "flex-start",
    gap: space[12],
    borderRadius: "10px",
    background: vars.color.text,
    color: vars.color.background,
    border: "none",
    cursor: "pointer",
})

// codefont
globalStyle("code", {
    ...typeStyle("uiBody"),
    fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

    fontStyle: "normal",

    color: vars.color.text,
})

// PrismJS code block styles
globalStyle('pre[class*="language-"]', {
    background: vars.color.codeBlock.background,
    border: `1px solid ${vars.color.codeBlock.border}`,
    borderRadius: "10px",
    padding: `${space[16]} 0`,
    overflow: "auto",
    margin: `${space[16]} 0`,
});

globalStyle('pre[class*="language-"].line-numbers', {
    paddingLeft: "3.5rem",
});

globalStyle('code[class*="language-"]', {
    ...typeStyle("uiBody"),
    fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

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

// Twitter埋め込みのスタイル調整（Zennライクなセンタリングと幅＋スケールダウン）
globalStyle('.twitter-embed-wrapper', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '640px',
    margin: '1.75rem auto',
    transform: 'scale(0.9)',
    transformOrigin: 'top center',
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

// その他の埋め込みカードも少し小さくスケール
globalStyle('.youtube-embed-wrapper', {
    transform: 'scale(0.9)',
    transformOrigin: 'top center',
});

globalStyle('.gslides-embed-wrapper', {
    transform: 'scale(0.9)',
    transformOrigin: 'top center',
});

globalStyle('.link-embed-wrapper', {
    transform: 'scale(0.9)',
    transformOrigin: 'top center',
});

// 記事本文(.znc)内のコードブロック・引用などの余白調整
globalStyle(".znc pre", {
    margin: `${space[24]} 0`,
    padding: `${space[12]} ${space[16]}`,
});

globalStyle(".znc blockquote", {
    margin: `${space[16]} 0`,
    padding: "0.1em 1em",
    borderLeft: `4px solid ${vars.color.borderColor}`,
});

// 記事本文は TOC を含めず、本文サイズを基準とする可読幅にする。
globalStyle(".znc", {
    ...typeStyle("articleBody"),
    width: "100%",
    maxWidth: layout.articleMaxWidth,
    "@media": { [mobile]: { fontSize: type.articleBody.mobileSize, maxWidth: layout.mobile.articleMaxWidth } },
});

globalStyle(".znc p, .znc li", {
    ...typeStyle("articleBody"),
    margin: 0,
});

globalStyle(".znc strong, .znc b", { fontWeight: 700 });

globalStyle(".znc a, .znc span", {
    fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", letterSpacing: "inherit",
});
globalStyle(".znc a", { textDecorationLine: "underline", textDecorationColor: vars.color.text });
globalStyle(".znc code", { ...typeStyle("uiBody"), fontSize: "0.9em" });
globalStyle(".znc pre code", { fontSize: "0.875em" });

globalStyle(".znc h1", { ...typeStyle("title1"), margin: `${space[64]} 0 ${space[24]}` });
globalStyle(".znc h2", {
    ...typeStyle("articleH2"), margin: `${space[64]} 0 ${space[24]}`,
    "@media": { [mobile]: { fontSize: type.articleH2.mobileSize, margin: `${space[48]} 0 ${space[16]}` } },
});
globalStyle(".znc h3", {
    ...typeStyle("articleH3"), margin: `${space[48]} 0 ${space[16]}`,
    "@media": { [mobile]: { fontSize: type.articleH3.mobileSize, margin: `${space[40]} 0 ${space[12]}` } },
});
globalStyle(".znc h4", { ...typeStyle("articleH4"), margin: `${space[32]} 0 ${space[12]}` });
globalStyle(".znc p + p", { marginTop: "1.5em" });
globalStyle(".znc ul, .znc ol, .znc ul ul, .znc ul ol, .znc ol ul, .znc ol ol", { marginBlock: space[24], paddingLeft: "1.5em" });
globalStyle(".znc ul, .znc ol, .znc li", { lineHeight: 1.75 });
globalStyle(".znc ul > li, .znc ol > li", { margin: 0 });
globalStyle(".znc li + li", { marginTop: space[8] });
globalStyle(".znc h1 + p, .znc h2 + p, .znc h3 + p, .znc h4 + p", { marginTop: 0 });
globalStyle(".znc > :first-child", { marginTop: 0 });


globalStyle(".znc .link-embed-title", { ...typeStyle("title3"), margin: `0 0 ${layout.cardContentGap}` });
globalStyle(".znc .link-embed-description", { ...typeStyle("body"), margin: `0 0 ${layout.cardContentGap}` });
globalStyle(".znc .link-embed-site", typeStyle("caption"));
globalStyle(".znc .link-embed-url", typeStyle("footnote"));
globalStyle(".znc li p", { lineHeight: "inherit" });

globalStyle(".znc .link-embed-content", {
    padding: layout.cardPadding, gap: layout.cardContentGap,
    "@media": { [mobile]: { padding: layout.mobile.cardPadding } },
});
globalStyle(".znc .link-embed-meta", { gap: space[4] });
