/**
 * Firestore の blog ドキュメントから tags 配列を正規化する。
 * 後方互換: tags が無い場合は tag（単一文字列）から [tag] を生成する。
 */
export function normalizeBlogTags(data: { tags?: string[]; tag?: string }): string[] {
  if (data.tags && Array.isArray(data.tags)) {
    return data.tags.filter((t): t is string => typeof t === "string");
  }
  if (data.tag && typeof data.tag === "string") {
    return [data.tag];
  }
  return [];
}

/**
 * カンマ区切り文字列をタグ配列に変換（空・空白は除外）
 */
export function parseTagsInput(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * タグ配列をカンマ区切り文字列に変換（フォーム初期値用）
 */
export function formatTagsForInput(tags: string[]): string {
  return tags.join(", ");
}
