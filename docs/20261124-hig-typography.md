# タイポグラフィ・余白トークン導入

2026-11-24。確定値は `plan/20261124-hig-typography.md` に従う。

## 変更内容

`app/styles/tokens.ts` に型・余白・レイアウト値を集約した。CSS出力のない通常のTypeScriptにしたため、管理画面の固定サイズのインラインスタイルでも同じ値を使える。`typeStyle("body")` の1行でサイズ・太さ・行高・字間とモバイル指定を適用する。既存で最も多い `screen and (max-width: 768px)` を再利用し、新しい境界は追加していない。

ページ見出しはlargeTitle、カード名はtitle3、説明はbody、日付はfootnote、タグはcaption、ナビはsubheadline、フォームはuiBodyを使用する。トップの「Koshi Tanaka」は専用クラスでheroNameを適用し、一般のspanへ巨大な文字サイズを継承させない。一般リンクは親の文字階層を継承し、ナビには明示的にsubheadlineを適用する。

記事本文はarticleBody、見出しはarticleH2/H3/H4を使い、幅40emの本文と外側のTOCを分離した。連続段落は1.5em、リスト上下24px・項目間8px・行高1.75、見出し直後の段落と先頭要素の上余白は0。TOCはリンク内の上下8px、最小高さ44px、下位レベルごとに16px字下げ。ナビリンクにも最小高さ44pxを適用した。

Markdownが生成するリンクカードのHTML内にも文字サイズと600ウェイトがあったため、既存クラス名を用いた共通CSSへ移した。配色・テーマ・記事内容・マークアップ構造は変更していない。`_index_backup` は変更していない。コミットしていない。

## Typeトークン

サイズは16px基準のrem。モバイルは768px以下。line-heightは単位なし、字間はheroName以外0。

| token | desktop rem (px) | mobile rem (px) | weight | line-height | letter-spacing |
| --- | --- | --- | --- | --- | --- |
| heroName | 6 (96) | 3 (48) | 500 | 1.15 | "-0.01em" |
| largeTitle | 2.25 (36) | 2 (32) | 700 | 1.4 | 0 |
| title1 | 1.75 (28) | 1.625 (26) | 700 | 1.5 | 0 |
| title2 | 1.5 (24) | 1.375 (22) | 700 | 1.5 | 0 |
| title3 | 1.25 (20) | 1.125 (18) | 700 | 1.5 | 0 |
| headline | 1.0625 (17) | 1 (16) | 700 | 1.5 | 0 |
| body | 1.0625 (17) | 1 (16) | 400 | 1.75 | 0 |
| subheadline | 1 (16) | 1 (16) | 500 | 1.5 | 0 |
| uiBody | 1 (16) | 1 (16) | 400 | 1.5 | 0 |
| footnote | 0.875 (14) | 0.875 (14) | 400 | 1.6 | 0 |
| caption | 0.875 (14) | 0.875 (14) | 500 | 1.6 | 0 |
| articleBody | 1.125 (18) | 1 (16) | 400 | 1.9 | 0 |
| articleH2 | 1.75 (28) | 1.5 (24) | 700 | 1.5 | 0 |
| articleH3 | 1.5 (24) | 1.25 (20) | 700 | 1.5 | 0 |
| articleH4 | 1.25 (20) | 1.125 (18) | 700 | 1.5 | 0 |

## 余白・レイアウトトークン

| spacing px | rem |
| --- | --- |
| 4 | 0.25 |
| 8 | 0.5 |
| 12 | 0.75 |
| 16 | 1 |
| 20 | 1.25 |
| 24 | 1.5 |
| 32 | 2 |
| 40 | 2.5 |
| 48 | 3 |
| 64 | 4 |
| 96 | 6 |

| layout | desktop | mobile |
| --- | --- | --- |
| pageInset | 2rem (32px) | 1.25rem (20px) |
| sectionGap | 6rem (96px) | 4rem (64px) |
| cardGap | 1.5rem (24px) | 1rem (16px) |
| cardPadding | 1.5rem (24px) | 1.25rem (20px) |
| cardContentGap | 0.75rem (12px) | 0.75rem (12px) |
| articleMaxWidth | 40em | 100% |
| 記事h2 上/下 | 4rem / 1.5rem | 3rem / 1rem |
| 記事h3 上/下 | 3rem / 1rem | 2.5rem / 0.75rem |
| 記事h4 上/下 | 2rem / 0.75rem | 2rem / 0.75rem |

ヒーローの上余白は既存の120/124pxを、96+24 / 96+24+4のspacing参照として維持した。

## 具体例（変更前 → 変更後）

- ブログの日付（モバイル）: 12px / normal → footnoteの0.875rem (14px) / 1.6。
- ブログカード名: 24/20px・400・normal → title3の20/18px・700・1.5。
- 記事本文: 16/13px・1.8 → articleBodyの18/16px・1.9。
- 記事h2: 22/18px・1.6 → 28/24px・1.5、上下64/24px（モバイル48/16px）。
- タグ: 12px → captionの14px・500・1.6。
- リンクカードのURL: 0.75rem (12px) → footnoteの0.875rem (14px)。
- 管理画面textarea: 20/12px → uiBodyの16/16px・1.5。
- TOC: block表示・高さ指定なし → flexで中央揃え、上下8px、最小44px。

コードは本文相対の0.9em、コードブロック内は0.875emとし、例外範囲の下限を満たす。通常文字の14px未満指定とlineHeight normalは除去した。

## 検証

- `pnpm typecheck`: 終了0（今回生成した `build/server/index.js` がない状態）。
- `pnpm build`: 終了0（client/SSRとも成功）。Browserslistの古いデータ警告と空のapi.link-previewチャンク警告は残る。
- `pnpm lint`: 終了1、既存エラー66件。全体成功という条件は満たしていない。
- 変更した全TS/TSXを引数に渡す `pnpm exec eslint ...`: 終了0。今回変更ファイルに残るエラーは0件。
- `grep -rnE 'fontSize: "[0-9]+px"|lineHeight: "normal"' app --exclude-dir=_index_backup`: 出力なし、終了1（grepの「一致なし」）。残存ヒット0件、例外の説明は不要。

### HEADとの比較

stashは使用せず、`git archive HEAD` を一時ディレクトリへ展開し、同じnode_modulesを参照させて `pnpm lint` を実行した。HEADも終了1で73件のESLintエラーを再現。変更対象に対するフィルタでは、Footer/adminBlogItem/adminWorkItem/menuItem/worksItemの未使用vars各1件、menuItemのimport大文字小文字1件、loginのany1件の合計7件だった。今回これら7件を修正し、変更対象のエラーは0件となった。

残る66件はいずれもHEADにも存在し、今回のタイポグラフィ変更とは独立している。

- `app/entry.server.tsx`: 未使用getCriticalCss 1件。
- `app/utils/criticalCss.ts`: 未使用fs/path 2件。
- `app/routes/_index_backup/route.tsx`: 未使用cx 1件（変更禁止対象）。
- `tailwind.config.ts`: タブとスペース混在61件（編集範囲外）。
- `types/prism-modules.d.ts`: any 1件（編集範囲外）。

追加の検証上の制限: ビルド後にtypecheckを実行すると、`functions/[[path]].ts:46` が生成済みJavaScriptを推論し、root.linksのcrossOriginがstringに拡大されるためTS2322が発生する。ソースのroot.linksは既にLinksFunction / as constで型付けされている。今回生成したバンドルだけを除去するとtypecheckは成功する。ビルド成果物を型検査対象から外す設定などは今回の編集範囲外として変更していない。

## 変更ファイル

- `app/component/Footer/styles.css.ts`
- `app/component/Header/styles.css.ts`
- `app/component/LinkEmbed/styles.css.ts`
- `app/component/TableOfContents/TableOfContents.css.ts`
- `app/component/TwitterEmbed/styles.css.ts`
- `app/component/adminBlogItem/adminBlogItem.tsx`
- `app/component/adminBlogItem/styles.css.ts`
- `app/component/adminHeader/adminHeader.tsx`
- `app/component/adminHeader/styles.css.ts`
- `app/component/adminWorkItem/adminWorkItem.tsx`
- `app/component/adminWorkItem/styles.css.ts`
- `app/component/blogItem/styles.css.ts`
- `app/component/menuItem/index.tsx`
- `app/component/menuItem/styles.css.ts`
- `app/component/worksItem/styles.css.ts`
- `app/routes/_index.tsx`
- `app/routes/home.styles.css.ts`
- `app/routes/login.tsx`
- `app/routes/styles.css.ts`
- `app/routes/work.edit.$workId.tsx`
- `app/routes/work.new.tsx`
- `app/styles/style.css.ts`
- `app/utils/markdownRenderer.tsx`
- `app/styles/tokens.ts`
- `docs/20261124-hig-typography.md`

## 追記（レビュー時の修正）

- `app/styles/style.css.ts` のグローバル `button` に `fontFamily: "inherit"` を追加。ブログのタグフィルタ（「すべて」「AWS」等）がブラウザ既定のシステムフォントで描画され、Noto Sans JP に揃っていなかったため。
- 全見出し（h1〜h6）に `text-wrap: pretty` を追加。PC幅で記事タイトルが「…作っ／た」と1文字だけ次行に落ちる折り返しを防ぐため。未対応ブラウザでは通常の折り返しになるだけで害はない。
