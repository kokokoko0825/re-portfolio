import { Parser, jaModel } from "budoux";

// DOMを使わないパーサーを共有し、CloudflareのSSRでも同じ文節に分ける。
const japaneseParser = new Parser(jaModel);

export function splitPhrases(text: string): string[] {
    return japaneseParser.parse(text);
}
