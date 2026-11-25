# 埋め込み検証（2026-11-25）

## 結論

本番の X（公式ウィジェット）・YouTube サムネイル・Google Slides は、1280×800 / 375×812、light / dark、初回表示・テーマ切替・SPA 往復で正常に表示された。
汎用リンクカードはタイトル・説明・サイト名を表示するが、画像と favicon を表示しないため、指定要件に対して FAIL。
追加の入力例では、`?s=20` 付き X 共有 URL が埋め込みに変換されない不具合も再現した。修正は行っていない。

## 対象とデプロイ確認

- 本番: https://kokokoko0825.dev
- 対象コミット: `8dd4911e8c56288bb92a7c6a7dab95ab2ce65231`
- Cloudflare の canonical production deployment: `6d97a636-76d0-46f6-bd57-ced80d6548f4`。
- deploy 完了: 2026-11-25 12:41:18 UTC（21:41:18 JST）、status=success、branch=main、commit_hash が対象コミットと一致。
- immutable URL: https://6d97a636.kokokoko0825.pages.dev
- 本番と immutable URL の `/blog` HTML の asset URL 集合が一致した。例: `entry.client-CUIZOc5S.js`、`root-rlYbTCDr.js`、`manifest-de9488c2.js`。
- 記事の実ロードで `markdownRenderer-DbCyVRev.js`、`blog._blogId-B-WeEqaF.js` を確認。マージ前の HTML は取得していないため「前後差分」は断定せず、Cloudflare のコミットと immutable deployment の一致で現行版を確認した。
- ローカル HEAD は `40f2823`。 `git diff 8dd4911 HEAD -- app` は空で、調査した app ソースは main マージ後と同じ。
- 実ブラウザ: Orca 内蔵ブラウザ、および同じ Mac 上の Chrome 158（MacIntel）。Chrome DevTools の独立した isolatedContext を4個作り、各 viewport × OS color scheme を初回ナビゲーション前に設定した。初回は `localStorage.theme === null` を記録。
- スクリーンショット採取は独立コンテキスト内で追加リロードも行い、theme storage を消去して同じ初期条件を再現した。viewport スクリーンショットをローカル `/tmp/embed-check` に保存。DevTools の直接ファイル保存は workspace root 制約で拒否されたため、返された PNG データをローカルに保存した。
- すべての種類に本番の実例があるため、ローカル dev server / Firebase テストデータ / ハーネス用ソースは不要だった。5330 を含めサーバーは起動していない。

## 対応構文と実例

実際の経路は Blog / Works とも `renderMarkdownWithEmbeds` + `initializeAllEmbeds`。
React の `LinkEmbed` / `TwitterEmbed` は別実装で、両詳細ページから直接使われていない（Works: `app/routes/works.$workId.tsx:82`, `:159`; Blog: `app/routes/blog.$blogId.tsx:84`, `:176`）。

- **X**: 独立した段落の `https://x.com/<user>/status/<id>` または `https://twitter.com/<user>/status/<id>`。www、http(s) にも正規表現は対応。クエリ付き URL は今回の不具合 B2。
- **YouTube**: 独立段落の `https://www.youtube.com/watch?v=<id>`、`https://youtu.be/<id>`、`https://youtube.com/shorts/<id>`。Markdown の `[動画](URL)` も変換。動画 iframe ではなく、16:9 のサムネイルを外部動画へのリンクとして表示する実装。
- **Slides**: Google Slides の `https://docs.google.com/presentation/d/<presentationId>/...`、および `[資料](URL)`。生成先は `/presentation/d/<id>/preview`。専用スライド埋め込みは Google Slides のみ。Speaker Deck / Docswell はスライド iframe に対応せず、通常 URL カード扱い。
- **汎用カード**: 独立段落の裸の http(s) URL。通常の `[ラベル](URL)` は通常のリンクのまま。

構文サンプルは本番にロード済みの renderer を使って確認した: `/tmp/embed-check/syntaxes.json`。
Speaker Deck / Docswell は架空 URL 文字列の分類のみを確認し、外部取得や対応サービスとしての表示成功は主張しない。

### 実例 URL

A = https://kokokoko0825.dev/blog/yiujxNRvA49JDGML0tWM （First Post）

A に以下すべてが含まれる。

- X 投稿 ID: `1840762623824166938`、`1975930571105943760`。
- X は `https://platform.twitter.com/embed/Tweet.html?...&id=<id>&theme=light|dark` の実 iframe。投稿本文・画像・操作ボタンが見え、単なるフォールバックリンクではない。
- YouTube: https://youtu.be/zPy4RgUcKKs （`img.youtube.com` の画像 naturalWidth=480）。
- Slides: https://docs.google.com/presentation/d/1R3Ao3vAqI73sCKq5HnezXspPFKnLuqS5OF19FirjPxw/preview （自己紹介、13枚。スライド選択 UI と内容を確認）。
- カード: https://starto.jp/s/p/artist/10
- API: https://kokokoko0825.dev/api/link-preview?url=https%3A%2F%2Fstarto.jp%2Fs%2Fp%2Fartist%2F10
  - title: 嵐｜STARTO ENTERTAINMENT
  - description: 嵐のスケジュール情報・コンサートステージ情報・映画情報・販売商品情報、SNS、ファンクラブ・BLOG・SHOP情報を紹介
  - siteName: STARTO ENTERTAINMENT
  - image: https://starto.jp/images/81/ed6/1abafe3c0e208543501f756f98666.jpg
  - HTTP 200。レスポンス保存先: `/tmp/embed-check/link-preview.json`。

B = https://kokokoko0825.dev/blog/NOpv7vIxV3USDYbTlXIf （AWS リージョン拡張の記事。埋め込みはない）。

`/blog` の内部記事は A / B の2件、他2件は Zenn / Qiita への外部リンクだった。
`/works` の全8件（MoodLog、Readeco、第60回鈴鹿高専祭HP、BomberBOY、Koshi Quest、電子チケット生成サイト、2025卒業ライブHP、TableMate）を実ブラウザで開いたが、この4種類の埋め込みの実例はなかった。したがって Works に関して実コンテンツでの埋め込み成功とは主張しない。共通 renderer と初期化経路はソースで確認した。

## 条件別結果

下表の各リンクは、その種類が実際に見える viewport スクリーンショット。
全行の対象記事は A。汎用カード FAIL はタイトル・説明・サイト名の失敗を意味せず、画像・favicon 要件の未達を意味する。

| 条件 | X 公式 widget | YouTube | Google Slides | 汎用リンクカード |
| --- | --- | --- | --- | --- |
| 1280×800 / light / 新規プロファイル初回 | [PASS](/tmp/embed-check/fresh-1280-light-x.png) | [PASS](/tmp/embed-check/fresh-1280-light-youtube.png) | [PASS](/tmp/embed-check/fresh-1280-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/fresh-1280-light-link.png) |
| 1280×800 / dark / 新規プロファイル初回 | [PASS](/tmp/embed-check/fresh-1280-dark-x.png) | [PASS](/tmp/embed-check/fresh-1280-dark-youtube.png) | [PASS](/tmp/embed-check/fresh-1280-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/fresh-1280-dark-link.png) |
| 1280×800 / dark / テーマ切替後 | [PASS](/tmp/embed-check/toggle-1280-dark-x.png) | [PASS](/tmp/embed-check/toggle-1280-dark-youtube.png) | [PASS](/tmp/embed-check/toggle-1280-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/toggle-1280-dark-link.png) |
| 1280×800 / light / テーマ切替後 | [PASS](/tmp/embed-check/toggle-1280-light-x.png) | [PASS](/tmp/embed-check/toggle-1280-light-youtube.png) | [PASS](/tmp/embed-check/toggle-1280-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/toggle-1280-light-link.png) |
| 375×812 / light / 新規プロファイル初回 | [PASS](/tmp/embed-check/fresh-375-light-x.png) | [PASS](/tmp/embed-check/fresh-375-light-youtube.png) | [PASS](/tmp/embed-check/fresh-375-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/fresh-375-light-link.png) |
| 375×812 / dark / 新規プロファイル初回 | [PASS](/tmp/embed-check/fresh-375-dark-x.png) | [PASS](/tmp/embed-check/fresh-375-dark-youtube.png) | [PASS](/tmp/embed-check/fresh-375-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/fresh-375-dark-link.png) |
| 375×812 / dark / テーマ切替後 | [PASS](/tmp/embed-check/toggle-375-dark-x.png) | [PASS](/tmp/embed-check/toggle-375-dark-youtube.png) | [PASS](/tmp/embed-check/toggle-375-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/toggle-375-dark-link.png) |
| 375×812 / light / テーマ切替後 | [PASS](/tmp/embed-check/toggle-375-light-x.png) | [PASS](/tmp/embed-check/toggle-375-light-youtube.png) | [PASS](/tmp/embed-check/toggle-375-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/toggle-375-light-link.png) |
| 1280×800 / dark / SPA 往復後 | [PASS](/tmp/embed-check/spa-1280-dark-x.png) | [PASS](/tmp/embed-check/spa-1280-dark-youtube.png) | [PASS](/tmp/embed-check/spa-1280-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/spa-1280-dark-link.png) |
| 1280×800 / light / SPA 往復後 | [PASS](/tmp/embed-check/spa-1280-light-x.png) | [PASS](/tmp/embed-check/spa-1280-light-youtube.png) | [PASS](/tmp/embed-check/spa-1280-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/spa-1280-light-link.png) |
| 375×812 / dark / SPA 往復後 | [PASS](/tmp/embed-check/spa-375-dark-x.png) | [PASS](/tmp/embed-check/spa-375-dark-youtube.png) | [PASS](/tmp/embed-check/spa-375-dark-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/spa-375-dark-link.png) |
| 375×812 / light / SPA 往復後 | [PASS](/tmp/embed-check/spa-375-light-x.png) | [PASS](/tmp/embed-check/spa-375-light-youtube.png) | [PASS](/tmp/embed-check/spa-375-light-slides.png) | [FAIL: 画像・favicon 欠落](/tmp/embed-check/spa-375-light-link.png) |

### 数値と SPA の根拠

- 1280×800: document scrollWidth=1280。X iframe は幅520、高さ723 / 249。YouTube と Slides の外枠は幅640の16:9、iframe / 画像領域は border を除いておよそ638×358。
- 375×812: document scrollWidth=375。X iframe は幅335、高さ523 / 230前後。YouTube と Slides の外枠は幅335の16:9、内部はおよそ333×186。横方向 overflow なし。CSS の aspect-ratio=16/9 と実寸を確認。
- X の iframe URL の `theme`、親 document の `data-theme`、container の初期化状態を照合。初回 light/dark と light→dark / dark→light の両方向が一致。
- SPA は既存の Remix リンクを使い、A→Blog一覧→B→ブラウザBack→一覧→Back→A を実行した（直接の full navigation を使っていない）。4条件とも `performance.timeOrigin` が変わらず `sameDocument:true`。
- A に戻ると、2件の X iframe と theme、YouTube、Slides、API カードが再表示された。
- 数値の記録: `/tmp/embed-check/measurements.json`
- SPA 記録: `/tmp/embed-check/spa-navigation.json`

## 外部文字列と画像 URL の安全性

**PASS（実ブラウザ + ローカル既存スクリプト）。**

本番 renderer が生成する一時的な DOM と、本番 bundle の初期化関数を使い、そのテスト URL への fetch だけを一時的に差し替えた。
title / description / siteName に `<b data-embed-probe>外部テキスト</b>` を返すと、3箇所すべてがその文字列をそのまま textContent として保持し、`[data-embed-probe]` 要素数は0。
一時 DOM と fetch 差し替えは削除・復元済みで、Firebase は変更していない。
証拠: `/tmp/embed-check/browser-safety.json`。実装: `app/utils/markdownRenderer.tsx:499`, `:502`, `:509`。

`node scripts/check-link-embeds.mjs` は成功。
`javascript:`、`data:`、プロトコル相対 URL、相対 URL が拒否され、http / https の絶対 URL のみ許可されることと、HTML 代入を行わないことを確認した。
React `LinkEmbed` は `app/component/LinkEmbed/LinkEmbed.tsx:22` で `getHttpUrl(metadata.image)` を通してから img を作る（`:74`）。
判定関数は `app/utils/httpUrl.ts:5`。ただし実際の記事カードには画像を作る処理自体がなく、記事での正常画像の表示は FAIL（B1）。
この「許可プロトコルの確認」は、画像取得成功や混在コンテンツ許可を意味しない。

## Console / Network

初回・テーマ切替・SPA の4独立コンテキストでは error/warn/issue はいずれも `<no console messages found>`。
CSP、X widget 初期化エラー、mixed content、CORS のエラーは確認されなかった。
X widgets.js / Tweet iframe、Google Slides preview、YouTube 画像、リンクプレビュー API は成功応答を確認した。
記録は `console-2.json`〜`console-5.json`、`network-2.json`〜`network-5.json`、`spa-console-2.json`〜`spa-console-5.json`、`spa-network-2.json`〜`spa-network-5.json`（すべて `/tmp/embed-check/`）。

観測した失敗は隠さず以下に記す。

1. 各 Chrome コンテキストで `GET chrome-extension://invalid/ [net::ERR_BLOCKED_BY_CLIENT]` を記録。初回 request ID は page2=97、page3=85、page4=89、page5=71。本体 iframe や API の HTTP 失敗ではなく、該当埋め込み自体は表示された。原因は断定しない。
2. スクリーンショット再採取のためにリロードを追加した375px dark のコンテキストで、Firestore Listen channel の GET 404（reqid=325）、POST 400（reqid=328）が発生。
   - console msgid=2: `Failed to load resource: the server responded with a status of 404 ()`
   - console msgid=3: `Failed to load resource: the server responded with a status of 400 ()`
   - console msgid=4: `@firebase/firestore: Firestore (11.4.0): WebChannelConnection RPC 'Listen' stream ... transport errored`
   - 同時に記事、X2件、Slides、YouTube、カード本文の表示は成功。埋め込みリソース起因とする証拠はなく、Firestore stream の追加観測事項として区別した。
   - 証拠: `/tmp/embed-check/repeat-console-5.json`, `/tmp/embed-check/repeat-network-5.json`。
3. ローカルスクリプトに Browserslist DB が21か月古いという案内が出たが、検証本体は PASS。依存関係は更新していない。

## 不具合と修正案（未修正）

### B1: 記事・作品の汎用カードに画像・favicon がない

- **重大度: P2 / 中（機能・表示要件未達。セキュリティ問題としての CVSS は評価対象外）**
- 再現: A の STARTO カード。API に正常な https image があるのにカード内 img は0。表の全 link スクリーンショット参照。
- 根本原因:
  - `app/utils/markdownRenderer.tsx:22` の LinkPreviewData に image がない。
  - `app/utils/markdownRenderer.tsx:331` の HTML テンプレートに画像・favicon の要素がない。
  - `app/utils/markdownRenderer.tsx:489` 以降の初期化は title / description / siteName のみ反映し、image を消費しない。
  - React の `LinkEmbed` には画像処理があるが、詳細ページの実表示経路では使用されない。favicon は React 側にもなく、`app/routes/api.link-preview.tsx:4`, `:53` の API レスポンスにも favicon フィールドがない。
- 修正案:
  - 実際の renderer 経路で image を扱い、`getHttpUrl` で検証した URL のみを DOM API の `img.src` に設定する。外部 metadata を HTML 連結に戻さない。
  - favicon を API で取得・URL解決して返し、同じ http(s) 検証を適用して表示する。取得失敗時は画像領域を省略する。
  - 二重実装は可能なら小さな共通部へまとめる。カード表示を変更後、375px / dark / SPA で再検証する。

### B2: クエリ付き X 共有 URL が埋め込みにならない

- **重大度: P2 / 低（一般的な共有 URL の入力互換性。既存 A の2投稿には影響なし）**
- 再現入力: `https://x.com/kokokoko0825/status/1975930571105943760?s=20` を単独段落として renderer に渡す。
- 実結果: tweet container 0、公式 iframe 0、URL は生テキストの段落。クエリなしの同じ投稿は tweet container が生成される。
- 原因: `app/utils/markdownRenderer.tsx:87` の検出が投稿 ID までしか取得せず、`:169`〜`:170` の置換はその短い URL と `<p>URL</p>` の完全一致を要求するため、`?s=20` が残る段落に一致しない。
- 修正案: URL を段落または Markdown token 単位で扱い、URL オブジェクトの hostname / pathname から投稿 ID を検証して抽出する。少なくとも既存 YouTube / Slides 同様、query / fragment を含む段落を置換対象にする。
- 証拠: `/tmp/embed-check/syntaxes.json`, `/tmp/embed-check/x-share-query.png`。本番ロード済み renderer と initializers を使った一時 DOM で再現し、採取後に削除済み。

## 作業後の状態

- ソース変更・修正・commit・push・Firebase 書き込みなし。
- 追加したリポジトリ内ファイルはこの報告書のみ。説明用のハーネスや一時画像は残していない。
- 既存未追跡 `pnpm-workspace.yaml` は変更していない。
- `git diff` は空。未追跡ファイルは指定成果物の本報告書と既存 `pnpm-workspace.yaml` のみ（未コミット報告書を保存する指示との関係で、成果物を除く作業ツリーを clean として扱った）。
- Dev server 未起動のため停止対象なし。証拠画像・ログはリポジトリ外の `/tmp/embed-check`。

