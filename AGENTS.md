# AI Agent Instructions

## 1. プロジェクトコンテキスト

- **プロジェクト概要**: kokokoko0825のポートフォリオサイト
- **ドメイン知識**: ビジネスロジックや機能要件の詳細は `README.md` を参照すること。

## 2. 使用技術

- **Package Manager**: pnpm
- **Language**: TypeScript (Strict mode)
- **Framework**: Remix
- **Styling**: Vanilla Extract
- **Deployment/Infrastructure**: Cloudflare Pages
- **DataBase**: Firebase

## 3. Architecture & Directory Rules

- **制約**: UIコンポーネント内で直接データベースアクセスを行わないこと。

## 4. Project-Specific Coding Conventions

- **Security**: セキュリティに対して意識し、脆弱性が発生しないコードを書く
- 冗長なプログラムは作成せず、再利用可能な最小のコンポーネントを`app/component`に作成する

## 5. Key Commands

Agentがタスクを実行・検証する際に使用するコマンド群。

- Install: `pnpm install`
- Dev Server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Type Check: `pnpm typecheck`
