# re-portfolio

田中洸志（Koshi Tanaka）のポートフォリオサイト。  
[https://kokokoko0825.dev](https://kokokoko0825.dev)

## 技術スタック

- **フレームワーク**: [Remix](https://remix.run) + [Cloudflare Pages](https://pages.cloudflare.com)
- **スタイル**: [Vanilla Extract](https://vanilla-extract.style)
- **バックエンド**: [Firebase](https://firebase.google.com)（Firestore: ブログ・制作物の管理）

## 主な機能

- トップ / About / ブログ（タグ付き・タグフィルタ） / 制作物（Works）
- 管理画面: ブログ・制作物の作成・編集・削除（要ログイン）

## 開発

```sh
pnpm install
pnpm run dev
```

ビルド後のプレビュー（Wrangler）:

```sh
pnpm run build
pnpm run start
```

## 型生成（Cloudflare bindings）

`wrangler.toml` を変更したあとは以下で型を再生成する:

```sh
pnpm run typegen
```

## デプロイ

```sh
pnpm run build
pnpm run deploy
```

Cloudflare Pages にデプロイされる。

## スクリプト

| コマンド      | 説明           |
|---------------|----------------|
| `pnpm run dev`   | 開発サーバー起動 |
| `pnpm run build` | 本番ビルド     |
| `pnpm run start` | ビルド済みのローカルプレビュー |
| `pnpm run deploy` | Cloudflare Pages へデプロイ |
| `pnpm run typegen` | Wrangler 型生成 |
| `pnpm run lint`   | ESLint |
| `pnpm run typecheck` | TypeScript 型チェック |

## 参考

- [Remix docs](https://remix.run/docs)
- [Remix Cloudflare](https://remix.run/guides/vite#cloudflare)
