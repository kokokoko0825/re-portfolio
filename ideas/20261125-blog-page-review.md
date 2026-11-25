# ブログページ調査（2026-11-25）

## 結論（要約）

- 記事タイトルはPC 32px / モバイル28px。記事専用28px / 24px、line-height 1.5、weight 500を推奨。
- 目次は幅220px、PC余白24px、各リンク44px＋行間4px。pointer:fineでは32px行・余白16px、touchでは44pxを維持する。
- 連続ジャンプ停止をローカルで再現。通常アンカーのハッシュ変更後、ScrollRestorationが保存済みの数値位置へ戻す競合をスタックログで確認。日本語IDやBudouXのspan/wbrによる不一致ではない。

## 調査条件

- 対象: `/blog`、`/blog/NOpv7vIxV3USDYbTlXIf`、共有スタイル確認用 `/works/dGFHJiboLb1nB5tGU2pw`（MoodLog）。
- ローカル: `pnpm dev --port 5303`。本番: https://kokokoko0825.dev 。ビルドは実行していない。
- Orca内蔵Chromium、CSS viewport 1280×800と375×812、DPR 1。375ではmobile/touchを有効化。`innerWidth`も確認して計測した。新規ナビゲーションでviewport設定が戻るため毎回再指定した。
- 寸法は`getComputedStyle`と`getBoundingClientRect`による。ブラウザー内だけの一時CSS・イベント計測を使い、ソースは変更していない。
- 終盤の`git rev-parse --short HEAD`は **3af5470**（`fix: header icon sizing, Japanese phrase wrapping and centered layout`）。依頼文の919ab32とは異なる。チェックアウト変更はしていない。本番との一致は下記実測値・再現結果で確認した。

## 再現手順

### 1. タイトルと目次の実測

記事を開き、データ取得完了後に以下を実行する。375pxでは目次を開いた状態と閉じた状態を測る。

```js
const targets = document.querySelectorAll(
  'h1, article .znc p, aside, aside details, aside summary, aside nav a'
);
[...targets].map(el => {
  const css = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return {
    tag: el.tagName, text: el.textContent.slice(0, 24),
    width: rect.width, height: rect.height,
    fontSize: css.fontSize, lineHeight: css.lineHeight,
    fontWeight: css.fontWeight, margin: css.margin,
    padding: css.padding, maxWidth: css.maxWidth,
    position: css.position, top: css.top,
  };
});
```

### 2. ジャンプ停止の再現

1. 記事を開き、目次の「きっかけ」→「作ったもの」→「できないこと」→「おわりに」を順にクリック。
2. 各回でURL、`scrollY`、対象見出しの`getBoundingClientRect().top`、`history.state`を記録。
3. 400px手動スクロール後、別の目次リンクをクリックし、戻る→進むも試す。
4. 375pxでは記事上部の目次まで戻り、同じ操作を行う。`summary.click()`で閉じる→開くも確認。
5. ローカル・本番ともハッシュだけ変わり、スクロールが保存済み位置へ戻る。リンクのクリック自体は成功する。

1280pxでローカル・本番とも以下を得た（小数は丸め）。

| クリック | ハッシュ | 最終scrollY | 対象見出しの画面上端 |
| --- | --- | ---: | ---: |
| きっかけ | #きっかけ | 485 | 100 |
| 作ったもの | #作ったもの | 485 | 1019 |
| できないこと | #できないこと | 485 | 2476 |
| おわりに | #おわりに | 485 | 3539 |

手動スクロール後は保存値が885pxなどに更新され、その位置で再び止まる。戻る・進むでハッシュは変化するが、別見出しに対して同じ885pxへ復元された。

375pxの本番では、上部目次をクリックするためのスクロール位置203pxに復元され、対象見出しのtopは「きっかけ」744px、「作ったもの」1737px、「できないこと」3470px、「おわりに」5015pxになった。既存のスクロール履歴によっては485pxへ戻るため、初回から失敗する場合もある。**保存値そのものは環境依存だが、別のハッシュなのに同じ保存位置へ戻ることが本質。**

モバイルの目次はリンクをクリックしても`details.open === true`のまま。閉じる操作で高さ89.4px、再度開くと281.4pxになる。自動閉鎖でジャンプ位置が変わる実装ではない。

## 原因（ファイル:行と根拠）

### A. タイトルが大きく感じられる理由

| 要素 | 1280px | 375px | weight / margin / max-width |
| --- | --- | --- | --- |
| 記事h1 | 32px / 44.8px、実幅896px・高44.8px | 28px / 39.2px、幅335px・高117.6px（3行） | 500 / 0 / none |
| 記事本文p | 18px / 34.2px、幅720px | 16px / 30.4px、幅335px | 400 / 先頭pは0 / 100% |
| 一覧h1「Blog」 | 32px / 44.8px | 28px / 39.2px | 500 / 0 / none |
| 一覧カードh2 | 20px / 30px、最初のカード幅552px | 18px / 27px、幅295px | 500 / 0 / none |
| サイトbody | 17px / 29.75px | 16px / 28px | 400 |

ブログ記事・一覧は本番とローカルで上記値が一致した。Works詳細もh1は32/28px、line-height 44.8/39.2px、weight 500、margin 0、max-width none、本文18/16px。Worksには目次は存在しない。

- `app/styles/tokens.ts:21`: `largeTitle`が2rem/1.75rem、line-height 1.4、weight 500。
- `app/styles/style.css.ts:25`: 全h1へ`typeStyle("largeTitle")`。記事専用のサイズではない。
- `app/routes/blog.$blogId.tsx:174`付近: タイトルh1に専用クラスなし。`PhraseText`が句単位のspan/wbrを作る。
- `app/routes/styles.css.ts:308`: thumbnailは中央寄せ、PC padding上24/下16px、モバイル上20/下12px、gap12px。h1自身のmarginが大きいわけではない。
- `app/routes/styles.css.ts:102`付近: mainは最大1060px、PC左右32px、モバイル左右20px。h1のmax-widthはnoneで親幅まで広がる。
- `app/component/blogItem/styles.css.ts:49`: カードタイトルは`title3`（20/18px）。
- `app/styles/tokens.ts:31`、`app/routes/styles.css.ts:325`、`app/styles/style.css.ts:247`付近: 記事本文は18/16px。

記事h1は本文の1.78倍/1.75倍、カードタイトルの1.60倍/1.56倍。PCの32px自体は他媒体と比べ極端ではないが、短い「Blog」と長い記事タイトルが同じトークンを共有し、モバイルではタイトルが3行・約118pxを占める。

#### 日本語記事媒体との比較

2026-11-25に各実ページを同じブラウザーで実測。これらは媒体全体の不変な仕様値ではない。

| 参考記事 | 1280pxのh1 | 375px指定のh1 | weight |
| --- | --- | --- | --- |
| [Zenn: Markdown記法一覧](https://zenn.dev/zenn/articles/markdown-guide) | 33px / 49.5px | 24px / 36px | 700 |
| [note: Python新人エンジニア向け教育](https://note.com/yukikkoaimanabi/n/n3d5dc565fcb1) | 32px / 48px、幅620px | 20px / 30px、幅343px | 700 |
| [Qiita: Markdown記法チートシート](https://qiita.com/Qiita/items/c686397e4a0f4f11683d) | 28px / 39.2px、幅668px | 28px / 39.2px | 600 |

Qiitaは375pxを指定しても`innerWidth`が380pxとなったため、最後のモバイル値は**実レイアウト幅380px**。Zenn/noteは375pxを確認済み。PCは自サイト32px≒note32px≒Zenn33pxだが、モバイルは自サイト28pxがZenn24px/note20pxより大きい。

### B. 目次の箱が大きい理由

| 項目 | 1280px | 375px |
| --- | --- | --- |
| aside | 幅220px、高272.4px、sticky top100px | 幅335px、高281.4px、position static（topのcomputed値100pxは無効） |
| aside自体のpadding | 0 | 0 |
| 内側detailsのpadding | 24px（枠1px込み、リンク有効幅170px） | 20px（リンク有効幅293px） |
| リンク文字 | 14px / 22.4px、weight400 | 同左 |
| リンク高さ・上下padding | min-height44px、上下8px | 同左 |
| li間隔 | margin-bottom4px | 同左 |
| ネスト字下げ | h2/h3/h4/h5ごと0/16/32/48px | 同左 |
| 目次見出し | 専用div22.4px＋下8px、summary非表示 | summary47.4px（上下12px＋境界1px）、専用div非表示 |

- `app/routes/styles.css.ts:160`: aside幅220px/sticky top100px。
- 同`:173`: detailsに共通カード用padding24/20pxを流用。
- `app/component/TableOfContents/TableOfContents.css.ts:17`: 行ごとの下margin4px。
- 同`:21`: footnote14px、padding-block8px、min-height2.75rem=44px。
- 同`:39`: インデント0/16/32/48px。
- `app/component/TableOfContents/TableOfContents.tsx:30`: `h3`はlevel2として扱う。今回の記事は全項目h3なので、**階層が同じなのに全件16px字下げ**されている。
- `app/routes/blog.$blogId.tsx:195`: `<details ... open>`のためモバイルでも初期展開。

幅220pxはZennより小さい。大きさの主因は幅ではなく、24pxの内余白と44px＋4pxの行ピッチ、およびモバイルの初期展開。文字サイズ14pxをさらに下げる必要はない。

[同じZenn記事](https://zenn.dev/zenn/articles/markdown-guide)のPC目次はサイドバー幅300px、目次枠padding20px 20px 25px、リンク14px/21px、リンク実高さ21px、先頭数行の開始位置差29px。sticky親のtop24px。長い目次の枠は高さ750pxで収める。自サイトの44px＋4pxピッチはZennの約1.65倍。Zennは375pxではPC sidebarを非表示にして上部の目次操作へ移すため、PCの21pxクリック領域をそのままタッチUIへコピーするのは不適切。

### C. ジャンプ停止の確定原因

**通常アンカーが作る履歴と、RemixのScrollRestorationによる履歴キー単位の復元が競合している。**

1. `app/component/TableOfContents/TableOfContents.tsx:44`は`<a href={`#${item.id}`}>`であり、Remix `<Link>`ではない。
2. ネイティブなハッシュ遷移では、Remix管理の新しい`history.state.key`が作られず、`history.state === null`、Routerの`location.key === "default"`となるケースを実測。既存キーが引き継がれる場合も、新しい見出しごとに独立しないことが問題。
3. `app/root.tsx:83`の`<ScrollRestoration />`が反応する。
4. `node_modules/.vite/deps/chunk-HV3ABZQP.js:25`付近の`createBrowserLocation`はstate.keyがなければ`"default"`を返す。同`:2045`の`getScrollKey`は既定で`location.key`を使い、`:2053`で現在位置をそのキーに保存、`:2058`で復元値を取得する。
5. `node_modules/.vite/deps/@remix-run_react.js:1950`付近の復元effectは、`restoreScrollPosition`がnumberなら`window.scrollTo(0, restoreScrollPosition)`してreturnする。**hashをdecodeして対象へscrollIntoViewする処理より数値位置の復元が先。**

`window.scrollTo`をブラウザー内でラップした実ログ:

```text
click: 作ったもの
hashchange: #作ったもの, scrollY=1404.5   // ブラウザーのアンカー移動は成功
scrollTo: [0, 485]                     // 直後に保存済み位置へ戻される
stack:
  at window.scrollTo (<anonymous>:1:145)
  at http://localhost:5303/node_modules/.vite/deps/@remix-run_react.js:1954:16
  at commitHookEffectListMount (...)
final: hash=#作ったもの, scrollY=485, target.top=1019.3
```

したがって、「リンクを押せない」「日本語ハッシュが解決できない」のではなく、**一度移動した後にスクロール復元で戻される**。

#### 他の疑いの切り分け

- **ID生成・BudouX**: `app/utils/markdownRenderer.tsx:57`で見出しIDをraw inline contentから生成し、`:83`でテキスト部分のみspan/wbr化。TOCはDOMの`el.id`をそのまま使う（`TableOfContents.tsx:27`）。例: `<h3 id="作ったもの"><span>作った</span><wbr><span>もの</span></h3>` と `href="#作ったもの"` は対応し、`textContent`も「作ったもの」。
- **重複ID**: 対象記事では文書全体の重複ID配列は`[]`。現行コードは同じbaseSlugに連番を付ける（renderer`:72`）が、一般には見出し`A / A / A-1`から`a / a-1 / a-1`が生じ得る。この潜在問題は今回の停止原因とは別。
- **日本語decode**: Router実装は`decodeURIComponent(location.hash.slice(1))`を使う。上記ログでネイティブ移動も成功している。
- **scroll-margin-top**: `app/routes/styles.css.ts:379`で見出しh2〜h5に100px。本番でcomputed 100px、ヘッダーはPC約62.8pxなので隠れない。修正相当の検証では対象topが約100pxになる。
- **IntersectionObserver**: TOCには実装自体がない。active stateはなく、`tocLinkActive`スタイルも未使用。監視の誤動作ではない。
- **accordion**: 常にopenで、リンククリック時のcloseハンドラーもない。閉鎖によるレイアウトシフトは今回の原因ではない。
- **hydration**: ローカルではcharset mismatchとhydration failedも観測した。ただし本番でも同じジャンプ停止とnavigateによる改善を確認しており、直接原因の説明には不要。別担当の調査対象。

## 修正案

### 1. 推奨: TOCをRemix Linkへ置換（最優先）

変更箇所: `app/component/TableOfContents/TableOfContents.tsx:44`。既存のclassNameと階層判定は保つ。

```tsx
import { Link } from "@remix-run/react";

// 現在の <a href=...> と </a> を置換する
<Link
  to={`#${encodeURIComponent(item.id)}`}
  className={`${styles.tocLink} ${
    item.level === 1 ? styles.tocLinkLevel1 :
    item.level === 2 ? styles.tocLinkLevel2 :
    item.level === 3 ? styles.tocLinkLevel3 : styles.tocLinkLevel4
  }`}
>
  {item.text}
</Link>
```

既存のクラス選択を保ち、`replace`、`reloadDocument`、`preventScrollReset`、独自`pushState`、常時smooth scrollは追加不要。ScrollRestoration自体は残し、履歴キーとハッシュ移動を同じRouterに管理させる。[Remix Link公式](https://v2.remix.run/docs/components/link/)、[ScrollRestoration公式](https://v2.remix.run/docs/components/scroll-restoration/)も参照。

**検証:** ソース変更は禁止のため、通常のクリックを一時的にpreventDefaultし、Linkと同じRouterの`navigate(a.getAttribute("href"))`へ渡すブラウザー内shimで検証した。これは原因検証であり、実装済みLinkのテストとは区別する。shimは撤去済み。

本番1280pxで全項目を順にクリックした結果:

```text
きっかけ     scrollY=485    target.top=99.98   key=9hzspoo9
作ったもの   scrollY=1404.5 target.top=99.83   key=dy2rnvqe
できないこと scrollY=2861   target.top=99.77   key=xwy8yseh
おわりに     scrollY=3924   target.top=99.98   key=l85poy01
戻る → #できないこと, scrollY=2861, target.top=99.77
進む → #おわりに,     scrollY=3924, target.top=99.98
```

本番375pxも各クリック前に目次まで戻って検証:

```text
きっかけ     scrollY=847    target.top=99.98
作ったもの   scrollY=1839.5 target.top=100.16
できないこと scrollY=3573.5 target.top=99.88
おわりに     scrollY=5117.5 target.top=100.22
```

各項目に別キーが付き、目次は開いたまま正常にジャンプした。ローカル375pxでも同じnavigate相当処理で後続3項目の移動を確認した。

| 代案 | 評価 |
| --- | --- |
| **Remix Linkへ置換** | 推奨。変更が最小で、履歴復元も維持できる |
| `<a>`＋独自scrollIntoView/pushState | 非推奨。修飾キー・履歴・同一hash再クリック・フォーカス処理を再実装することになる |
| ScrollRestorationを削除 | 非推奨。他ページから戻った際のスクロール位置を失う |
| `preventScrollReset`だけ追加 | 根治しない。numberの保存位置復元がこのオプション判定より先に実行される |
| `getKey`をpathname＋hashにする | 全体の復元設計を変える。まずLinkに統一し、必要が判明するまで採用しない |

### 2. 記事専用タイトル: PC28px / mobile24pxを推奨

`largeTitle`を全体変更せず、`app/styles/tokens.ts`に記事用途のトークンを追加し、`app/routes/styles.css.ts`で専用クラス化して記事h1へ付ける。短い一覧h1は現状維持。Works詳細の長いタイトルにも同じクラスを使える。

```ts
// tokens.ts の type に追加
articleTitle: {
  fontSize: "1.75rem", mobileSize: "1.5rem", // 28px / 24px
  fontWeight: 500, lineHeight: 1.5, letterSpacing: 0,
},

// routes/styles.css.ts
export const articleTitle = style({
  ...typeStyle("articleTitle"),
  margin: 0,
  maxWidth: "56rem", // 896px。モバイルは親幅335pxで制限
});
```

```tsx
<h1 className={styles.articleTitle}><PhraseText>{blogData.title}</PhraseText></h1>
```

本番DOMへの一時CSSで実測すると、例の記事はPCで幅896→784px・高さ44.8→42px、375pxで高さ117.6→108px（3行を維持）。本文比は1.56/1.50へ下がる。最大幅を本文720pxに狭めるとPCでも改行が増えるため、今回は896px上限を推奨する。文字サイズだけで「タイトル領域全体」を劇的に小さくできるわけではない。

代案は既存`title1`の28/26px（変更が少なく、mobileの縮小は小さい）、またはPC現状32/mobile24px（PC印象を保つ）。所有者の「大きい」にPCも含まれるため、専用28/24pxを推奨する。h1だけを下げると記事内h2の28/24pxと同サイズになるため、h2を多用する記事で階層差を確認する。本文見出しの一括縮小はこの変更に混ぜない。

### 3. 目次: 幅を保ち、PCの余白・行ピッチを縮める

推奨値: PC幅220pxは維持、padding16px、14px/1.6、pointer:fineの行32px・上下4px・行間2px、タッチは44px・上下8px。375pxはpadding12px 16px。sticky top100pxはまず維持。

```ts
// TableOfContents.css.ts: 既存tocLinkの該当項目を変更
minHeight: "2.75rem", // defaultは44px
paddingBlock: space[8],
"@media": {
  "(hover: hover) and (pointer: fine)": {
    minHeight: "2rem", paddingBlock: space[4],
  },
  "(any-pointer: coarse)": { // タッチ併用端末でも44pxを優先
    minHeight: "2.75rem", paddingBlock: space[8],
  },
},

// tocListItem
marginBottom: "0.125rem", // 2px

// routes/styles.css.ts: tocAccordion
padding: space[16],
"@media": {
  [mobile]: { padding: `${space[12]} ${space[16]}` },
},
```

対象記事の全項目h3に付く16pxの不要な字下げは、見出し集合の最小レベルを基準に正規化する。深い項目の字下げ幅は12pxずつ、最大36pxを推奨。

```ts
// headings.forEach後、setItemsの前に正規化
const minLevel = Math.min(...tocItems.map(item => item.level));
setItems(tocItems.map(item => ({
  ...item,
  level: item.level - minLevel + 1,
})));
```

実装時は空配列なら`setItems([])`としてreturnする。既存のlevel1〜4クラスのpaddingLeftを0/12/24/36pxへ変更する。これにより、今回の「きっかけ」は0px、例えばその下にh4「実装方針」があれば12pxになる。

本番DOMへの一時CSSで、4項目の箱はPC高272.4→200.4px（約26%減）、リンク有効幅170→186px。375pxは281.4→257.4px、各リンク44pxを維持できた。注: 寸法比較用CSSはPC幅で32px、mobile幅で44pxを指定した。上の本実装案はviewportより入力機器を優先する。

初期折りたたみをモバイルだけに適用する案は、箱をさらに小さくするが、開閉操作が1回増える。今回は**余白削減とジャンプ修正を先行**し、目次が長い記事で初期折りたたみを別途判断する。リンククリックでの自動閉鎖は付けない。閉じるなら本文の位置が上へずれるため、閉鎖後にジャンプを実行する必要がある。

#### HIGとのトレードオフ

[Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)はプラットフォームごとの操作サイズを扱い、iOS/iPadOSの標準サイズは44×44pt、macOSでは28×28ptを示す。[UI Design Dos and Don’ts](https://developer.apple.com/design/tips/)にも指で押す操作領域44ptの指針がある。WebのCSS pxとネイティブのptを物理単位として同一視はしないが、タッチの44 CSS pxを保つ設計判断の参考になる。

文字14pxのまま行高を44px確保すれば指で押しやすく、PCマウスでは32px行にして一覧性を上げられる。Zennの21pxリンク領域まで縮める必要はない。タッチも使えるノートPCでは`any-pointer: coarse`を優先し、44pxを維持する。キーボード用のfocus-visible表示と200%ズーム時の折り返しも実装後に確認する。

## 影響範囲とリスク

- Link変更はTOC内の同一ページ遷移に限定する。`root.tsx`のScrollRestorationは変更しない。
- 記事専用クラスを導入すれば一覧・About等のh1は維持できる。Worksは同じglobal h1/thumbnail/textFrame/rendererを共有するが、h1に明示的にクラスを付けるまで変更は及ばない。
- 目次のpaddingは共通カードトークンを変えず、そのスタイルだけで調整する。本文幅720pxや他カードへ波及させない。
- インデント正規化は最初の階層がh3以上の記事に効く。h2→h4など階層を飛ばした記事をどう見せるかは正規化仕様に従う。
- IDを変更すると既存の外部ディープリンクが壊れる。今回のジャンプ修正ではslug生成を変更しない。重複slugの潜在問題は別修正で扱う。
- アクセシビリティ上はタッチ44pxを維持し、リンク色のopacity0.7は縮小と別にコントラストを確認する。
- 認証・DB・秘密情報には変更不要。UI調査からサイト全体のCVSS値を保証することはできない。

## 未確認事項

- 実ソースをLinkへ置換した状態のbuild/lint/typecheckは、調査のみという制約により未実施。`pnpm build`は実行していない。原因と修正方針はブラウザー内のnavigate相当処理で検証済み。
- Safari/iOS実機、Firefox、キーボードのみの操作、200%ズームは未確認。
- mobileの修正相当検証では全項目のクリック成功を確認。修正相当での戻る/進むはPCで確認済み、mobile固有の履歴復元は未確認。
- 初回ディープリンクは本文がFirestore取得後に描画されるため、ScrollRestorationが先に対象を探す可能性がある。今回の連続クリックとは別経路で、直接URL＋hashを開くテストは未実施。
- 同一hashの再クリック、見出しの重複・記号のみ・Markdownリンクを含むケースは実装後の回帰対象。対象記事のID重複はない。
- ローカル終盤にHMR後の`.znc`スタイル未適用（h3 18.72px、scroll-margin 0px）も観測した。この状態の測定は採用せず、修正相当の最終検証と提案CSSの寸法確認は本番のcomputed scroll-margin100pxを確認して実施した。
- 本番のWorks詳細は未計測。共有スタイルの影響はローカルMoodLogとソースで確認済み。
- 調査開始時点で未追跡の`pnpm-workspace.yaml`が存在した。他担当のideasファイルを含め、担当外ファイルは変更・削除していない。

## 後片付け

- 自分が起動した5303番のdev serverはCtrl-Cで停止済み（exit 130）。他ポートのプロセスは停止していない。
- 一時CSS・navigate shim・スクロール計測は撤去またはページ再読込で破棄し、今回作成した7タブは閉じた。
- 最終`git diff --exit-code`はexit 0。追跡対象ファイルの変更なし。自分の出力はこのideasファイルのみ。
