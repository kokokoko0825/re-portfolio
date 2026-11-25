/* eslint-env node, es2021 */
import assert from "node:assert/strict";
import { createServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const server = await createServer({
    configFile: false,
    cacheDir: "node_modules/.cache/link-embed-check",
    plugins: [tsconfigPaths(), vanillaExtractPlugin()],
    server: { middlewareMode: true },
    appType: "custom",
});
const originalFetch = globalThis.fetch;
try {
    const { renderMarkdownWithEmbeds, initializeLinkEmbeds } = await server.ssrLoadModule("/app/utils/markdownRenderer.tsx");
    const { getHttpUrl } = await server.ssrLoadModule("/app/utils/httpUrl.ts");
    const malicious = '<img src=x onerror=alert(1)>';
    const url = "https://example.com/?a=1&b=$&";
    const html = renderMarkdownWithEmbeds(url).__html;
    assert.ok(html.includes('class="link-embed"'));
    assert.ok(html.includes('https://example.com/?a=1&amp;b=$&amp;'));
    for (const unsafe of ["javascript:alert(1)", "data:image/svg+xml,<svg/>", "//example.com/x", "/x"]) {
        assert.equal(getHttpUrl(unsafe), undefined);
    }
    assert.equal(getHttpUrl("https://example.com/image.png"), "https://example.com/image.png");
    assert.equal(getHttpUrl("http://example.com/image.png"), "http://example.com/image.png");

    // innerHTMLへの書き込みは即失敗させ、実際の初期化処理がtextContentを使うことを検証。
    const created = [];
    const element = () => ({
        style: {}, textContent: "",
        set innerHTML(_value) { throw new Error("Untrusted HTML assignment"); },
    });
    const title = element();
    const description = element();
    const meta = element();
    let children;
    meta.replaceChildren = (...nodes) => { children = nodes; };
    const parts = {
        ".link-embed-title": title, ".link-embed-description": description,
        ".link-embed-meta": meta, ".link-embed-url": { textContent: url },
    };
    const embed = { style: {}, querySelector: selector => parts[selector], addEventListener() {} };
    globalThis.window = {};
    globalThis.document = {
        querySelectorAll: () => [embed],
        createElement: tag => { assert.equal(tag, "span"); const node = element(); created.push(node); return node; },
    };
    globalThis.fetch = async () => ({ json: async () => ({ title: malicious, description: malicious, siteName: malicious }) });
    initializeLinkEmbeds();
    await new Promise(resolve => setTimeout(resolve, 150));
    assert.equal(title.textContent, malicious);
    assert.equal(description.textContent, malicious);
    assert.equal(created.length, 2);
    assert.equal(children[0].className, "link-embed-site");
    assert.equal(children[0].textContent, malicious);
    assert.equal(children[1].className, "link-embed-url");
    assert.equal(children[1].textContent, url);
    console.log("PASS: malicious metadata stays text; URL escaping and HTTP(S) image policy");
} finally {
    globalThis.fetch = originalFetch;
    delete globalThis.window;
    delete globalThis.document;
    await server.close();
}
