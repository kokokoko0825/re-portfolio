## フォントポリシー（Noto Sans JP 統一）

- **採用フォント**: Noto Sans JP（Google Fonts 経由）
- **目的**: 日本語コンテンツの可読性向上と、サイト全体で一貫したタイポグラフィを実現するため。

## 読み込み方法

- Remix の `app/root.tsx` の `links()` で、次のスタイルシートを読み込む:
  - `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap`
- `fonts.googleapis.com` / `fonts.gstatic.com` への `preconnect` を設定済み。

## グローバル適用

- `app/styles/style.css.ts` の `globalStyle("html, body", …)` で、以下の `fontFamily` を設定:
  - `"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `h1, h2, a, p, small, li, span, input` などのテキスト要素も、同じフォントスタックに統一。
- クリティカルCSS（`app/styles/critical.css`, `public/styles/critical.css`）でも、`html, body` の `font-family` を同じスタックに設定し、初期描画時から Noto Sans JP が適用されるようにする。

## 例外（等幅フォント）

- コードブロックやインラインコードは、可読性のため等幅フォントを使用する:
  - `code` 要素: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  - PrismJS のハイライト対象（`code[class*="language-"]`）も同じ等幅フォントスタックを使用。
- それ以外の要素では、原則として Noto Sans JP を使用し、別フォントを個別指定しない。

## 運用上の注意

- 新規コンポーネントやスタイルを追加する際は、`font-family` を個別指定せず、グローバル設定を継承することを基本とする。
- どうしても別フォントを使う場合は、デザイン上の理由をコメントやドキュメントに明示すること。

