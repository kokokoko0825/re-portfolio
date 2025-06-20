/**
 * Vanilla Extract CSSのスタイルを扱うためのユーティリティ関数
 */

/**
 * スタイルクラス名を結合する関数
 * @param classNames 結合するクラス名の配列
 * @returns 結合されたクラス名の文字列
 */
export function cx(...classNames: (string | undefined | null | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * メディアクエリ用の定数
 */
export const breakpoints = {
  mobile: 'screen and (max-width: 768px)',
  tablet: 'screen and (min-width: 769px) and (max-width: 1024px)',
  desktop: 'screen and (min-width: 1025px)',
};

/**
 * サーバーサイドレンダリング時にスタイルが適用されているかを確認する関数
 * @returns boolean
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}