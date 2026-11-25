# hydration調査（2026-11-25）

## 結論（要約）

- 開発環境の`charSet: Server null / Client utf-8`とhydration失敗を、拡張機能なしの独立したheadless Chromeで再現した。主原因はMUIのモジュール評価時に追加される`<meta name="emotion-insertion-point" content="">`。charsetの重複削除では直らない。
- このmetaがhead先頭に追加され、Reactがこれを`app/root.tsx:69`のcharset metaとして照合する。以後のmetaも一つずつずれ、最初のscriptの位置に最後のrobots metaが残って構造不一致となる。
- 上記metaの自動追加だけをブラウザー内で抑える実験で、charSet警告・hydration失敗・document全体の再描画が消えた。代わりに`html`の`class,data-theme`追加属性警告が現れた。これは別の確定した警告原因。
- 本番の`/`、`/blog`、`/about`、`/works`、指定記事ではReact #418/#423/#425等を再現しなかった。記事には別の実行時エラーが一部条件で出たため、hydration問題と混同しない。
- 調査のみ実施。ソース・依存関係・ビルド成果物は編集せず、`pnpm build`も実行していない。

## 再現手順

1. 当該worktreeで`pnpm dev --port 5301`を起動する。
2. Playwrightから`chromium.launch({ channel: "chrome", headless: true })`を使い、`browser.newContext()`で新規プロファイルを作る。既存ブラウザー・拡張機能・保存済みthemeには依存させない。
3. `http://localhost:5301/blog`または`http://localhost:5301/`へ直接アクセスし、consoleのwarning/errorと`pageerror`を収集する。
4. `console.error`をinit scriptで包み、最初のwarning発生時点の`document.head.children`を収集すると、先頭がemotion-insertion-point、2番目がcharsetとなる。
5. 対照実験ではHTMLのJavaScriptを無効にする。SSRレスポンスもパース済みDOMもcharsetが先頭であり、emotion-insertion-pointは存在しない。
6. 次の診断用init scriptでmetaの追加だけを抑えて再読込する。これは原因切り分け用で、製品コードへ導入しない。

```js
await page.addInitScript(() => {
  const original = Element.prototype.prepend;
  Element.prototype.prepend = function (...nodes) {
    if (nodes.some(node =>
      node?.getAttribute?.("name") === "emotion-insertion-point"
    )) return;
    return original.apply(this, nodes);
  };
});
```

本番確認は`https://kokokoko0825.dev`に対し、light/dark × desktop（1280px）/iPhone UA（390px）、タイムゾーン`America/Los_Angeles`で`/blog`、`/blog/NOpv7vIxV3USDYbTlXIf`、`/about`、`/works`の16条件を確認。別にlight・Asia/Tokyoの`/`と`/blog`も確認した。各ページの待機は1〜2秒で、記事取得・描画まで確認できた条件を含む。

## 原因（ファイル:行 と根拠となるログ・コード）

### 1. charSet警告と構造不一致：MUIのhead先頭へのmeta追加（確定）

アプリ側の入口は`app/component/Header/Header.tsx:8-11`のMUIアイコンimport。開発バンドルでは`node_modules/.vite/deps/chunk-ZDMDIJD6.js:4513-4525`に以下の副作用が残る。

```js
if (typeof document === "object") {
  insertionPoint = document.querySelector('[name="emotion-insertion-point"]');
  if (!insertionPoint) {
    insertionPoint = document.createElement("meta");
    insertionPoint.setAttribute("name", "emotion-insertion-point");
    insertionPoint.setAttribute("content", "");
    document.querySelector("head").prepend(insertionPoint);
  }
}
```

元ファイルは`node_modules/.pnpm/@mui+styled-engine@7.3.5_…/node_modules/@mui/styled-engine/esm/StyledEngineProvider/StyledEngineProvider.js:46-59`。実際のSSRと初回警告時DOMの差は次のとおり。

```html
<!-- SSR / app/root.tsx:69 -->
<meta charset="utf-8">
<meta name="google-site-verification" content="…">

<!-- hydration開始時 -->
<meta name="emotion-insertion-point" content="">
<meta charset="utf-8">
<meta name="google-site-verification" content="…">
```

記録ログ：

```text
Warning: Prop `charSet` did not match. Server: "null" Client: "utf-8"
    at meta / head / html / Layout
Hydration failed because the initial UI does not match what was rendered on the server.
Warning: An error occurred during hydration. The server HTML was replaced with client content in <#document>.
There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
```

「Server null」はHTTPレスポンスのcharsetが欠落している意味ではない。Reactが現在照合している実DOMがemotionのmetaなので`getAttribute("charset")`がnullになる。

追加でPlaywrightのレスポンス差し替えにより、Reactの`tryToClaimNextHydratableInstance`から期待するfiber.typeと次の実DOMを出力した（ディスク上のファイル変更なし）。最初の構造不一致は次の組み合わせ。

```text
EXACT_MISMATCH script <meta name="robots" content="noindex, nofollow">
```

期待要素は`app/root.tsx:73`のdeviceDetectionScript、実DOMは`app/routes/blog._index.tsx:24`のmeta出力末尾のrobots。続くstyle/link/title/bodyのエラーは、この位置ずれから派生している。

反証実験は二種類実施した。(a) meta追加だけを抑える、(b) SSRレスポンスとクライアントのrootモジュール両方に同一のinsertion-point metaを追加する。どちらもcharSet警告とhydration失敗が消え、追加属性警告だけになった。(b)ではブラウザーのローカルネットワーク制約によるVite HMR WebSocketエラーも出たが、hydrationエラーとは別。

### 2. htmlのclass/data-theme追加属性警告（確定）

`app/root.tsx:67`のReactツリーは`<html lang="ja">`だが、hydration前に以下が属性を加える。

- `app/root.tsx:40-54,58-63`：inline scriptがclassとdata-themeを追加。
- `public/scripts/device-detection.js:9-35,48-49`：body末尾から読み込まれ、classを追加。
- `app/entry.client.tsx:12-27`：hydrateRootより前にstyles-loaded等を追加。

例：desktop/lightでは実DOMは`class="desktop-device styles-loaded" data-theme="light"`、React側は両属性なし。主原因を取り除いた状態で次のログを確認した。

```text
Warning: Extra attributes from the server: class,data-theme
    at html / Layout
```

この属性差だけの対照実験ではdocument全体のhydration失敗は発生しなかった。device-detection.jsのviewport変更は既存値`width=device-width, initial-scale=1`と同じで、確認したルートでは構造不一致を作らない。viewport metaがない別ルートでは追加要素となる可能性が残る。

### 3. DeviceContextのmobileView（今回の原因ではない）

`app/contexts/DeviceContext.tsx:21-24`はserverDeviceInfoをそのまま初期stateへ使う。画面幅による補正は`27-38`のuseEffect後なのでSSRと初回クライアントの値は一致する。desktop UAで390pxのケースでも、初回desktop→effect後mobileという更新であり、初回className不一致ではない。

`app/component/Header/Header.tsx:24,28`はそのisMobileからmobileViewを生成する。`html`上のmobile-view classとHeaderのVanilla Extract mobileViewは別物。混同しない。

### 4. ThemeContext（潜在的な初期値差、公開Headerでは現在遮断）

`app/contexts/ThemeContext.tsx:13-18`はSSRでdark、ブラウザーでdata-themeまたはOS設定を読むためlightになる場合がある。ただし公開Headerは`app/component/Header/Header.tsx:18-21,38-42`でisDark初期値をundefinedに固定し、両方のアイコンを常時描画してeffect後にaria-pressedを設定するため、このHeaderでは初期DOM差を作らない。

一方、`app/component/adminHeader/adminHeader.tsx:28-34,49-55,88-90`はthemeから直接DOMを分岐する。lightの場合の具体的な差はbuttonのaria-labelがSSR `Switch to light mode` / client `Switch to dark mode`、img srcがSSR `/images/humberger.svg` / client `/images/light_humberger.svg`。MUI SVGもsun/moonで変わる。認証付き管理画面での実機再現は未実施のため、ここはコード上の潜在リスクとして扱う。

### 5. DateText（タイムゾーン依存はあるが現在のhydration原因ではない）

`app/component/DateText.tsx:7-12`はgetFullYear/getMonth/getDateとtoLocaleDateStringで実行環境のタイムゾーンを使う。例：`2026-11-25T00:30:00Z`は東京で2026/11/25、Los Angelesで2026/11/24となり、timeのdateTime属性と表示テキストの両方が変わる。

ただし現在のblog/worksはデータ取得がuseEffect内（`app/routes/blog._index.tsx:39-44`、`app/routes/works._index.tsx:35-38`、`app/routes/blog.$blogId.tsx:37-43,126-127`）。SSRと初回クライアントではローディング表示でDateTextが出ず、日付はhydration後に初めて描画される。今回の初回失敗の根拠にはならない。将来loaderへ移す場合に修正が必要。

### 6. 本番での確認結果

上記18条件でReact minified #418/#423/#425等はゼロ。開発専用の依存バンドルと本番のtree shaking結果が異なることと整合するが、実際の本番バンドルの除去箇所までは追跡していないため、その理由は推定。

指定記事ではlightのdesktop/mobileで`Cannot convert undefined or null to object`、dark/mobileで`Cannot set properties of undefined (setting 'class-name')`が出た。Prism等のクライアント実行に関する別件の可能性があり、本調査では発生元の確定を行っていない。React hydrationエラー番号やhydration警告は伴わなかった。

## 修正案（比較・推奨・具体例）

### 推奨：insertion-pointをSSRとクライアント双方のReactツリーに宣言

`app/root.tsx:69`のcharset直後に一行追加する。headの先頭charsetを維持しつつ、MUIが既存metaを発見してprependを行わなくなる。現在の依存関係を維持した最小修正。

```tsx
<head>
  <meta charSet="utf-8" />
  <meta name="emotion-insertion-point" content="" />
  {/* 既存のMeta / scripts / style / Links */}
</head>
```

実験では先頭への追加で照合成功を確認した。実装時は上のcharset直後配置で再検証すること。MUI CSSの優先順位がinsertion pointの位置に依存する設定を後で加える場合は、その位置も確認する。

代案：MUIアイコンを既存のlucide-reactや小さなSVGコンポーネントへ置換してEmotion経路を外す。依存削減には有効だがHeader、AdminHeader、他のMUI利用箇所まで調べる必要があり、今回の不具合だけなら変更範囲が大きい。node_modulesの改変やprototypeの差し替えは採用しない。

### htmlの属性差：所有者を整理し、意図した属性差にだけ対応

画面幅はCSSメディアクエリで表現できる箇所を優先し、device class操作をroot inline script・外部script・entry.clientの三箇所へ重複させない。themeのちらつきを防ぐためhydration前のdata-theme設定を残す場合、html自身に限って次のescape hatchを使う案は許容できる。

```tsx
<html lang="ja" suppressHydrationWarning>
```

ただしheadへの追加metaの構造不一致はこれで直らない。上のinsertion-point修正を先に行う。警告を全要素に抑制する案は非推奨。

### ThemeContext・DateTextの予防修正

ThemeProviderはSSRと初回クライアントを`useState<Theme>("dark")`など同じ値にし、既存useEffectで保存値へ更新する。admin側の初回light UIが一瞬darkになる場合は公開Headerと同様にCSSによる切替を使う。Cookieからサーバーにthemeを渡す案もあるが、キャッシュ設計を伴うため今回の最小修正には過剰。

日付を日本時間に統一する仕様なら、dateTimeと表示文字列の両方を同じタイムゾーンから生成する。

```tsx
const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
}).formatToParts(date);
const part = (type: string) => parts.find(p => p.type === type)!.value;
const isoDate = `${part("year")}-${part("month")}-${part("day")}`;
return <time dateTime={isoDate}>{isoDate.replaceAll("-", "/")}</time>;
```

公式根拠：[React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)はSSRと初回クライアント出力の一致を要求し、suppressHydrationWarningを一階層に限るescape hatchとして説明している。

## 影響範囲とリスク

- 開発環境の公開Headerが出るページ全体でhead照合が失敗する。document全体のクライアント再描画により、SSRの利点を失い初期描画のちらつき・処理増が起こる。
- 本番で同じ失敗が発生しているとは現時点で断定できない。拡張機能だけを原因にする説明も、クリーン環境で再現したため誤り。
- insertion-point追加のリスクはCSS挿入順への影響。Header・管理画面のアイコンとlight/dark表示を検証する。
- DeviceContextの初回値統一を壊して、useState内で直接window.innerWidthを読む修正は避ける。
- 新たな外部入力・認証・秘密情報の処理を追加する修正ではない。CVSSスコアを割り当てる対象の脆弱性は本調査では確認していない。

## 未確認事項

- 管理画面の認証後のThemeContext起因のDOM差。
- 全ルート・全保存済みtheme・通信遅延・長時間滞在の組み合わせ。今回の本番確認は短時間の直接遷移。
- 本番記事のPrism等と思われる実行時エラーの正確なスタックと修正。
- 本番バンドルでinsertion-point追加が消える理由の完全な追跡。
- 調査終了時のHEADは`3af5470`。依頼文の`919ab32`とは異なるため、観測結果は実際に作業したworktreeのコードに対するもの。`e81e4a1`以前の再現は今回実行していない。
- 作業開始時から未追跡の`pnpm-workspace.yaml`が存在し、調査中に別workerの`ideas/20261125-blog-page-review.md`が追加された。いずれも変更・削除していない。自身の追加ファイルは本ファイルのみで、tracked diffはゼロ。ポート5301の自分のdev serverは停止済み（Orca terminal closeの`ptyKilled: true`を確認）。
