import { style } from "@vanilla-extract/css";

// balanceが文節内の緊急改行を優先しないよう、収まる文節は一まとまりにする。
// 幅を超える長い文節・URLだけはanywhereで折り返す。
export const phrase = style({
    display: "inline-block",
    maxWidth: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
});
