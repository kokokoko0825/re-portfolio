# マークアップ構造・タイポグラフィ実装の調査（2026-11-24）

対象: `kokokoko0825/style-font`（PR #12）時点。修正は未実施。

## A. 前回のトークン適用で生じた見た目の崩れ（原因）

| 症状 | 原因 | 根拠 |
| --- | --- | --- |
| Home の「Koshi Tanaka」が巨大 | プラン作成時に「96px = hero」と誤認した。元の hero は h1 グローバル指定の **36px / 400**。96px は Blog・Works 詳細のサムネイル絵文字（`thumbnail > span`、`adminThumbnailInput`）の値 | `git show main:app/styles/style.css.ts`（h1: 36px/400）、`main:app/routes/styles.css.ts:508`（adminThumbnailInput 96px） |
| ハンバーガーメニューの文字が細く小さい | 元は **20px / bold**。`subheadline`（16px / 500）に置換したうえ、ページ側の h1 は 36px/700 に上がったため相対的に弱く見える | `main:app/component/Header/styles.css.ts:131-137` |
| 全体的に太字が多い | 元は見出しもすべて **400**。HIG の Semibold/Bold 役割をそのまま 700 に割り当て、h1/h2/カード名/headline が全部 700 になった。Noto Sans JP の 700 は和文で黒みが強い | `tokens.ts` の largeTitle〜headline がすべて 700 |
| 「元の設定に規約を当てただけ」 | グローバル要素セレクタ（h1, h2, p, li, span, a, img, svg）に見た目を直接載せる構造のまま値だけ置換したため、役割と要素が一致していない（例: カードのタイトルが h2 なので title2 になる） | `app/styles/style.css.ts` 20〜170 行 |

## B. HTML 構造の問題

### B-1. 見出しレベル
| 場所 | 現状 | 問題 |
| --- | --- | --- |
| 全ページ `Header.tsx:31` | ロゴ絵文字「🐶🐱」が `<h1>` | 全ページで h1 が 2 個以上になる。ロゴは見出しではない |
| `adminHeader.tsx:42` | 「🐶🐱.admin」が `<h1>` | 同上 |
| Home `_index.tsx:44-46` | h1「Koshi Tanaka」+ h2「Software Engineer」 | 肩書きはセクション見出しではなくサブタイトル。h2 にすると空のセクションを作る |
| About `about.tsx:27,36,46,65` | h1 が 4 個（About me / Skills / Career / Favorite） | ページの h1 は 1 個。Skills 等は h2、Favorite 配下の Technology/Person は h3 にすべき（今は h2 で、兄弟の Skills と同階層に見える） |
| About Career `about.tsx:51-60` | 経歴名が `<p className=timelineTitle>` | 見た目上の小見出し。h3 か `<dl>` 構造が適切 |
| ブログ記事本文（Markdown） | `#` が `<h1>` として出力され、TOC も h1 を拾う | 記事タイトルの h1 と並んで h1 が複数になる可能性。Markdown 見出しを 1 段下げる（`#`→h2）か `#` を使わない運用に |
| Blog 一覧 `blogItem.tsx:30` / Works 一覧 `worksItem.tsx:31` | カードのタイトルが h2 | 構造的には妥当（h1 Blog → h2 各記事）。ただし見た目をグローバル h2（title2 = 24px/700）に依存しているのが問題 |
| 管理画面 `adminBlogItem.tsx:41` / `adminWorkItem.tsx:41` | 編集アイコン ✏️ が `<h1>` | 見出しではない。リンクに `aria-label="編集"` を付けた `<span>` にすべき |
| `admin._index.tsx` | h1 Admin → h2 Blog/Works | 問題なし |
| 404 `404.tsx` | 「404」が `<span>`、h1 なし | `<h1>` にすべき |

### B-2. ランドマーク・要素の選び方
| 場所 | 現状 | 提案 |
| --- | --- | --- |
| 全ページ | `<header>` `<nav>` `<main>` `<footer>` が 1 つも無い（全部 div） | Header を `<header>` + リンク群を `<nav aria-label="メイン">`、各ページの本文を `<main>`、Footer を `<footer>` |
| `Header.tsx` テーマ切替・ハンバーガー | `<div role="button" tabIndex onKeyDown>` | ネイティブ `<button type="button">` に。キー操作の自前実装が不要になる。ハンバーガーは `aria-expanded` / `aria-controls` を付ける |
| ハンバーガー内 `<img alt={ariaLabel}>` | ボタンの label と img の alt が二重読み上げ | img は `alt=""` |
| `MobileMenu.tsx` オーバーレイ | `div role="button"` | `aria-hidden` の装飾要素にし、閉じる操作は Esc キーとボタンで担保 |
| `blogItem.tsx` | カード全体の `<Link>`/`<a>` の中にタグの `<Link>` がある | **`<a>` の入れ子は HTML 仕様違反**。カードのリンクはタイトルだけにして、`::after` でカード全体をクリック可能にする（stretched link）パターンへ |
| 日付（blogItem, 記事詳細） | `<small>` | `<time dateTime="2026-11-16">` |
| Works 説明文 `worksItem.tsx:32` | `<small>` | `<small>` は注記用。`<p>` に |
| 「Back」リンク | `<Link><small>Back</small></Link>` | サイズは CSS で。`<small>` 不要 |
| Works サムネイル | `alt="thumbnail"`、デフォルト画像パスが `/public/images/icon.jpg`（`/public` は不要で 404） | タイトルが隣にあるので `alt=""`。パスは `/images/icon.jpg` |
| `menuItem/` コンポーネント | どこからも使われていない | 削除 |

### B-3. グローバル CSS
| 指定 | 問題 |
| --- | --- |
| `globalStyle("Link", …)` | `Link` は React コンポーネント名で HTML 要素ではないので、何にも当たらない死にコード |
| `globalStyle("img", { width: 300px, height: 200px })` | サイト内の全画像が Works サムネイルの寸法に固定される。記事内画像や今後のアイコンにも効く |
| `globalStyle("svg", { width: 25px })` | 全 SVG（MUI アイコン含む）が 25px 固定 |
| `globalStyle("span" / "a", { fontSize: inherit … color })` | 全 span・a の色を本文色に固定。リンク色が出ない原因 |
| h1/h2/p/li/small に `fontFamily` を毎回指定 | body で 1 回指定すれば継承される（DRY 違反） |
| 要素セレクタに見た目を載せる設計 | 「h2 だから 24px」のように見た目と文書構造が結合している。これが「見た目に合わせてタグを選ぶ」原因 |

### B-4. その他
| 場所 | 問題 |
| --- | --- |
| `root.tsx` meta | `meta()` の `{ charSet }` と `<Layout>` の `<meta charSet>` が二重。開発時のハイドレーションエラー「charSet null vs utf-8」の原因 |
| viewport | `maximum-scale=1, user-scalable=no` でピンチズーム禁止。WCAG 1.4.4（テキストの拡大）違反で、HIG の Dynamic Type の考え方とも逆 |
| `isMobile`（JS 判定）でクラス切替 | レイアウト切替を JS のデバイス判定に依存。CSS メディアクエリで足りる箇所が多く、SSR との不一致の原因になりうる |
| `about.tsx` | 「Vibe Cording」は「Vibe Coding」のタイポと思われる |

## C. 変更方針の提案

### C-1. 構造（タグ）
1. ページごとに h1 は 1 つ。ロゴは `<a aria-label="ホーム">` 内の `<span>`
2. レイアウト骨格: `<header><nav/></header><main>…</main><footer/>` を共通レイアウトに集約（今は各ページが `<Header/>` `<Footer/>` を個別に配置）
3. 見出しは文書構造で決め、見た目はクラスで当てる（要素セレクタへの見た目指定をやめる）
4. 操作要素は `<button>`、日付は `<time>`、カードは stretched link
5. Markdown の見出しを 1 段下げる（`#`→h2, `##`→h3 …）

### C-2. タイポグラフィ（トークンの見直し）
元の見た目（全体 400、見出しは大きさで差をつける）を基本に、HIG の階層を「大きさ + 一部だけ Medium」で表現する。

| token | 現在 | 提案 | 理由 |
| --- | --- | --- | --- |
| heroName | 96/48px, 500 | **48/36px, 500** | 元 36px を基準に、トップの顔として一段だけ大きく。96px はやめる |
| largeTitle（ページ h1） | 36/32, 700 | **32/28, 500** | 元 36px/400 に近いサイズ感。700 は和文で重い |
| title2（セクション h2） | 24/22, 700 | **24/20, 500** | 階層は大きさで |
| title3（カード名） | 20/18, 700 | **20/18, 500** | 一覧で 700 が並ぶと黒く見える |
| headline | 17/16, 700 | **17/16, 500** | 同上 |
| 本文中の `<strong>` | 700 | 700（維持） | 太字は強調にだけ使う |
| モバイルメニューのリンク | 16px, 500 | **20px, 500**、行の高さ 48px 以上 | 元の 20px に戻し、タップ領域も確保 |

→ 700 を使うのは記事本文の `<strong>` のみ、見出しは 500 に統一。これで「太字が多い」問題を解消しつつ、HIG の「サイズとウェイトの組み合わせで階層を作る」に沿う。

### C-3. 進め方の案
- **段階 1**（このブランチ、PR #12 に追加）: C-2 のトークン値修正 + hero・モバイルメニューの修正のみ。見た目の崩れを先に直す
- **段階 2**（別ブランチ・別 PR）: B の構造修正（見出しレベル、ランドマーク、button 化、入れ子リンク解消、グローバル CSS 整理、charSet・viewport 修正）。差分が大きく見た目も変わりうるので PR を分けてレビューしやすくする
