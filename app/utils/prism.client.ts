let prismPromise: Promise<typeof import("prismjs")["default"]> | undefined;

export function loadPrism() {
    return prismPromise ??= (async () => {
        // core は評価時に manual を読み、自動ハイライトの予約を判断する。
        const prismWindow = window as Window & { Prism?: Partial<typeof import("prismjs")["default"]> };
        prismWindow.Prism ??= {};
        prismWindow.Prism.manual = true;
        // full core は markup / css / clike / javascript を含む。
        const Prism = (await import("prismjs")).default;
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
    })().catch((error: unknown) => {
        prismPromise = undefined;
        throw error;
    });
}
