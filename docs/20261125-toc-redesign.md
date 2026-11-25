# 目次の可読性とモバイルアコーディオン改善（2026-11-25）

## 問題
元の目次はmuted色にopacity:0.7を重ね、文字コントラストがライト約3.13:1、ダーク約3.81:1だった。枠と背景も本文に近く、現在節が分からなかった。
最初の再設計後も、モバイルは長い目次が最初から開き、ガイド線とsummaryの下線が角を作っていたため、本文を読む前の占有面積が大きかった。

## デスクトップ（769px以上）
42c67a6の表示を維持する。
- 外枠・背景なし、幅220px・sticky、captionの「目次」と2pxのガイド線。
- 非選択文字は全階層tocMuted、400。第1階層はfootnoteの14px、第2階層以降はtocNestedの13px。左余白は12／24／36／48px。
- ラベルと第1階層の文字位置を揃える。現在節はtext色・500・aria-current="location"、2pxのアクセント線がガイド線の上に行高いっぱい重なる。
- IntersectionObserverとscroll／resizeで、120pxを最後に通過した見出しを選ぶ。最初の見出し前は未選択、ページ最下部は末尾選択。記事変更時・アンマウント時にobserverとリスナーを解除。
- Remix Linkのハッシュ遷移と標準の履歴を維持。独自のPOP復元処理は追加していない。
- pointer:fineは最小32px、coarseは最小44px。
- 目次領域（x=900〜1140、y=95〜290）を42c67a6のスクリーンショットと比較し、ライト・ダークともピクセル差分0を確認。

## モバイル（768px以下）のbefore → after
- 初期状態：開いているリスト → 閉じた高さ50pxのボックス（48pxのsummaryと上下1pxの枠）。最初の描画で開いたリストを見せない。
- ガイド線と現在節：左の線・太字・青いバー → 全て非表示。内部の現在節計算とaria-currentは共用するが、見た目は全項目muted色・400へ戻す。
- summary：文字だけ → 「目次 · 4項目」のcaptionと右側20pxのcurrentColor SVGシェブロン。行全体がタップ可能、最小48px、左右16px。
- 区切り線：常時の下線 → 開いたときだけsummaryとリストの間へborderColorの1px線。
- リスト：12／24／36／48pxの余白 → 左16／32／48／64px、右16px。最小行高44px。第2階層以降の13pxは維持。
- ボックス：背景ライト#FFFFFF／ダーク#14162B、borderColorの1px枠・8px角丸は維持。
- シェブロンは開くと180度回転。200msのtransform transitionはprefers-reduced-motion:reduceで無効化。
- summaryに:focus-visibleの2px primary輪郭線（outline-offset:-3px）を定義。Tabでsummaryへ移動し、Enter／Spaceで開閉できる。

## 初期表示とナビゲーション
details・summary・件数をTableOfContentsへまとめ、ルート側の重複した外枠を除去した。
detailsはサーバー・クライアントともopen属性なしで描画する。post-mount effectでmatchMedia("(min-width: 769px)")のときだけ開き、画面幅変更時にも同期する。モバイルを一度開いてから閉じる初期処理は存在しないため、初期リストのフラッシュやSSRとの条件分岐を作らない。
モバイルで通常クリック／キーボード選択したときは、Linkのデフォルト処理より先にdetails.open=falseとする。閉じた後の本文位置でRemixがハッシュ先へスクロールするため、例えば「h3」を選ぶと目次を閉じた状態で見出し上端が約100pxへ着地する。修飾キー付きのリンク操作は変更しない。
現在Works詳細には目次自体がないため、新規設置は対象外。

## コントラスト
ブラウザーのgetComputedStyleで取得した文字色と実背景色をWCAG相対輝度式で計算した。すべて4.5:1以上。
- デスクトップの非選択項目：ライト5.78:1（#5B5D72対#F2F1FF）、ダーク7.14:1（#999999対#03031B）。
- デスクトップの現在節：ライト18.21:1（#03031B対#F2F1FF）、ダーク15.19:1（#DEDBFF対#03031B）。
- モバイルの全項目（現在節を含む）：ライト6.45:1（#5B5D72対#FFFFFF）、ダーク6.25:1（#999999対#14162B）。
- モバイルのsummary文字・アイコン：ライト20.33:1（#03031B対#FFFFFF）、ダーク13.30:1（#DEDBFF対#14162B）。

## 検証
- build削除後、pnpm typecheck、pnpm build、変更4ファイルへのnpx eslintが最終的にすべて終了コード0。既存のBrowserslistデータ更新案内と空のapi.link-preview chunkの警告のみ。
- pnpm dev --port 5351、新規Orcaブラウザーで以下の指定2記事を確認。
  - /blog/NOpv7vIxV3USDYbTlXIf（第1階層4項目）
  - /blog/yiujxNRvA49JDGML0tWM（第1〜4階層4項目）
- 375×812／1280×800 × ライト／ダーク × 2記事の8条件ですべて成功。操作後はスクリーンショットで描画を確定してから判定。
- モバイルは初期状態closed、summaryのEnterで開く／Spaceで閉じる／タップで開く、全4項目の選択後closedと見出しの約100pxへの着地、戻る／進むでハッシュが戻ることを確認。
- デスクトップは初期状態open・summary非表示、全見出しのスクロール追従・全リンククリック・戻る／進むが成功し、ガイド線と現在節のスタイルも維持。
- モバイルのsummaryは48px、リストは44px、字下げ16／32／48／64px、ガイド線0px、現在節400・muted色・バーdisplay:noneをcomputed styleで確認。
- 横はみ出しなし（documentElement.scrollWidth <= innerWidth）。新規タブ2つのconsole errorとhydration警告はいずれも0件、ログのtruncated:false。
- 検証後にdevサーバーを停止し、orca portsで5351の待受なしを確認。
- 詳細記録：/tmp/toc-redesign/mobile/verification.json（リポジトリ外）。
- スクリーンショット例：/tmp/toc-redesign/mobile/hierarchical-375-light-closed.png、hierarchical-375-dark-open.png、hierarchical-1280-light-open.png、hierarchical-1280-dark-open.png。
