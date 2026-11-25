# Prism 初期化エラー調査（2026-11-25）

## 結論（要約）

- 原因として確認できた実装上の欠陥は、依存関係を持つ Prism 言語モジュールを `Promise.all` で同時に評価していること。TSX は JSX と TypeScript、C++ は C を先に必要とする。配列の記述順は評価完了順を保証しない。
- 本番配信済みモジュールと開発の Vite 変換済みモジュールで、core の後に依存未登録の TSX を読み込むと、同じ `TypeError: Cannot convert undefined or null to object` を再現した。依存順に逐次読み込みすると成功した。
- ただし、指定記事の通常の再読み込みでは今回 Prism エラーを自然再現できていない。観測済みの元エラー全文が提供されていないため、「ユーザーが見たエラーと同一」とまでは断定しない。競合条件を切り出した再現と、通常表示の観測を以下で区別する。
- `Prism is not defined` も core を読み込まない条件で再現できるが、現在の両 route は core の import を await しており、今回の通常表示では `window.Prism` が存在する。現行コードの主因を「SSR でグローバルがないこと」と断定する根拠はない。
- **推奨は、クライアント専用の共通ローダーで必要言語を依存順に逐次 import する最小修正。** あわせて Markdown の `highlight` が生のコードを返す問題を修正する。Shiki/SSR への移行は記事取得方式まで変えるため別の改善として扱う。

調査対象は指定 worktree。実際に確認した HEAD は `3af5470`（依頼記載の `919ab32` とは異なる）。ソースコードは変更せず、`pnpm build` も実行していない。

## 再現手順

### 通常の記事表示

1. `pnpm dev --port 5302` を起動。
2. 本番 `https://kokokoko0825.dev/blog/NOpv7vIxV3USDYbTlXIf` と開発側の同じパスを Orca ブラウザで開く。
3. console capture を開始して再読み込みし、`window.Prism`、言語一覧、`pre` と `.token`、`.line-numbers-rows > span` を調べる。
4. コードを持つ既存記事 `/blog/yiujxNRvA49JDGML0tWM`（First Post）でも確認する。

観測結果：

| ページ | 結果 |
| --- | --- |
| 指定 AWS 記事・本番/開発 | `pre` が 0。Prism と TSX を含む言語が登録され、通常読み込みで Prism エラーは未観測 |
| First Post・本番 | C++ の `pre.line-numbers.language-cpp` が1個、`.token` が14個、行番号用 span が4個。keyword の computed color は `rgb(47, 79, 178)`、行番号要素の display は `inline` |
| First Post・開発 | 同じ C++ ブロックで `.token` 14個、行番号4個 |
| `/works/dGFHJiboLb1nB5tGU2pw`・開発 | `pre` 0、Prism、TSX、lineNumbers plugin は登録済み |

指定記事にはフェンスコードがないので、そのページだけではハイライト不具合を判定できない。First Post では色と行番号の生成を確認でき、CSS/plugin 全体が常に壊れているわけではない。

開発では別件の hydration エラーが出た。Prism のエラーとは区別する：

```text
Warning: Prop `%s` did not match. Server: %s Client: %s%s charSet "null" "utf-8"
    at meta
    at head
    at html
    at Layout (http://localhost:5302/app/root.tsx:15:3)
Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

### 依存順を制御したブラウザ内再現

既存ページの言語登録済み状態を避けるため、同一 origin の非表示 `iframe.srcdoc` に `type="module"` のスクリプトを作り、その realm 内で実際の配信モジュールを import。例外の `message` と `stack` を親へ戻した。保存データやソースは変更していない。

本番の再現コード（iframe 内）：

```js
await import('https://kokokoko0825.dev/assets/prism-DeXBIgZw.js');
// JSX / TypeScript がまだ評価されていない状態を再現する。
await import('https://kokokoko0825.dev/assets/prism-tsx-BJUXQzHQ.js');
```

取得したエラー全文と stack：

```text
TypeError: Cannot convert undefined or null to object
    at https://kokokoko0825.dev/assets/prism-tsx-BJUXQzHQ.js:1:120
    at https://kokokoko0825.dev/assets/prism-tsx-BJUXQzHQ.js:1:309
```

開発でも core → TSX の順だけで再現：

```text
TypeError: Cannot convert undefined or null to object
    at http://localhost:5302/node_modules/.vite/deps/prismjs_components_prism-tsx.js?v=465b1885:5:27
    at http://localhost:5302/node_modules/.vite/deps/prismjs_components_prism-tsx.js?v=465b1885:10:3
```

反証用に core を一切 import せず TSX だけ import した場合：

```text
ReferenceError: Prism is not defined
    at https://kokokoko0825.dev/assets/prism-tsx-BJUXQzHQ.js:1:310
```

これは **core 未読込を意図的に作った場合** のログで、現在の route の自然発生ログではない。

本番の同じ配信ファイルを core → JSX → TypeScript → TSX → C → C++ → line-numbers の順で await すると成功し、各言語が登録された。一方、ページで取得済みの Prism 関連 URL を5個の新規 iframe から同時 import した試行は5/5成功。通常環境での発生率や失敗する実ネットワーク順は今回確定していない。

## 原因（ファイル:行 と根拠となるログ・コード）

### 1. 言語の依存順が未定義

- `app/routes/blog.$blogId.tsx:88`：`await import("prismjs")` の後、89–104行で全言語を `Promise.all`。
- `app/routes/works.$workId.tsx:87`：同じ実装。88–103行の同時 import が対象。
- どちらも `setTimeout(async () => ...)` の例外を catch していない。import が reject すると、その後の `highlightAllUnder` へ進まず、非同期コールバックの rejection が未処理になる。

インストール済み `prismjs@1.30.0` の `components.json`：

```text
jsx        require: [markup, javascript]
typescript require: javascript
tsx        require: [jsx, typescript]
c          require: clike
cpp        require: c
```

`node_modules/prismjs/components/prism-tsx.js:2–7` は依存登録を待たず直接利用する：

```js
var typescript = Prism.util.clone(Prism.languages.typescript);
Prism.languages.tsx = Prism.languages.extend('jsx', typescript);
delete Prism.languages.tsx['parameter'];
delete Prism.languages.tsx['literal-property'];
```

JSX 未登録なら `languages.extend('jsx', undefined)` の結果も undefined となり、delete で上記 TypeError が出る。JSX だけ先行し TypeScript が未登録の場合は、エラーがなくても TSX の登録内容が不完全になり得る。

さらに full `prismjs` 自体が markup/css/clike/javascript を含むのに、それらを別ファイルでも再 import している。後から基本言語を再登録すると、先に JSX などが付加した定義・参照を置き換える可能性があり、単に「すべて読み込み済み」でも順序によって内容が変わる。

### 2. ESM/CJS 変換は依存を補ってくれない

- `node_modules/prismjs/package.json:5` の main は `prism.js`。
- `node_modules/prismjs/prism.js:769` はブラウザで `_self.Prism = _`、1212–1218行は CJS export と Node 用 `global.Prism` を設定する。
- 開発の `node_modules/.vite/deps/prismjs.js` は core を `__commonJS` でラップ。
- 開発の `node_modules/.vite/deps/prismjs_components_prism-tsx.js:1–10` は `(function(Prism2) {...})(Prism)` のままで、JSX/TypeScript を import していない。
- 本番 `assets/prism-tsx-BJUXQzHQ.js` もグローバル `Prism` を参照するだけで、core/JSX/TypeScript の ESM import 宣言がない。

したがって Vite の pre-bundling や Rollup の分割に「言語の意味上の依存順」を解決する機能は期待できない。core を await していることと、言語間の順序を保証することは別。

### 3. CSS と型宣言は初期化しない

- `app/styles/globals.css.ts:4–5` は Prism theme と line-numbers の **CSS のみ**。JS の登録は行わない。今回、既存記事で色と行番号を確認できたため、CSS の欠落は主因ではない。
- `types/prism-modules.d.ts:1–4` は Prism を `any` として宣言し、6–20行は import の型エラーを抑えるだけ。実行順やグローバルの存在は保証しない。既に `@types/prismjs` も依存にあるので、将来の修正では core を `any` で覆う宣言を見直す余地がある。
- `app/utils/markdownRenderer.tsx:28–43` に Prism JS import はない。フェンスへ `line-numbers` class を付けるだけで、実際のトークン・行番号生成は route の effect で行う。
- 現行の記事データ取得も `useEffect` 内の Firebase `getDoc`。本文は初回 SSR 時にはなく、現時点の初期化エラーを「本文を SSR 中に Prism が処理した」と説明するのは不正確。

### 4. 併せて直す必要があるコードのエスケープ不備

`app/utils/markdownRenderer.tsx:29–32` の「markdown-it が自動エスケープ」というコメントはこの実装では誤り。`highlight` が非空文字列を返すと、markdown-it はそれを既に処理した HTML として使う。

`node_modules/markdown-it/lib/renderer.mjs:42–45`：

```js
highlighted = options.highlight(token.content, langName, langAttrs)
  || escapeHtml(token.content);
```

Node で同じ `highlight: code => code` を使い、HTML フェンス内に `<img src=x onerror=alert(1)>` を渡した結果（ブラウザでペイロードは実行していない）：

```html
<pre><code class="language-html"><img src=x onerror=alert(1)>
</code></pre>
```

コードがテキストにならず DOM と解釈される。Prism 以前にコード例の欠落や HTML 注入の原因になる。実際の悪用可能性は投稿権限等に依存するが、「CVSS 0–3.9 を満たす」と保証できる状態ではない。最小修正は highlight callback 自体を削除するか `highlight: () => ""` とし、markdown-it のフォールバックで escape させること。

## 修正案（比較と推奨）

| 案 | 変更箇所 | 長所 | 短所・注意点 | 判断 |
| --- | --- | --- | --- | --- |
| A. クライアントで依存順に動的 import | 新規 `app/utils/prism.client.ts`、blog/works effect、Markdown callback | 既存 CSS と plugin を維持。小変更で確実に順序を保証。2 route の重複を解消 | ハイライト前の短い未装飾表示と DOM 書き換えは残る | **今回推奨** |
| B. Markdown 生成時に Prism.highlight | 共通言語ローダー、markdownRenderer、route effect | HTML 生成と色分けを一元化。後からコード DOM を書き換えなくてよい | 現状は Firebase が client 取得なので、これだけでは SSR 化しない。行番号は別生成か client plugin が必要。core/言語の初期化順は引き続き必要 | 将来の整理 |
| C. Shiki で server/公開時に生成 | Markdown 処理、server loader/公開処理、テーマ/CSS、依存 | ブラウザの Prism 初期化を撤去できる。言語定義が豊富 | 依存追加、非同期 highlighter 初期化、Cloudflare の実行環境/バンドル検証、行番号/既存 theme の再設計。現在の client Firebase 取得の変更も必要 | 今回は過剰 |

### A の具体例

`app/utils/prism.client.ts` に一度だけ初期化するローダーを作る。現在の full `prismjs` の基本4言語を再読込しない。

```ts
let prismPromise: Promise<typeof import("prismjs")["default"]> | undefined;

export function loadPrism() {
  return prismPromise ??= (async () => {
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
```

両 route の effect 内から `import("../utils/prism.client")` して `loadPrism()` を await し、キャンセルされていないことと ref を再確認して `highlightAllUnder` を呼ぶ。`.client` モジュールを SSR のトップレベルから実行しない。

```ts
useEffect(() => {
  if (!blogData) return; // works では workData
  let cancelled = false;
  void (async () => {
    try {
      const { loadPrism } = await import("../utils/prism.client");
      const Prism = await loadPrism();
      if (!cancelled && contentRef.current) {
        Prism.highlightAllUnder(contentRef.current);
      }
    } catch (error) {
      console.error("Prism initialization failed:", error);
    }
  })();
  return () => { cancelled = true; };
}, [blogData]);
```

DOM 更新後の effect なので、ハイライトだけなら100msのタイマーは不要。既存の `initializeAllEmbeds()` は別途維持する。上のコードはハイライト部分の例で、埋め込み処理を削除する提案ではない。`manual` の設定が core の自動実行予約より後になる場合もあるため、自動実行の完全停止まで要求するなら core 初期化前の設定も検証する。

`markdownRenderer.tsx` は、client 側で後からハイライトする A では次のようにする：

```ts
const md = new MarkdownIt(); // highlight callback を削除し安全な既定処理へ
```

### B の具体例

依存順に登録済みの Prism を渡す前提で、callback が HTML を返す場合は Prism の出力だけを返し、未対応言語は空文字にする。

```ts
highlight: (code, language) => {
  const grammar = Prism.languages[language];
  return grammar ? Prism.highlight(code, grammar, language) : "";
}
```

「SSR で処理したい」なら Firebase 取得を server loader 等へ移す検討も必要。行番号 plugin は DOM に依存するので SSR 中に実行せず、行番号を HTML/CSS で別生成するか client の番号付与だけ残す。

依存順の扱いは [Prism 公式の依存定義](https://prismjs.com/extending.html#dependencies)、コード文字の escape と bundler/Node での使い方は [Prism 公式ドキュメント](https://prismjs.com/#basic-usage) を参照。実装の判定にはインストール済み v1.30.0 のソースを優先した（Context7 の検索は v2 の例も返すため混同しない）。

## 影響範囲とリスク

- blog と works の全詳細ページ。本文にコードがなくても全言語を import するので、初期化エラー自体は発生し得る。
- 1言語の失敗で `Promise.all` 全体が reject し、成功している他言語のコードも手動ハイライトされなくなる。core の自動処理が先に走ると部分的に色だけ付く可能性もあり、見た目のみで成功と判断しない。
- 基本文法の再登録除去と順序固定は TSX/JSX/C++ の結果を変え得る。JavaScript、TypeScript、JSX、TSX、C、C++ の具体例で確認する。
- 同一初期化 Promise を共有し、ページ遷移中の ref の変化を確認する。単に catch で握り潰すだけではハイライト不全は直らない。
- ソースを変更していない調査なので typecheck/lint/build は未実行。恒久修正時には型確認と、初回直アクセス・SPA 遷移・低速通信でのブラウザ確認が必要。
- 本調査による変更はこの Markdown のみ。dev server は終了し、一時 iframe はページ遷移で破棄。tracked source の変更はしていない。

## 未確認事項

- 当初のエラーの元ログ全文・stack。通常ロードでの再現に至っていないため、今回の依存欠落再現と同一かは未確定。
- ネットワークを遅くした実ページでの失敗率、ブラウザごとの初回キャッシュなしの挙動。5/5成功した同時 import 試行だけで競合なしとは判断できない。
- works 全件のコードブロック有無。代表の MoodLog はコードなしだが、同じローダー実装であることは確認済み。
- TSX が TypeScript より先に評価されてエラーなく登録された際の具体的な誤色付け、基本言語再登録による文法参照の変化。
- Shiki を採用した場合の Cloudflare 実行環境・起動時間・バンドルサイズ。今回は移行実験をしていない。
- 依頼記載と実際の HEAD の差。上記行番号は調査時の worktree に対するもの。
