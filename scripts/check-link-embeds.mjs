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
        style: {}, textContent: "", addEventListener() {}, insertBefore() {}, remove() {},
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
    const embed = { dataset: {}, style: {}, insertBefore() {}, querySelector: selector => parts[selector], addEventListener() {} };
    meta.querySelector = () => created.find(node => node.className === "link-embed-site");
    globalThis.window = {};
    globalThis.document = {
        querySelectorAll: () => [embed],
        createElement: tag => { assert.ok(["span", "img"].includes(tag)); const node = element(); created.push(node); return node; },
    };
    globalThis.fetch = async () => ({ json: async () => ({ title: malicious, description: malicious, siteName: malicious }) });
    embed.dataset = {};
    initializeLinkEmbeds();
    await new Promise(resolve => setTimeout(resolve, 150));
    assert.equal(title.textContent, malicious);
    assert.equal(description.textContent, malicious);
    assert.equal(created.length, 2);
    assert.equal(children[0].className, "link-embed-site");
    assert.equal(children[0].textContent, malicious);
    assert.equal(children[1].className, "link-embed-url");
    assert.equal(children[1].textContent, url);
    for (const unsafe of ["javascript:alert(1)", "data:image/svg+xml,<svg/>", malicious]) {
        created.length = 0;
        globalThis.fetch = async () => ({ json: async () => ({ title: malicious, siteName: malicious, image: unsafe, favicon: unsafe }) });
        embed.dataset = {};
    initializeLinkEmbeds();
        await new Promise(resolve => setTimeout(resolve, 150));
        assert.equal(created.length, 2, `Rejected image/favicon: ${unsafe}`);
        assert.equal(title.textContent, malicious);
        assert.equal(children[0].textContent, malicious);
    }
    created.length = 0;
    globalThis.fetch = async () => ({ json: async () => ({ title: "safe", image: "https://example.com/og.png", favicon: "https://example.com/icon.png" }) });
    embed.dataset = {};
    initializeLinkEmbeds();
    await new Promise(resolve => setTimeout(resolve, 150));
    assert.equal(created.find(node => node.className === "link-embed-image").src, "https://example.com/og.png");
    assert.equal(created.find(node => node.className === "link-embed-favicon").src, "https://example.com/icon.png");
    for (const host of ["x.com", "www.x.com", "twitter.com", "www.twitter.com", "mobile.twitter.com", "www.mobile.twitter.com"]) {
        for (const suffix of ["", "?s=20", "?s=46&t=abc", "#m"]) {
            const input = `https://${host}/user/status/123${suffix}`;
            for (const markdown of [input, `[投稿](${input})`]) assert.match(renderMarkdownWithEmbeds(markdown).__html, /id="tweet-123"/);
        }
    }
    assert.doesNotMatch(renderMarkdownWithEmbeds("https://x.com.evil.test/user/status/123").__html, /id="tweet-/);
    assert.doesNotMatch(renderMarkdownWithEmbeds("`https://x.com/user/status/123`").__html, /id="tweet-/);
    for (const input of ["https://youtu.be/zPy4RgUcKKs?si=abc&t=20", "https://www.youtube.com/watch?si=abc&v=zPy4RgUcKKs&t=20", "https://youtube.com/shorts/zPy4RgUcKKs?si=abc#t=20"]) {
        for (const markdown of [input, `[動画](${input})`]) {
            const output = renderMarkdownWithEmbeds(markdown).__html;
            assert.match(output, /class="youtube-embed"/);
            assert.match(output, /vi\/zPy4RgUcKKs\/hqdefault.jpg/);
            assert.match(output, /aria-label="YouTube で動画を見る: zPy4RgUcKKs"/);
        }
    }
    assert.match(renderMarkdownWithEmbeds("https://docs.google.com/presentation/d/abc_123/edit?usp=sharing#slide=id.p").__html, /abc_123\/preview/);
    const { loader } = await server.ssrLoadModule("/app/routes/api.link-preview.tsx");
    for (const [markup, expected] of [[`<link href="icons/a.png" rel="shortcut icon">`, "https://example.com/path/icons/a.png"], [`<link rel="apple-touch-icon" href="/touch.png">`, "https://example.com/touch.png"], ["", "https://example.com/favicon.ico"]]) {
        globalThis.fetch = async () => ({ ok: true, url: "https://example.com/path/page", text: async () => `${markup}<meta property="og:image" content="../og.png">` });
        const response = await loader({ request: new Request("https://local.test/api/link-preview?url=https://example.com/path/page") });
        const data = await response.json();
        assert.equal(data.favicon, expected);
        assert.equal(data.image, "https://example.com/og.png");
    }
    console.log("PASS: malicious metadata stays text; URL escaping and HTTP(S) image policy");
} finally {
    globalThis.fetch = originalFetch;
    delete globalThis.window;
    delete globalThis.document;
    await server.close();
}
