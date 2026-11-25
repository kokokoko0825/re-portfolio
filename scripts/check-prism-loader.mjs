/* eslint-env node, es2021 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

// 実ローダーの動的import境界だけを置き換え、一時的なchunk取得失敗を再現する。
const source = await readFile(new URL("../app/utils/prism.client.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const prismWindow = {};
const prism = {};
let attempts = 0;
const loadPrism = vm.runInNewContext(
    outputText.replace("export function", "function").replaceAll("import(", "mockImport(") + ";loadPrism;",
    { window: prismWindow, mockImport: async (specifier) => {
        if (specifier !== "prismjs") return {};
        assert.equal(prismWindow.Prism.manual, true);
        if (++attempts === 1) throw new Error("temporary chunk failure");
        return { default: prism };
    } },
);
const first = loadPrism();
assert.equal(loadPrism(), first);
await assert.rejects(first, /temporary chunk failure/);
const retry = loadPrism();
assert.notEqual(retry, first);
assert.equal(await retry, prism);
assert.equal(await loadPrism(), prism);
assert.equal(attempts, 2);
console.log("PASS: manual mode precedes core; rejected shared promise resets for retry");
