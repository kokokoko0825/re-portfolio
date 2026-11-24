# HIG準拠タイポグラフィ・余白トークン導入プラン

調査: `ideas/20261124-hig-typography-research.md`

## 意図（なぜ必要か）
- 現状は font-size / weight / line-height / 余白が各ファイルに px 直書きで散在し（約135箇所）、`lineHeight: "normal"` のままの箇所が多い。日本語では `normal`（Noto Sans JP で約1.45前後）だと本文が詰まって見える。
- 同じ役割（例: 日付、カード名）がページごとに 12px / 14px / 20px とばらばらで、階層が読み取りにくい。
- HIG の「役割ベースのテキストスタイル」に揃え、1か所のトークンから参照することで一貫性と保守性を確保する（DRY）。

## 方針と選択理由
| 項目 | 採用 | 理由 |
| --- | --- | --- |
| 階層 | HIG iOS Large の役割名（largeTitle〜caption）を借りる | HIG は Web 用の数表ではないため、役割と階層だけ借り、数値は日本語向けに調整 |
| 本文サイズ | 17px(desktop) / 16px(mobile) | HIG Body 17pt を踏襲。日本語でもデジタル庁の本文16px以上を満たす |
| 最小サイズ | 14px | HIG の 11–13pt をそのまま使うと日本語の画数の多い漢字が潰れる。デジタル庁の補足文字下限に合わせる |
| caption 細分化 | footnote / caption の2つに集約 | HIG の Caption1/2 まで分けても本サイトで使い分ける場面がない（YAGNI） |
| 行高 | 見出し1.4–1.5 / UI本文1.5 / 説明本文1.75 / 記事本文1.9 | 日本語は欧文より行間を広く取る（JLREQ: 行送り1.5–2倍）。HIG も長文での tight leading を禁止 |
| 字間 | 原則 0 | SF Pro の tracking 表は日本語に適用されない。Apple Japan・デジタル庁とも日本語は 0。0.05em 一律付与はしない |
| 例外字間 | 英字の hero 氏名のみ -0.01em | SF Pro は大サイズで負の tracking。英字ディスプレイ文字だけに適用 |
| weight | 本文400 / 見出し500 / 記事本文のstrong・bのみ700 | Noto Sans JP の見出し700は黒みが強いため、階層は大きさと500で表現する |
| hero 氏名 | 48/36px, weight 500, lh 1.15 | 元の36pxを基準に、デスクトップで一段だけ大きくする |
| 単位 | rem | ユーザーのブラウザ文字サイズ設定に追随（HIG Dynamic Type の目的を Web に移す） |
| 余白 | 4px 基準のスケール（4/8/12/16/20/24/32/40/48/64/96） | SmartHR primitive・デジタル庁の8px基準と整合 |
| 記事幅 | 40em（約40全角字） | JLREQ の横組最大約40字。TOC は外側 |
| タップ領域 | TOC・デスクトップナビは最小高さ44px、モバイルメニューは48px | HIG/Apple Design Tips の44ptを満たし、モバイルメニューは20px・500で操作しやすくする |

## 修正理由
heroの元サイズは36pxで、96pxはBlog・Works詳細のサムネイル絵文字だった。役割の誤対応を修正し、例えば「Koshi Tanaka」は96/48pxから48/36pxへ変更する。Noto Sans JPでは見出し700が重すぎるため、見出しのウェイトを500に統一し、700は記事本文の`strong`・`b`による明示的な強調だけに使用する。モバイルメニューは元の20pxに戻し、最小高さ48pxを確保する。

## トークン（rem換算は 16px 基準）
### Type
| token | desktop | mobile | weight | lh | ls |
| --- | --- | --- | --- | --- | --- |
| heroName | 48 | 36 | 500 | 1.15 | -0.01em |
| largeTitle | 32 | 28 | 500 | 1.4 | 0 |
| title1 | 28 | 26 | 500 | 1.5 | 0 |
| title2 | 24 | 20 | 500 | 1.5 | 0 |
| title3 | 20 | 18 | 500 | 1.5 | 0 |
| headline | 17 | 16 | 500 | 1.5 | 0 |
| body | 17 | 16 | 400 | 1.75 | 0 |
| subheadline | 16 | 16 | 500 | 1.5 | 0 |
| uiBody | 16 | 16 | 400 | 1.5 | 0 |
| footnote | 14 | 14 | 400 | 1.6 | 0 |
| caption | 14 | 14 | 500 | 1.6 | 0 |
| articleBody | 18 | 16 | 400 | 1.9 | 0 |
| articleH2 | 28 | 24 | 500 | 1.5 | 0 |
| articleH3 | 24 | 20 | 500 | 1.5 | 0 |
| articleH4 | 20 | 18 | 500 | 1.5 | 0 |

### Layout
| token | desktop | mobile |
| --- | --- | --- |
| pageInset | 32 | 20 |
| sectionGap | 96 | 64 |
| cardGap | 24 | 16 |
| cardPadding | 24 | 20 |
| cardContentGap | 12 | 12 |
| article max-width | 40em | 100% |
| article h2 margin 上/下 | 64/24 | 48/16 |
| article h3 | 48/16 | 40/12 |
| article h4 | 32/12 | 32/12 |
| p + p | 1.5em | 1.5em |
| ul/ol 上下 | 24 | 24 |
| li gap | 8 | 8 |
| TOC link | padding-block 8, min-height 44, 下位字下げ 16 | 同 |

## 実装手順
1. `app/styles/tokens.css.ts` に type / space / layout トークンと、レスポンシブ込みの type スタイル生成ヘルパーを定義（ブレークポイントは既存のものを流用）
2. `app/styles/style.css.ts`, `app/routes/styles.css.ts`, 各 component の styles を役割に応じてトークン参照へ置換
3. ブログ記事（zenn-content-css 上書き部）に article 系トークンを適用
4. admin 画面のインライン style も同トークンへ
5. `pnpm typecheck` / `pnpm lint` / `pnpm build` を通す
6. `docs/20261124-hig-typography.md` に変更内容を具体例付きで記録
