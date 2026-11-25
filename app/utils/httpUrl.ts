// 外部メタデータをリンク・画像へ渡す前に、絶対HTTP(S) URLに限定する。
export function getHttpUrl(value: string): string | undefined {
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
    } catch {
        return undefined;
    }
}
