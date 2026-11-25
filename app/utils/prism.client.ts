let prismPromise: Promise<typeof import("prismjs")["default"]> | undefined;

export function loadPrism() {
    return prismPromise ??= (async () => {
        // full core は markup / css / clike / javascript を含む。
        const Prism = (await import("prismjs")).default;
        Prism.manual = true;
        await import("prismjs/components/prism-jsx");
        await import("prismjs/components/prism-typescript");
        await import("prismjs/components/prism-tsx");
        await import("prismjs/components/prism-json");
        await import("prismjs/components/prism-bash");
        await import("prismjs/components/prism-python");
        await import("prismjs/components/prism-c");
        await import("prismjs/components/prism-cpp");
        await import("prismjs/components/prism-yaml");
        await import("prismjs/plugins/line-numbers/prism-line-numbers");
        return Prism;
    })();
}
