# HIG・日本語 Web タイポグラフィと余白の調査

調査日: 2026-11-24。調査対象: Noto Sans JP を使う日本語中心のポートフォリオ。コード変更は行わない。

## 調査の前提

Apple のネイティブ UI の pt と Web の CSS px は異なる。HIG の数値は比較資料であり、そのまま Web の必須値にはしない。公式資料の原数値、公開 CSS の観測値、本サイト向け提案値を分ける。

## 出典一覧

- Apple HIG Typography: https://developer.apple.com/design/human-interface-guidelines/typography.md
- Apple HIG Layout: https://developer.apple.com/design/human-interface-guidelines/layout.md
- デジタル庁 Typography: https://design.digital.go.jp/dads/foundations/typography/
- デジタル庁テキストスタイル: https://design.digital.go.jp/dads/foundations/typography/text-style/
- デジタル庁 Spacing: https://design.digital.go.jp/dads/foundations/spacing/
- SmartHR Typography: https://smarthr.design/products/design-tokens/typography/
- SmartHR Spacing: https://smarthr.design/products/design-tokens/spacing/

- Apple HIG Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility.md
- Apple UI Design Dos and Don'ts: https://developer.apple.com/design/tips/
- Apple Auto Layout Guide（旧資料、Simple Constraints）: https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/WorkingwithSimpleConstraints.html
- Apple UIKit layout margins: https://developer.apple.com/documentation/uikit/positioning-content-within-layout-margins
- Apple container margins: https://developer.apple.com/documentation/swiftui/contentmarginguide/container
- Apple readableContentGuide: https://developer.apple.com/documentation/uikit/uiview/readablecontentguide.md
- Apple System Fonts: https://developer.apple.com/fonts/system-fonts/
- Apple WWDC23 / What's new with text and text interactions: https://developer.apple.com/videos/play/wwdc2023/10058/
- Apple Japan トップページ: https://www.apple.com/jp/
- Apple Japan が読み込む共通 CSS: https://www.apple.com/v/homepage/a/styles/main.built.css
- Apple Japan が読み込むページ CSS: https://www.apple.com/v/homepage/a/styles/homepage.built.css
- Zenn 公式 SCSS（本文の親）: https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss
- Zenn 公式 SCSS（見出し・段落・リスト）: https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss
- W3C JLREQ 基本版面: https://www.w3.org/TR/jlreq/#considerations_in_designing_the_kihonhanmen
- Google Fonts / Noto Sans JP メタデータ: https://github.com/google/fonts/blob/main/ofl/notosansjp/METADATA.pb
- note の確認対象記事（公式アカウントからリンクされる記事）: https://note.jp/n/na2355e3abefb
- note 記事本文 CSS: https://frontend.st-note.com/next/_next/static/css/8b74e70538eebe5e.css
- note のサイズ変数 CSS: https://frontend.st-note.com/next/_next/static/css/824052b7948eee7a.css

## 結論と資料の読み方

このサイトは日本語本文を軸に設計し、HIG からは役割名と情報階層を借りる。ネイティブの小さい補足文字まで縮小コピーすると日本語が読みにくくなる。たとえば macOS Body の原値をそのまま Web 本文に当てず、デジタル庁が本文・UI の基準にする大きさを優先する。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/)

ここで「原値」は公式資料にある値、「観測」は取得時の公開 CSS 宣言、「提案」は本サイト向け設計判断を表す。提案表の数値は引用値ではなく、表記した出典を根拠に選んだ初期値であり、ブラウザでの実表示確認は今回の調査対象外。CSS px 換算の説明に用いる基準値は各表に明記する。

## HIG 原数値: iOS / iPadOS の Large（default）

表全体の出典: [Typography / Large (default)](https://developer.apple.com/design/human-interface-guidelines/typography.md#Large-default)。単位はネイティブの pt。HIG の Leading 欄はこの表では行送りの値として掲載されており、CSS の行間の追加量として足してはいけない。

|Style      |Weight  |Size (points)|Leading (points)|Emphasized weight|
|-----------|--------|-------------|----------------|-----------------|
|Large Title|Regular |34           |41              |Bold             |
|Title 1    |Regular |28           |34              |Bold             |
|Title 2    |Regular |22           |28              |Bold             |
|Title 3    |Regular |20           |25              |Semibold         |
|Headline   |Semibold|17           |22              |Semibold         |
|Body       |Regular |17           |22              |Semibold         |
|Callout    |Regular |16           |21              |Semibold         |
|Subhead    |Regular |15           |20              |Semibold         |
|Footnote   |Regular |13           |18              |Semibold         |
|Caption 1  |Regular |12           |16              |Semibold         |
|Caption 2  |Regular |11           |13              |Semibold         |

## HIG 原数値: macOS の built-in text styles

**macOS に iOS と同じ「Dynamic Type の Large」はない。** 現行 HIG は macOS が Dynamic Type に対応しないと明記し、別途 built-in text styles を掲載している。次はその表であり、Large 設定の表とは呼ばない。[Typography / macOS](https://developer.apple.com/design/human-interface-guidelines/typography.md#macOS)

表全体の出典: [Typography / macOS built-in text styles](https://developer.apple.com/design/human-interface-guidelines/typography.md#macOS-built-in-text-styles)。単位は pt。

|Text style |Weight |Size (points)|Line height (points)|Emphasized weight|
|-----------|-------|-------------|--------------------|-----------------|
|Large Title|Regular|26           |32                  |Bold             |
|Title 1    |Regular|22           |26                  |Bold             |
|Title 2    |Regular|17           |22                  |Bold             |
|Title 3    |Regular|15           |20                  |Semibold         |
|Headline   |Bold   |13           |16                  |Heavy            |
|Body       |Regular|13           |16                  |Semibold         |
|Callout    |Regular|12           |15                  |Semibold         |
|Subheadline|Regular|11           |14                  |Semibold         |
|Footnote   |Regular|10           |13                  |Semibold         |
|Caption 1  |Regular|10           |13                  |Medium           |
|Caption 2  |Medium |10           |13                  |Semibold         |

## HIG 原数値: SF Pro のサイズ別 tracking

表全体の出典: [Typography / Tracking values](https://developer.apple.com/design/human-interface-guidelines/typography.md#Tracking-values)。iOS / iPadOS / visionOS の **SF Pro** と macOS の表を併記する。丸めや記載差を勝手に補正しない。左右の表で一部の pt 値が入れ替わっている箇所も、取得した原資料どおり。

| Size pt | iOS SF Pro: 1/1000 em | iOS: pt | macOS: 1/1000 em | macOS: pt |
| --- | --- | --- | --- | --- |
| 6 | +41 | +0.24 | +41 | +0.24 |
| 7 | +34 | +0.23 | +34 | +0.23 |
| 8 | +26 | +0.21 | +26 | +0.21 |
| 9 | +19 | +0.17 | +19 | +0.17 |
| 10 | +12 | +0.12 | +12 | +0.12 |
| 11 | +6 | +0.06 | +6 | +0.06 |
| 12 | 0 | 0.0 | 0 | 0.0 |
| 13 | -6 | -0.08 | -6 | -0.08 |
| 14 | -11 | -0.15 | -11 | -0.15 |
| 15 | -16 | -0.23 | -16 | -0.23 |
| 16 | -20 | -0.31 | -20 | -0.31 |
| 17 | -26 | -0.43 | -26 | -0.43 |
| 18 | -25 | -0.44 | -25 | -0.44 |
| 19 | -24 | -0.45 | -24 | -0.45 |
| 20 | -23 | -0.45 | -23 | -0.45 |
| 21 | -18 | -0.36 | -18 | -0.36 |
| 22 | -12 | -0.26 | -12 | -0.26 |
| 23 | -4 | -0.10 | -4 | -0.10 |
| 24 | +3 | +0.07 | +3 | +0.07 |
| 25 | +6 | +0.15 | +6 | +0.15 |
| 26 | +8 | +0.22 | +8 | +0.22 |
| 27 | +11 | +0.29 | +11 | +0.29 |
| 28 | +14 | +0.38 | +14 | +0.38 |
| 29 | +14 | +0.40 | +14 | +0.40 |
| 30 | +14 | +0.40 | +14 | +0.40 |
| 31 | +13 | +0.39 | +13 | +0.39 |
| 32 | +13 | +0.41 | +13 | +0.41 |
| 33 | +12 | +0.40 | +12 | +0.40 |
| 34 | +12 | +0.40 | +12 | +0.40 |
| 35 | +11 | +0.38 | +11 | +0.38 |
| 36 | +10 | +0.37 | +10 | +0.37 |
| 37 | +10 | +0.36 | +10 | +0.36 |
| 38 | +10 | +0.37 | +10 | +0.37 |
| 39 | +10 | +0.38 | +10 | +0.38 |
| 40 | +10 | +0.37 | +10 | +0.37 |
| 41 | +9 | +0.36 | +9 | +0.36 |
| 42 | +9 | +0.37 | +9 | +0.37 |
| 43 | +9 | +0.38 | +9 | +0.38 |
| 44 | +8 | +0.37 | +8 | +0.37 |
| 45 | +8 | +0.35 | +8 | +0.35 |
| 46 | +8 | +0.36 | +8 | +0.36 |
| 47 | +8 | +0.37 | +8 | +0.37 |
| 48 | +8 | +0.35 | +8 | +0.35 |
| 49 | +7 | +0.33 | +7 | +0.33 |
| 50 | +7 | +0.34 | +7 | +0.34 |
| 51 | +7 | +0.35 | +7 | +0.35 |
| 52 | +6 | +0.33 | +6 | +0.31 |
| 53 | +6 | +0.31 | +6 | +0.33 |
| 54 | +6 | +0.32 | +6 | +0.32 |
| 56 | +6 | +0.30 | +6 | +0.30 |
| 58 | +5 | +0.28 | +5 | +0.28 |
| 60 | +4 | +0.26 | +4 | +0.26 |
| 62 | +4 | +0.24 | +4 | +0.24 |
| 64 | +4 | +0.22 | +4 | +0.22 |
| 66 | +3 | +0.19 | +3 | +0.19 |
| 68 | +2 | +0.17 | +2 | +0.17 |
| 70 | +2 | +0.14 | +2 | +0.14 |
| 72 | +2 | +0.14 | +2 | +0.14 |
| 76 | +1 | +0.07 | +1 | +0.07 |
| 80 | 0 | 0 | 0 | 0 |
| 84 | 0 | 0 | 0 | 0 |
| 88 | 0 | 0 | 0 | 0 |
| 92 | 0 | 0 | 0 | 0 |
| 96 | 0 | 0 | 0 | 0 |

tracking の em 表記への換算は「1/1000 em 欄を 1000 で割る」。たとえば原表の 17pt の −26 は −0.026em。ただし pt 欄と換算結果は丸め等で完全には一致しないので、混ぜて精密計算しない。[原表・単位](https://developer.apple.com/design/human-interface-guidelines/typography.md#Tracking-values)

この表は SF Pro の再現用。HIG は実行中のアプリではシステムがサイズごとに tracking を調整し、モックアップでは調整が必要な場合があると説明する。Noto Sans JP の日本語をこの表の負の tracking で詰める根拠にはならない。たとえば「作品について」の漢字・仮名に SF の本文用 tracking を一律適用しない。[同資料](https://developer.apple.com/design/human-interface-guidelines/typography.md)

## HIG の可読性・階層・Web への適用

| 原資料の項目 | iOS / iPadOS | macOS | 出典 |
| --- | --- | --- | --- |
| 本文の既定サイズ | 17pt | 13pt | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md) |
| 推奨最小サイズ | 11pt | 10pt | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md) |

HIG は小さい文字ほど Ultralight / Thin / Light を避け、Regular / Medium / Semibold / Bold を優先する。カスタムフォントが細い場合は推奨サイズより大きくして確認する。色・太さ・サイズを組み合わせて階層を示し、拡大時も相対的な階層を保つ。書体を増やしすぎないことも推奨する。[HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md)

HIG は長い文章や幅広い列では広い leading を使い、限られたリスト行では狭くできると説明する。ただし複数行の長い文章には tight leading を避ける。特に **3 行以上**は避けると明記される。例: 作品カードの長い説明まで、氏名のディスプレイ文字と同じ詰まった行高にしない。[HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md)

HIG のこの表は Apple プラットフォームのアプリ向けで、Web の必須サイズ表ではない。CSS で本文のサイズを相対単位にし、利用者の拡大に応じて折り返し・カード高さ・カラム数を変えるのは、その目的を Web に移すための本サイト向け方針。固定高で記事タイトルを切り落とさない。HIG の Dynamic Type 対応を普通の Web ページが自動で満たす、とも説明しない。[HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout.md)

## Apple の日本語 / CJK 対応

- Apple は [System Fonts](https://developer.apple.com/fonts/system-fonts/) に Hiragino Sans 等を掲載する。SF のシステムフォント名だけを根拠に、日本語グリフまで欧文 SF と同一だとは扱えない。
- [WWDC23](https://developer.apple.com/videos/play/wwdc2023/10058/) は言語ごとの行高・改行処理への対応を説明し、Text Styles の採用と高さの変化への対応を勧める。ただし、今回取得した HIG に「日本語は欧文の一定倍率の行高」という固定規定は見つからなかった。
- Apple Japan の取得 CSS は日本語用に `SF Pro JP, SF Pro Text, SF Pro Icons, Hiragino Kaku Gothic Pro, …` というスタックを使う。これは Apple 自社サイトの実装であり、Noto Sans JP をそのスタックへ置き換える必要はない。[Apple 共通 CSS](https://www.apple.com/v/homepage/a/styles/main.built.css)
- 日本語向け tracking 表は今回の HIG では確認できない。SF Pro の表を日本語・Noto Sans JP 用の公式字間表として転用しない。Apple Japan の `:lang(ja)` は実際に字間をゼロへ戻している。[HIG tracking](https://developer.apple.com/design/human-interface-guidelines/typography.md#Tracking-values) / [Apple 共通 CSS](https://www.apple.com/v/homepage/a/styles/main.built.css)

### Apple Japan の公開 CSS 観測

表全体の出典: [取得ページ](https://www.apple.com/jp/) が参照する [main.built.css](https://www.apple.com/v/homepage/a/styles/main.built.css)。2026-11-24 時点の宣言を HTTP で取得。computed style の測定ではなく、後続のページ別 CSS・要素固有ルールで変わり得る。行高の小数値は CSS 原値。日本語セレクタの優先度も考慮する。

| 対象宣言 | font-size | line-height | weight | letter-spacing | 条件 |
| --- | --- | --- | --- | --- | --- |
| `body` 共通 | 17px | 1.4705882353 | 400 | −0.022em | 基本宣言 |
| `body:lang(ja)` | 共通を継承 | 1.3529611765 | 共通を継承 | 0em | 日本語上書き |
| `.typography-body-reduced:lang(ja)` | 14px（共通） | 1.4 | 400（共通） | 0em | 日本語の小さめ本文 |
| `.typography-headline:lang(ja)` | 48px（共通） | 1.0834933333（共通） | 600（共通） | 0em | 基本宣言 |
| 同見出し | 40px | 1.1 | 600 | 0em | viewport ≤1068px |
| 同見出し | 32px | 1.125 | 600 | 0em | viewport ≤734px |
| `.typography-tile-headline:lang(ja)` | 56px（共通） | 1.125 | 600（共通） | 0em | 日本語上書き |

**Apple Japan 自体が「日本語なら必ず欧文より広い行高」を使うわけではない。** 上記は短い販促文・UI を含む実装例であり、記事本文へこの密度を移すと詰まりすぎる。例: 商品名の短い見出しと、コード解説が続く Blog 本文では用途が違う。[Apple CSS](https://www.apple.com/v/homepage/a/styles/main.built.css) / [Zenn 本文 CSS](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss)

## 日本語デザインシステムの原数値

### デジタル庁デザインシステム

以下の数値の出典: [概要](https://design.digital.go.jp/dads/foundations/typography/) と [スタイル一覧](https://design.digital.go.jp/dads/foundations/typography/text-style/)。採用書体は Noto Sans JP。N は normal、B は bold を表す。現行資料では全スタイルの字間がゼロ。

| スタイル群 | サイズ CSS px | weight | line-height | letter-spacing |
| --- | --- | --- | --- | --- |
| Display | 64 / 57 / 48 | N=400 / B=700 | 1.4 | 0 |
| Standard 大見出し | 45 / 36 | 400 / 700 | 1.4 | 0 |
| Standard 見出し | 32 / 28 / 26 / 24 / 22 / 20 | 400 / 700 | 1.5 | 0 |
| Standard 本文大 | 18 | 400 / 700 | 1.6 | 0 |
| Standard 本文 | 17 | 400 / 700 | 1.7 | 0 |
| Standard 本文 | 16 | 400 / 700 | 1.7 または 1.75 | 0 |
| Dense | 17 / 16 / 14 | 400 / 700 | 1.3 または 1.2 | 0 |
| Oneline | 17 / 16 / 14 | 400 / 700 | 1.0 | 0 |
| Mono | 17 / 16 / 14 | 400 / 700 | 1.5 | 0 |

本文・UI の基準は **16 CSS px 以上**、補足や領域制約の例外が **14 CSS px**。原則としてそれ未満は許容しない。読み物本文の行高は少なくとも **1.5**、大見出しは本文より狭くできる。表の Dense / Oneline は用途限定で、読み物にそのまま使わない。[デジタル庁 Typography](https://design.digital.go.jp/dads/foundations/typography/)

### SmartHR Design System

全数値の出典: [Typography](https://smarthr.design/products/design-tokens/typography/)。基準は **16px**。旧 SHORT / TALL / GRANDE / VENTI は非推奨であり、旧値と現行値を混ぜない。

| 現行トークン | rem | CSS px（基準値時） | モバイル差分 |
| --- | --- | --- | --- |
| XXS | 0.667 | 10.67 | 記載なし |
| XS | 0.75 | 12 | 記載なし |
| S | 0.857 | 13.71 | 記載なし |
| M | 1 | 16 | 記載なし |
| L | 1.2 | 19.2 | 記載なし |
| XL | 1.5 | 24 | 記載なし |
| XXL | 2 | 32 | 1.8rem = 28.8px |

| 用途 | line-height | 運用 |
| --- | --- | --- |
| 見出し | 1.25（TIGHT） | UI 向け |
| 段落 | 1.5（NORMAL） | M を基本とする |
| ラベル | 1（NONE） | ボタン等、段落ではない文字 |

表の小さい文字は利用可能なトークンの原値であり、本サイトで積極的に使う提案ではない。SmartHR 自身も小さいサイズの積極利用を避けると説明する。例: Blog 日付を小さくするためだけに XS を採用しない。[SmartHR Typography](https://smarthr.design/products/design-tokens/typography/)

### Zenn の公式記事スタイル

| 対象 | 観測値 | 出典 |
| --- | --- | --- |
| `.znc` | line-height: 1.9 | [index.scss](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss) |
| 連続段落 `p + p` | margin-top: 1.5em | [_content.scss](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| 記事内 h1 / h2 / h3 / h4 | font-size: 1.7 / 1.5 / 1.3 / 1.1em | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| 小画面の h1 / h2 / h3 | font-size: 1.6 / 1.4 / 1.2em | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| h1 / h2 の上余白 | 2.3em（見出し自身の文字サイズ基準） | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| h3〜h6 の上 / 下余白 | 2.25em / 0.5em | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| h1 / h2 の下余白 | 1.1rem（後続宣言が上書き） | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| ul / ol | 行高1.7、上下 margin 1.4rem | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| li | 上下 margin 0.4rem | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| 表 | line-height: 1.5 | [同上](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |

この公開パッケージだけでは Zenn サービスの親要素が与える記事本文の絶対 font-size は決定できない。見出し行高もこの SCSS 自体は独立した共通指定をしておらず、ホスト側のスタイルに依存する。サービス全体の文字サイズを推測で確定値にしない。

### note の現行記事 CSS 観測

[note 公式アカウント](https://note.com/info) からリンクされている [記事](https://note.jp/n/na2355e3abefb) を取得し、記事の `.note-common-styles__textnote-body` を確認した。以下は取得時の CSS 宣言で、note 全ページの保証値ではない。本文の [CSS](https://frontend.st-note.com/next/_next/static/css/8b74e70538eebe5e.css) と [変数定義](https://frontend.st-note.com/next/_next/static/css/824052b7948eee7a.css) が出典。px 換算は root の既定が16pxの場合の計算値で、利用者設定に応じて変わる。

| 対象 | 広い画面の宣言 | 幅480px以下の宣言 | 基準16pxでの計算値 |
| --- | --- | --- | --- |
| 本文 p の font-size | `--font-size-lg` = 1.125rem | `--font-size-base` = 1rem | 18px / 16px |
| 本文 p の line-height | 2.25rem | 2rem | 36px / 32px。どちらも本文サイズ比2.0 |
| p 等の上下 margin | 36px | 30px | 隣接ブロックの上下を単純加算しない |
| h2 / h3 の weight / tracking | 700 / 0.04em | 同じ宣言を継承 | 見出しにのみ確認した値 |
| h2 / h3 の line-height | 2.25rem | 1.875rem | 36px / 30px |
| h2 の margin-top | 54px | 45px | 本文より広い節の区切り |
| h2 / h3 の margin-bottom | −18px | −15px | 後続段落の正の余白との組み合わせ。単独コピーしない |

一般に紹介される「note の行高は1.875」という値を、現在の本文へそのまま当てはめない。この取得 CSS では **1.875rem は小画面の見出しやリストの宣言**であり、本文 p には別の上書きがある。本文全体の字間はこの対象セレクタでは直接指定されておらず、見出しの **0.04em**を本文の値として報告しない。[note 記事 CSS](https://frontend.st-note.com/next/_next/static/css/8b74e70538eebe5e.css)

### 日本語の字間と Noto Sans JP

「日本語本文は必ず **0.02〜0.05em**」という一次資料の共通規定は確認できなかった。この範囲は試作候補として扱うべきで、HIG 推奨と呼ばない。今回は **0em** を本文の初期値にする。根拠はデジタル庁の Noto Sans JP と Apple Japan の日本語 CSS がともにゼロ指定で、JLREQ も漢字・仮名をベタ組にする原則を説明するため。[デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) / [Apple CSS](https://www.apple.com/v/homepage/a/styles/main.built.css) / [JLREQ](https://www.w3.org/TR/jlreq/#principles_of_arrangement_of_kanji_and_kana_characters)

Noto Sans JP の Google Fonts メタデータは weight 軸 **100〜900**を持つ。しかし、このプロジェクトの読み込み条件が **400 / 500 / 700**なら、その値だけを明示的に使う。Regular→400、Medium→500、強い Headline / Semibold の役割→700 を基本とし、ナビゲーション等の穏やかな強調のみ500にする。これは利用できるフォントと役割の対応方針で、SF と Noto の同一ウェイトを保証する数式ではない。[Google 公式 metadata](https://github.com/google/fonts/blob/main/ofl/notosansjp/METADATA.pb) / [デジタル庁の太さ定義](https://design.digital.go.jp/dads/foundations/typography/)

たとえば「自己紹介」は700、「About」の補助ラベルは500、説明文は400で区別する。600を指定して未読込のウェイトが厳密に再現されることを期待しない。文字の密度に対して必要なのは、まず行高と本文幅の調整であり、記事全体にプロポーショナル字詰めを追加することではない。

## 余白・レイアウトの調査

### HIG の 8pt、マージン、タップ領域

**現行 HIG Layout を「すべて 8pt グリッドに従う規則」と要約するのは不正確。** 現行ページは整列、関連要素のグループ化、safe area、システムの margin guide、文字拡大への適応を説明する。特定の単一グリッドを全 UI に強制する記述は確認できない。[HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout.md)

| 項目 | 原数値 / 指針 | 適用範囲・出典 |
| --- | --- | --- |
| Interface Builder の標準間隔 | 兄弟 view 間 8pt、superview 端との間 20pt | 旧 Auto Layout Guide の例。[Simple Constraints](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/WorkingwithSimpleConstraints.html) |
| iPhone のシステム layout margin | 16〜20pt | コンテナ等で変わるので guide を使う。[container](https://developer.apple.com/documentation/swiftui/contentmarginguide/container) |
| readable content width | 固定数値ではなく現在の文字サイズに応じる。layout margin の外には出ない | 頭を動かさず行を追える一段組のための guide。[readableContentGuide](https://developer.apple.com/documentation/uikit/uiview/readablecontentguide.md) |
| iOS / iPadOS 操作領域（現行） | default 44×44pt、minimum 28×28pt | 現行 HIG は default と minimum を分ける。[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility.md) |
| macOS 操作領域（現行） | default 28×28pt、minimum 20×20pt | マウス操作の原値で、モバイル Web に流用しない。[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility.md) |
| 旧来のタッチ目安 | 少なくとも 44×44pt | Apple Design Tips は今もこの表現。[Design Tips](https://developer.apple.com/design/tips/) |
| コントロール周辺の余白 | bezel あり約12pt、なし約24pt | 操作ミスを減らす目安。全コンテンツの gap ではない。[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility.md) |

「最低44pt」というよくある要約は [Design Tips](https://developer.apple.com/design/tips/) には沿うが、上記の現行 HIG 表の minimum 欄とは一致しない。本サイトでは小さい現行下限へ詰めず、タッチ用ボタンに **44 CSS px 以上**を提案する。これは pt の物理変換ではなく操作の余裕を確保する Web 側の選択。

macOS 専用の現行 Layout 項目には一律の余白数値表はなかった。macOS の spacing を上記の iOS 用の数値で代表させない。古い Apple HIG の Layout Guidelines の公式アーカイブ取得は失敗したため、非公式ミラーにある過去のウィンドウ余白を現行値として採用しない。[現行 Layout / macOS](https://developer.apple.com/design/human-interface-guidelines/layout.md#macOS) / [取得失敗 URL](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AppleHIGuidelines/XHIGLayout/XHIGLayout.html)

### 日本語デザインシステムの spacing 原値

| システム | 基準・公開値 | 注意・出典 |
| --- | --- | --- |
| デジタル庁 | 一般的な基準8 CSS px。例示スケール8 / 24 / 64 CSS px | 絶対値は一意ではなく規則性が重要。例示を全トークン一覧と呼ばない。[Spacing](https://design.digital.go.jp/dads/foundations/spacing/) |
| SmartHR | 基準16px、primitive: 0 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px | 対応 rem: 0 / 0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5 / 2 / 2.5 / 3 / 4。[Spacing](https://smarthr.design/products/design-tokens/spacing/) |

SmartHR のサイズ名付き旧 spacing セマンティックトークンは非推奨。新設計でその名前まで模倣する必要はない。[SmartHR Spacing](https://smarthr.design/products/design-tokens/spacing/)

### Apple Japan のセクション / padding の観測

表の全数値は [homepage.built.css](https://www.apple.com/v/homepage/a/styles/homepage.built.css) の宣言。viewport と高さ条件が別にあるため、単純な一定リズムとは断定しない。

| セレクタ | 条件 | 宣言値 |
| --- | --- | --- |
| `.section` | 基本 | gap:12px、margin-bottom:12px |
| `.tile-wrapper` | 基本 | padding:48px 0 56px |
| 同上 | 幅≤1068px | padding:54px 0 61px |
| 同上 | 幅≤734px | padding:39px 0 43px |
| 同上 | 幅≥1069px、かつ高さ≥776px | padding:56px 0 63px |
| 同上 | 幅735〜1068px、かつ高さ≥734px | padding:61px 0 69px |
| `.section-promo` | 基本 | 左右padding:max(12px, safe-area-inset − 12px) |
| 同上 | 幅≤734px | padding:0 |
| `.section-promo .tile-wrapper` | 幅≥1069px | padding:53px 0 60px |
| 同上 | 幅735〜1068px | padding:44px 0 48px |

Apple の販促ページには光学調整された端数も多い。例: カードの上下余白を機械的に同じにせず、ロゴや文字の見た目に合わせている。ここから「本サイトも Apple の端数をコピーすべき」とは推論しない。規則的なトークンを先に作り、氏名や画像など限られた箇所だけ視覚調整する。[同 CSS](https://www.apple.com/v/homepage/a/styles/homepage.built.css)

### 日本語長文の読みやすい行長と垂直リズム

JLREQ は漢字・仮名を基本的に正方形の文字の外枠でベタ組にし、行長を文字サイズの整数倍で設計する組版を説明する。横組は最大約 **40字**とする目安がある。ただし印刷の基本版面の議論であり、可変幅 Web の必須上限とは区別する。[JLREQ](https://www.w3.org/TR/jlreq/#considerations_in_designing_the_kihonhanmen)

同資料は日本語の行間を文字サイズの **0.5〜1em**程度とし、**35字を超える行長**では1emかそれよりやや狭い行間がよいと説明する。ここでいう行間は CSS `line-height` そのものではなく文字間の空きで、単純な等サイズ文字モデルでは行送りが文字サイズに行間を足した **1.5〜2倍**になる。欧文は行間が **1/3em**程度以下の場合も多いと対比する。これは日本語に広めの行高を選ぶ根拠になるが、Apple の固定倍率規定ではない。[JLREQ](https://www.w3.org/TR/jlreq/#considerations_in_designing_the_kihonhanmen)

以下の **35〜45全角字**は上記の考えを Web 向けに広げた検討範囲であり、範囲全体が Apple / W3C の規定という意味ではない。中央の **40em**を本サイトの初期案にする。数値は「幅 ≈ 字数 × font-size」の計算値（字間ゼロ・全角グリフだけの単純モデル）。[JLREQ の行長設計](https://www.w3.org/TR/jlreq/#considerations_in_designing_the_kihonhanmen)

| 検討行長 | 本文16px | 本文17px | 本文18px |
| --- | --- | --- | --- |
| 35em ≈ 全角35字 | 560px | 595px | 630px |
| 40em ≈ 全角40字 | 640px | 680px | 720px |
| 45em ≈ 全角45字 | 720px | 765px | 810px |

英数字・約物・禁則処理が入ると実字数はずれる。`ch` は欧文数字の幅を基準とするため、日本語の全角字数の代用品にしない。狭い画面で上記の最低字数を強制しない。記事の可読幅とコードブロックの横スクロールも分けて考える。

行高と段落余白も別の機能。Zenn は行高 **1.9**と段落間 **1.5em**を併用する。本文内の改行と話題の区切りを区別できるため、本サイトでも記事だけこの方針を採用する。見出し上は前の節との区切りとして広く、見出し下は続く説明とのまとまりとして狭くする。これを根拠にした具体値は次の提案表に示す。[Zenn index.scss](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss) / [Zenn _content.scss](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) / [デジタル庁 Spacing](https://design.digital.go.jp/dads/foundations/spacing/)

## 推奨トークン案

**以下は本サイト向け提案値であり、HIG の原値ではない。** desktop / mobile は広い画面 / 狭い画面での端点を示す。ブレークポイント自体は既存サイトに合わせて決める。px は設計確認用の基準値で、実装時は利用者の基準文字サイズに追随できる相対単位を検討する。

### Web タイプスケールと HIG 対応

各行の数値の選択根拠は最後の列。weight は利用可能な Noto Sans JP の値だけを使う。行高は CSS の単位なし値、字間は em。

| Token / HIG 対応 | desktop px | mobile px | weight | line-height | letter-spacing | 用途・調整理由 / 根拠 |
| --- | --- | --- | --- | --- | --- | --- |
| `type.largeTitle` / LargeTitle | 36 | 32 | 700 | 1.4 | 0 | About / Works 等のページ見出し。大見出しの日本語対応を優先し、標準見出し群の境界を採用。[デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.title1` / Title1 | 28 | 26 | 700 | 1.5 | 0 | 「制作実績」等の節。HIG の役割を保ち、国内 DS の見出しスケールを使用。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.title2` / Title2 | 24 | 22 | 700 | 1.5 | 0 | 詳細ページの小節。漢字が続いても複数行で窮屈にならない。[デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.title3` / Title3 | 20 | 18 | 700 | 1.5 | 0 | カード名や小見出し。「Remixで制作したポートフォリオ」が折り返す想定。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [SmartHR](https://smarthr.design/products/design-tokens/typography/) |
| `type.headline` / Headline | 17 | 16 | 700 | 1.5 | 0 | 短い強調ラベル・まとまりの先頭。Semibold の役割を読込済み Bold に対応。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.body` / Body | 17 | 16 | 400 | 1.75 | 0 | About の説明や作品説明。HIG の本文から日本語向けに行高を広げる。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.callout` / Callout | 16 | 16 | 400 | 1.75 | 0 | 追加説明・短い導入。画面が狭くても日本語本文を縮小しない。[デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.subheadline` / Subheadline | 16 | 16 | 500 | 1.5 | 0 | ナビ・副見出し。HIG の小さめサイズを採らず、字面と重さで区別。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [SmartHR](https://smarthr.design/products/design-tokens/typography/) |
| `type.footnote` / Footnote | 14 | 14 | 400 | 1.6 | 0 | 公開日・補助説明だけ。日本語用の補足文字下限へ引き上げる。[デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.caption1` / Caption1 | 14 | 14 | 400 | 1.6 | 0 | 画像注釈。Footnote と同じ実値を共有して過剰な階層を作らない。[HIG](https://developer.apple.com/design/human-interface-guidelines/typography.md) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |
| `type.caption2` / Caption2 | 14 | 14 | 500 | 1.6 | 0 | カテゴリ等の短い補足。サイズをさらに下げず、Medium で区別。[HIG macOS の役割](https://developer.apple.com/design/human-interface-guidelines/typography.md#macOS-built-in-text-styles) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/) |

小さい Caption 群を HIG 原値どおりに細分化しないのは、読める文字サイズを保ち、再利用する値を減らすため。例: Works カードは作品名 `title3`、説明 `body`、公開日 `footnote` の組み合わせで十分。HTML の見出しレベルはページ構造で決め、見た目の token と機械的に同一にしない。

### Display / UI / 記事本文の使い分け

次表の数値は提案。役割を分離する根拠は [HIG の長文と tight leading の区別](https://developer.apple.com/design/human-interface-guidelines/typography.md)、[デジタル庁の用途別行高](https://design.digital.go.jp/dads/foundations/typography/)、[Zenn の記事行高](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss)。

| Token | desktop px | mobile px | weight | line-height | letter-spacing | 例・判断 |
| --- | --- | --- | --- | --- | --- | --- |
| `type.heroName` | 96 | 48 | 700 | 1.15 | 0 | 「Koshi Tanaka」の英字氏名。既存の大きな個性を維持するサイト固有案。HIG LargeTitle の別名にしない |
| `type.heroJapanese` | 48 | 32 | 700 | 1.4 | 0 | 日本語の大きなキャッチコピーを追加する場合のみ。英字氏名と同じ行高にしない |
| `type.articleBody` | 18 | 16 | 400 | 1.9 | 0 | Blog / 長文 Works 詳細。行送りは計算上34.2px / 30.4px |
| `type.articleH2` | 28 | 24 | 700 | 1.5 | 0 | 「実装で工夫したこと」等。UI 用の極端に狭い行高を使わない |
| `type.articleH3` | 24 | 20 | 700 | 1.5 | 0 | 節内見出し。前後余白でも階層を区別 |
| `type.articleH4` | 20 | 18 | 700 | 1.5 | 0 | 下位見出し。本文の強調との差を残す |
| `type.uiBody` | 16 | 16 | 400 | 1.5 | 0 | 管理画面の入力・短い説明。記事用の広い行高は持ち込まない |
| `type.eyebrow`（任意） | 14 | 14 | 500 | 1.5 | 0.02 | 「ABOUT」等の短いラベルに限る視覚調整。日本語本文へ継承しない |

`type.eyebrow` の字間 **0.02em** は公式推奨値ではなく任意の試作値。不要なら token 自体を作らず、通常の caption を使う。**0.05em** を本文へ一律付与する案は採らない。字間を広げた場合は長いタイトルの折り返しも再確認する。[ゼロ指定の比較根拠: Apple](https://www.apple.com/v/homepage/a/styles/main.built.css) / [デジタル庁](https://design.digital.go.jp/dads/foundations/typography/)

### spacing scale

すべて本サイト向け提案。小さな primitive は画面幅で変えず、用途を持つ semantic な余白を変える。数値の選択根拠: [SmartHR の primitive](https://smarthr.design/products/design-tokens/spacing/) と [デジタル庁の余白の規則性](https://design.digital.go.jp/dads/foundations/spacing/)。大きい値は同じ刻みを延長したもの。

| Token | desktop px | mobile px | 役割 |
| --- | --- | --- | --- |
| `space.0` | 0 | 0 | 余白なし |
| `space.1` | 4 | 4 | アイコン周辺の微調整 |
| `space.2` | 8 | 8 | ラベル・リスト内の小間隔 |
| `space.3` | 12 | 12 | 補足グループ |
| `space.4` | 16 | 16 | 小グループの分離 |
| `space.5` | 20 | 20 | 狭い画面の左右余白 |
| `space.6` | 24 | 24 | カード・見出しと本文 |
| `space.8` | 32 | 32 | 大きめの内部余白 |
| `space.10` | 40 | 40 | 中規模の区切り |
| `space.12` | 48 | 48 | 節の区切り |
| `space.16` | 64 | 64 | セクション |
| `space.24` | 96 | 96 | 広い画面のセクション |

### レイアウト・記事余白の具体案

下表はすべて提案値。行高をぴったり余白グリッドへ丸めるより、日本語の読みやすさを優先する。根拠は各行に示す。

| Semantic token / 対象 | desktop | mobile | 選択理由・例 / 根拠 |
| --- | --- | --- | --- |
| `layout.pageInset` / 左右padding | 32px | 20px | 画面端から本文を離す。ネイティブの16〜20ptは比較材料、Web の選択は独自。[Apple margin](https://developer.apple.com/documentation/swiftui/contentmarginguide/container) / [SmartHR spacing](https://smarthr.design/products/design-tokens/spacing/) |
| `layout.sectionGap` | 96px | 64px | About→Works→Blog の区切り。関連するカード同士の間隔より明確に大きくする。[デジタル庁 spacing](https://design.digital.go.jp/dads/foundations/spacing/) |
| `layout.cardGap` | 24px | 16px | 同じセクション内の並列関係を維持。[同上](https://design.digital.go.jp/dads/foundations/spacing/) |
| `layout.cardPadding` | 24px | 20px | 長い日本語タイトルにも余裕を確保。[SmartHR spacing](https://smarthr.design/products/design-tokens/spacing/) |
| `layout.cardContentGap` | 12px | 12px | 作品名→説明、説明→メタデータのまとまり。[同上](https://smarthr.design/products/design-tokens/spacing/) |
| `article.maxInlineSize` | 40em（本文18px時720px） | 40em上限かつ利用可能幅100% | 約40全角字の一段組を基準にする。TOC は外に置く。[JLREQ](https://www.w3.org/TR/jlreq/#considerations_in_designing_the_kihonhanmen) / [Apple readable width](https://developer.apple.com/documentation/uikit/uiview/readablecontentguide.md) |
| 記事 h2 margin-block-start / end | 64px / 24px | 48px / 16px | 章の切り替わりを強く、次の段落とは近く。[Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) / [デジタル庁](https://design.digital.go.jp/dads/foundations/spacing/) |
| 記事 h3 margin-block-start / end | 48px / 16px | 40px / 12px | 下位節の切り替わり。章より小さい間隔。[同上](https://design.digital.go.jp/dads/foundations/spacing/) |
| 記事 h4 margin-block-start / end | 32px / 12px | 32px / 12px | 小見出しと説明を近づける。[同上](https://design.digital.go.jp/dads/foundations/spacing/) |
| 連続段落 `p + p` | 1.5em = 27px | 1.5em = 24px | 本文サイズ基準。行高と別に話題の区切りを作る。[Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| 記事 ul / ol の外側 | 上下24px | 上下24px | 普通の段落から区別する。[Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) / [SmartHR spacing](https://smarthr.design/products/design-tokens/spacing/) |
| 記事 li 同士の gap | 8px | 8px | 箇条書き内部は密に。子段落がある場合は別扱い。[Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) / [SmartHR spacing](https://smarthr.design/products/design-tokens/spacing/) |
| 記事リストの行高 / 字下げ | 1.75 / 1.5em | 1.75 / 1.5em | 複数行の項目を読みやすくし、折り返しは本文位置へそろえる。[デジタル庁 typography](https://design.digital.go.jp/dads/foundations/typography/) / [Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss) |
| TOC 項目の内部padding-block | 8px | 8px | 外側gapでなくリンク自身を広げる。[HIG accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility.md) |
| TOC リンクの最小高さ | 44px | 44px | 文字行高だけでは操作領域不足になるのを防ぐ。[Apple Design Tips](https://developer.apple.com/design/tips/) |
| TOC 下位項目の字下げ | 16px | 16px | h2 / h3 の従属関係を整列で示す。[HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout.md) / [SmartHR spacing](https://smarthr.design/products/design-tokens/spacing/) |

垂直リズムの計算例: 記事本文の提案行送りは広い画面で **18 × 1.9 = 34.2px**。h2 上余白 **64px** は約 **1.87行**、下余白 **24px** は約 **0.70行**。狭い画面は **16 × 1.9 = 30.4px**、h2 上 **48px** は約 **1.58行**、下 **16px** は約 **0.53行**。段落間 **1.5em** はどちらも約 **0.79行**。これらは提案表からの計算値で、グリッドに厳密一致させる規則ではない。[行高・段落間の参考: Zenn](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss) / [段落・見出し](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/_content.scss)

具体例: 画面幅 **375px**・左右余白 **20px**なら記事幅は **335px**。本文 **16px**では約 **20.9全角字**。これは横幅に合わせた自然な結果であり、desktop の行長に近づけるため本文を縮小しない。数値は提案値による算術例。[可変幅の指針: HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout.md)

実装時は隣接要素の余白を足し合わせない設計にする。例: h2→p では h2 の下余白だけを使い、通常段落の上余白を重ねない。記事先頭の見出しの上余白は除く。Zenn も先頭要素の上余白を消している。最終的な文字拡大と長い日本語見出しの検証は、実装段階で行う。[Zenn 親スタイル](https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-content-css/src/index.scss)

## 取得制限と未確定事項

- Apple HIG HTML は JavaScript 必須の案内だけを返したため、公式ページが案内する `.md` を取得した。HIG 数表は公式 Markdown の原値を使った。
- SmartHR Spacing は Web 読み取りで一度タイムアウトしたが、HTTP 再取得に成功し表を確認できた。
- 過去の macOS HIG Layout Guidelines 公式アーカイブは取得できなかった。現行 HIG には一律の macOS spacing scale は確認できず、古いミラー値で補完していない。
- Apple Japan の数値は読み込まれる CSS の宣言観測。各商品の DOM・実フォント・computed style 全件の測定ではない。Apple 自社の Web 実装を HIG の必須規定と混同しない。
- Zenn は公式公開 CSS パッケージを確認した。サービス側の本文の絶対サイズ、TOC の実装値はこの資料だけからは確定できない。
- note は最初の候補 URL が404だったが、公式アカウントからリンクされる別記事とその CSS の取得に成功した。古い紹介記事の比率を転記せず、現行 CSS の p への上書きまで確認した。note 全ページの computed style の測定はしていない。
- 本資料は調査と初期値の提案であり、サイトへのコード変更、実機での読みやすさ評価は未実施。
