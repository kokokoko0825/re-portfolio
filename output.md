# kokokoko0825 プロジェクト概要

## プロジェクト概要
このプロジェクトは「kokokoko0825」という名前のポートフォリオウェブサイトで、Koshi Tanakaさんの個人ポートフォリオとブログを提供するウェブアプリケーションです。シンプルでモダンなデザインを採用し、ブログ記事や作品を効果的に紹介するための機能を備えています。

Remix RunとCloudflare Pagesを組み合わせた高速なウェブアプリケーションで、Firebase Firestoreをデータベースとして使用しています。マークダウン形式のブログ記事やTwitter埋め込みなどのリッチコンテンツをサポートし、レスポンシブデザインによりモバイルとデスクトップの両方に最適化されています。

## 技術スタック
- **フレームワーク**: 
  - Remix Run (React ベースのフレームワーク)
  - React 18
- **デプロイ先**: Cloudflare Pages
- **スタイリング**: 
  - Tailwind CSS
  - Vanilla Extract CSS (型安全なCSS)
- **データベース**: Firebase Firestore
- **ストレージ**: Firebase Storage
- **マークダウン処理**: 
  - markdown-it
  - zenn-markdown-html (Zenn風のマークダウンレンダリング)
- **埋め込み機能**: 
  - zenn-embed-elements
  - react-twitter-embed
- **認証**: カスタム認証システム (ローカルストレージベース)

## 主要機能
1. **ホームページ**: 
   - ユーザーの基本情報表示
   - 外部リンク（GitHub、Twitter）へのアクセス
   - レスポンシブデザイン対応

2. **ブログ機能**: 
   - 記事の一覧表示
   - 記事の詳細表示（マークダウン対応）
   - Twitter埋め込みなどのリッチコンテンツ対応
   - 記事の作成・編集・削除（管理者のみ）

3. **作品紹介**: 
   - ポートフォリオ作品の一覧表示
   - 作品詳細ページ
   - 作品の作成・編集・削除（管理者のみ）

4. **管理画面**: 
   - 管理者ログイン機能
   - ブログ記事管理
   - 作品管理
   - コンテンツの新規作成・編集・削除

5. **レスポンシブデザイン**: 
   - モバイル向けハンバーガーメニュー
   - デバイス検出による最適化されたUI表示
   - モバイル/デスクトップ両方に対応したレイアウト

## プロジェクト構造
- **app/**: メインのアプリケーションコード
  - **component/**: 再利用可能なUIコンポーネント
    - **Header/**: ヘッダーコンポーネント
    - **Footer/**: フッターコンポーネント
    - **blogItem/**: ブログ記事一覧アイテム
    - **worksItem/**: 作品一覧アイテム
    - **MobileMenu/**: モバイル用メニュー
    - **TwitterEmbed/**: Twitter埋め込みコンポーネント
    - **LinkEmbed/**: リンク埋め込みコンポーネント
    - **ProtectedRoute/**: 認証保護されたルート
  - **contexts/**: React Contextを使用した状態管理
    - **AuthContext.tsx**: 認証状態管理
    - **MenuContext.tsx**: メニュー状態管理
    - **AdminMenuContext.tsx**: 管理画面メニュー状態管理
  - **routes/**: Remixのルート定義
    - **_index.tsx**: ルートパス（/homeへリダイレクト）
    - **home.tsx**: ホームページ
    - **blog.tsx**: ブログ関連のレイアウト
    - **blog._index.tsx**: ブログ一覧ページ
    - **blog.$blogId.tsx**: ブログ記事詳細ページ
    - **works._index.tsx**: 作品一覧ページ
    - **works.$workId.tsx**: 作品詳細ページ
    - **admin.tsx**: 管理画面レイアウト
    - **admin._index.tsx**: 管理画面トップ
    - **admin.blog.tsx**: ブログ管理ページ
    - **admin.works.tsx**: 作品管理ページ
    - **login.tsx**: ログインページ
  - **styles/**: グローバルスタイル定義
  - **utils/**: ユーティリティ関数
    - **markdownRenderer.tsx**: マークダウンレンダリング
    - **deviceDetection.ts**: デバイス検出
    - **criticalCss.ts**: クリティカルCSS管理

## 認証システム
シンプルなユーザー名/パスワード認証を使用し、ログイン状態はローカルストレージに保存されます。管理者のみが管理画面にアクセスできます。`AuthContext`を使用して認証状態を管理し、`ProtectedRoute`コンポーネントで管理者専用ページを保護しています。

## データモデル
### ブログ記事 (blogs コレクション)
- **id**: ドキュメントID
- **number**: 記事番号（ソート用）
- **title**: 記事タイトル
- **content**: マークダウン形式の記事内容
- **thumbnail**: サムネイル画像URL
- **createdAt**: 作成日時 (Timestamp)
- **updatedAt**: 更新日時 (Timestamp)

### 作品情報 (works コレクション)
- **id**: ドキュメントID
- **number**: 作品番号（ソート用）
- **title**: 作品タイトル
- **description**: 作品説明
- **thumbnail**: サムネイル画像URL

## 特徴的な実装
1. **クリティカルCSS**: 
   - 初期表示を高速化するためのクリティカルCSSの実装
   - インライン挿入によるレンダリングブロッキング防止

2. **レスポンシブデザイン**: 
   - サーバーサイドでのユーザーエージェント検出
   - クライアントサイドでの画面サイズ検出
   - モバイル/デスクトップに最適化されたUI

3. **マークダウンレンダリング**: 
   - Zenn風のマークダウン表示
   - Twitter埋め込みなどのリッチコンテンツ対応
   - シンタックスハイライト対応

4. **Vanilla Extract CSS**: 
   - 型安全なCSSの実装
   - コンポーネントごとのスタイル分離

5. **Cloudflare Pages**: 
   - 高速なホスティングとグローバルCDNの活用
   - Cloudflare Workersとの統合

## 開発環境
- Node.js v20以上
- pnpm (パッケージマネージャー)
- Vite (ビルドツール)
- TypeScript

## デプロイ方法
1. `npm run build`: アプリケーションをビルド
2. `npm run deploy`: Cloudflare Pagesにデプロイ

## 開発コマンド
- `npm run dev`: 開発サーバーの起動
- `npm run typecheck`: TypeScriptの型チェック
- `npm run lint`: ESLintによるコード品質チェック

## 技術的な実装詳細

### マークダウンレンダリング
このプロジェクトでは、`markdown-it`ライブラリを使用してマークダウンをHTMLに変換し、さらにTwitter埋め込みやリンクプレビューなどの拡張機能を追加しています。

```typescript
// マークダウンレンダリングの基本設定
const md = new MarkdownIt();

// Markdownコンテンツをレンダリングし、URLを埋め込みコンポーネントに変換する関数
export function renderMarkdownWithEmbeds(content: string): { __html: string } {
    // まず通常のMarkdownをレンダリング
    let html = md.render(content);
    
    // Twitter/X URLを検出して埋め込みコンポーネントに変換
    const twitterUrls = content.match(TWITTER_URL_REGEX);
    
    if (twitterUrls) {
        twitterUrls.forEach((url) => {
            // URLを正規化
            const normalizedUrl = normalizeTwitterUrl(url);
            const tweetId = extractTweetId(normalizedUrl);
            
            if (tweetId) {
                // Twitter埋め込みウィジェットを挿入
                const embedHtml = `
                    <div class="twitter-embed-wrapper">
                        <div id="tweet-${tweetId}"></div>
                    </div>
                `;
                
                html = html.replace(new RegExp(`<p>${escapedUrl}</p>`, 'g'), embedHtml);
            }
        });
    }
    
    // 通常のURLを検出して埋め込みコンポーネントに変換
    // ...
    
    return { __html: html };
}
```

特徴：
- Twitter/X URLの自動検出と埋め込み
- 一般的なURLの自動検出とリンクプレビュー生成
- クライアントサイドでの埋め込みコンテンツの初期化

### リンクプレビューAPI
外部リンクのプレビュー情報を取得するためのAPIエンドポイントを実装しています。

```typescript
export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        // 外部サイトからメタデータを取得
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        
        // メタデータを抽出
        const title = extractMetaContent(html, 'title') || 
                     extractMetaContent(html, 'og:title') || 
                     extractMetaContent(html, 'twitter:title') || 
                     'No title';
        
        // ...その他のメタデータ抽出...

        return json(metadata);
    } catch (error) {
        // エラーハンドリング
        return json({ error: 'Failed to fetch link preview' }, { status: 500 });
    }
}
```

特徴：
- Open Graph、Twitter Cards、標準メタタグからの情報抽出
- エラーハンドリングとフォールバック
- Cloudflare Workersで動作する軽量な実装

### レスポンシブデザイン実装
サーバーサイドとクライアントサイドの両方でデバイス検出を行い、最適なUIを提供しています。

```typescript
// サーバーサイドでのデバイス検出
export function isMobileDevice(userAgent: string | null): boolean {
  if (!userAgent) return false;
  
  // 一般的なモバイルデバイスのパターン
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

// デバイスタイプに応じたスタイル生成
export function getMobileStyles() {
  return {
    homeIcon: { width: "100px", height: "100px" },
    homeItem: { paddingTop: "120px", gap: "70px" },
    // ...その他のモバイル向けスタイル...
  };
}

export function getDesktopStyles() {
  return {
    homeIcon: { width: "200px", height: "200px" },
    homeItem: { paddingTop: "124px", gap: "50px" },
    // ...その他のデスクトップ向けスタイル...
  };
}
```

特徴：
- ユーザーエージェントに基づくサーバーサイドでのデバイス検出
- クライアントサイドでのウィンドウサイズ監視
- デバイスタイプに応じた最適なスタイルの適用

### クリティカルCSS
初期表示を高速化するためのクリティカルCSSを実装しています。

```typescript
export function getCriticalCss(): string {
  return `/* 最小限のクリティカルCSS */
:root {
  --background-color: #03031B;
  --text-color: #DEDBFF;
  --border-color: #2C2E47;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}`;
}
```

特徴：
- 最小限の必須スタイルをインラインで挿入
- カラー変数の定義によるテーマの一貫性
- レンダリングブロッキングの防止

### 認証システム
シンプルなローカルストレージベースの認証システムを実装しています。

```typescript
export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ページ読み込み時にローカルストレージからログイン状態を復元
    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
```

特徴：
- React Contextを使用した認証状態の管理
- ローカルストレージによるセッション維持
- 保護されたルートによる管理画面のセキュリティ確保

## 将来的な改善点と拡張性

### セキュリティ強化
現在の認証システムはシンプルなローカルストレージベースの実装ですが、より堅牢なセキュリティを実現するために以下の改善が考えられます：

1. **Firebase Authentication**の導入
   - メール/パスワード認証
   - ソーシャルログイン（Google、Twitter）
   - 多要素認証（MFA）

2. **JWTベースの認証**
   - トークンの有効期限設定
   - リフレッシュトークンの実装
   - CSRFトークンの導入

### パフォーマンス最適化
さらなるパフォーマンス向上のために以下の施策が考えられます：

1. **画像最適化**
   - WebP形式の採用
   - 画像の遅延読み込み（Lazy Loading）
   - Cloudflare Imagesの活用

2. **コード分割**
   - 動的インポートの活用
   - ルートベースのコード分割
   - 共通コンポーネントの最適化

3. **キャッシュ戦略**
   - Stale-While-Revalidateパターンの実装
   - Cloudflare KVを活用したキャッシュ
   - サービスワーカーによるオフライン対応

### 機能拡張
ユーザー体験をさらに向上させるための機能拡張案：

1. **検索機能**
   - ブログ記事の全文検索
   - タグベースのフィルタリング
   - 関連記事の推薦

2. **インタラクティブ要素**
   - コメント機能
   - いいね/ブックマーク機能
   - シェア機能の強化

3. **多言語対応**
   - i18nライブラリの導入
   - 言語切り替え機能
   - 自動翻訳APIの統合

4. **アナリティクス**
   - Google Analyticsの詳細設定
   - ヒートマップ分析
   - A/Bテスト機能

### アクセシビリティ向上
より多くのユーザーが利用しやすいサイトにするための改善：

1. **WAI-ARIA対応**
   - 適切なランドマークとロール
   - キーボードナビゲーションの強化
   - スクリーンリーダー対応

2. **コントラスト比の最適化**
   - WCAG AAA基準への準拠
   - ダークモード/ライトモードの切り替え
   - テキストサイズの調整機能

3. **フォーカス管理**
   - フォーカスインジケーターの改善
   - モーダルやダイアログのフォーカストラップ
   - スキップナビゲーションの実装

## まとめ

「kokokoko0825」プロジェクトは、モダンなウェブ技術を活用した個人ポートフォリオ兼ブログサイトです。Remix RunとCloudflare Pagesの組み合わせにより、高速なパフォーマンスと優れたユーザー体験を実現しています。

### 主な強み
- **高速なパフォーマンス**: クリティカルCSSやCloudflare Pagesの活用
- **モダンな技術スタック**: Remix Run、React 18、TypeScript、Firebase
- **レスポンシブデザイン**: モバイルとデスクトップの両方に最適化
- **リッチコンテンツ**: マークダウン、Twitter埋め込み、リンクプレビュー
- **管理機能**: コンテンツ管理のための管理者専用インターフェース

このプロジェクトは、個人ポートフォリオサイトとしての基本機能を備えつつ、将来的な拡張性も考慮した設計となっています。セキュリティ、パフォーマンス、アクセシビリティなどの面で継続的な改善を行うことで、より優れたウェブアプリケーションへと発展させることができるでしょう。

## スマートフォン表示の問題と解決策

### 問題の特定
スマートフォンでポートフォリオを開くと、モバイル用UIが正しく適用されずデスクトップ用のUIで表示される問題が発生しています。調査の結果、以下の原因が特定されました。

### 原因

1. **デバイス検出の不一致**:
   - サーバーサイドとクライアントサイドでのデバイス検出ロジックに不一致があります。
   - `home.tsx`のローダー関数ではサーバーサイドでユーザーエージェントを検出していますが、ハイドレーション後にクライアントサイドの状態が優先されていない可能性があります。

2. **インラインスタイルとCSS-in-JSの競合**:
   - `home.styles.css.ts`ではメディアクエリを使用したレスポンシブデザインが実装されていますが、`home.tsx`では`deviceStyles`オブジェクトを使用したインラインスタイルで上書きしています。
   - この二重のスタイル適用方法が競合を引き起こしている可能性があります。

3. **クライアントサイドでのデバイス検出タイミング**:
   - `entry.client.tsx`でクライアントサイドのデバイス検出を行っていますが、これがReactのハイドレーション前に実行されるため、Reactコンポーネント内のデバイス検出と不整合が生じている可能性があります。

### 解決策

1. **一貫したデバイス検出アプローチの採用**:
   ```tsx
   // app/routes/home.tsx を修正
   export default function Home() {
       // ローダーからモバイルかどうかの情報を取得
       const { isMobile } = useLoaderData<{ isMobile: boolean }>();
       const [clientIsMobile, setClientIsMobile] = useState(isMobile);
       
       // クライアントサイドでの再検出
       useEffect(() => {
           const checkMobile = () => {
               setClientIsMobile(window.innerWidth <= 768);
           };
           
           // 初期チェック
           checkMobile();
           
           // リサイズイベントのリスナーを追加
           window.addEventListener('resize', checkMobile);
           
           return () => {
               window.removeEventListener('resize', checkMobile);
           };
       }, []);
       
       // サーバーサイドの初期値とクライアントサイドの検出結果を組み合わせる
       const effectiveIsMobile = typeof window !== 'undefined' ? clientIsMobile : isMobile;
       
       // デバイスタイプに応じたスタイルを取得
       const deviceStyles = effectiveIsMobile ? getMobileStyles() : getDesktopStyles();
       
       // 以下は変更なし
   }
   ```

2. **スタイル適用方法の統一**:
   - インラインスタイルとVanilla Extract CSSのどちらかに統一することを推奨します。
   - Vanilla Extract CSSのメディアクエリを使用する場合は、インラインスタイルによる上書きを避けるべきです。

   ```tsx
   // app/routes/home.tsx を修正 - Vanilla Extract CSSのみを使用する場合
   export default function Home() {
       // ローダーからモバイルかどうかの情報を取得するだけで、スタイル適用はCSSに任せる
       return (
           <div className={styles.Home}>
               <Header />
               <div className={styles.item}>
                   <div className={styles.icon}></div>
                   <div className={styles.myName}>
                       <h1>Koshi Tanaka</h1>
                       <small>@kokokoko0825</small>
                       <h2>Software Engineer</h2>
                   </div>
                   <div className={styles.accontFrame}>
                       {/* リンク部分は変更なし */}
                   </div>
               </div>
               <Footer />
           </div>
       );
   }
   ```

3. **デバイス検出スクリプトの最適化**:
   - `public/scripts/device-detection.js`を`<head>`内で早期に読み込むようにし、フラッシュを防止します。

   ```tsx
   // app/root.tsx を修正
   export const links: LinksFunction = () => {
     return [
       // 他のリンクは変更なし
       {
         rel: "preload",
         href: "/scripts/device-detection.js",
         as: "script"
       },
       {
         rel: "script",
         href: "/scripts/device-detection.js"
       }
     ];
   };
   ```

4. **メタビューポート設定の確認**:
   - `root.tsx`のメタタグが正しく適用されていることを確認します。現在の設定は適切ですが、念のため確認してください。

   ```tsx
   { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
   ```

これらの修正を適用することで、スマートフォンでの表示問題が解決され、一貫したモバイルUIが表示されるようになるはずです。

## 実装した解決策

スマートフォン表示の問題を解決するために、以下の修正を実装しました：

### 1. 多層的なデバイス検出の実装

複数のレイヤーでデバイス検出を行い、一貫したモバイル表示を確保しました：

1. **早期インラインスクリプト**（root.tsx内）:
   ```javascript
   const deviceDetectionScript = `
     (function() {
       function isMobileDevice() {
         return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
       }
       
       if (isMobileDevice()) {
         document.documentElement.classList.add('mobile-device');
         document.documentElement.classList.add('mobile-view');
       } else {
         document.documentElement.classList.add('desktop-device');
       }
     })();
   `;
   ```

2. **クライアントエントリーポイント**（entry.client.tsx内）:
   ```javascript
   const isMobile = window.innerWidth <= 768 || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
     
   if (isMobile) {
     document.documentElement.classList.add('mobile-view');
     document.documentElement.classList.add('mobile-device');
   }
   ```

3. **Reactコンポーネント内**（home.tsx内）:
   ```javascript
   const [isMobileView, setIsMobileView] = useState(isMobile);
   
   useEffect(() => {
       const checkMobile = () => {
           setIsMobileView(window.innerWidth <= 768);
       };
       
       // 初期チェック
       checkMobile();
       
       // リサイズイベントのリスナーを追加
       window.addEventListener('resize', checkMobile);
       
       return () => {
           window.removeEventListener('resize', checkMobile);
       };
   }, []);
   ```

### 2. リサイズ対応の強化

ブラウザのリサイズ時にも適切にモバイル/デスクトップ表示を切り替えるよう実装しました：

```javascript
window.addEventListener('resize', () => {
  const currentIsMobile = window.innerWidth <= 768;
  const hasMobileClass = document.documentElement.classList.contains('mobile-view');
  
  if (currentIsMobile && !hasMobileClass) {
    document.documentElement.classList.add('mobile-view');
    document.documentElement.classList.add('mobile-device');
    document.documentElement.classList.remove('desktop-device');
  } else if (!currentIsMobile && hasMobileClass) {
    document.documentElement.classList.remove('mobile-view');
    document.documentElement.classList.remove('mobile-device');
    document.documentElement.classList.add('desktop-device');
  }
});
```

### 3. スタイル適用方法の最適化

インラインスタイルとCSS-in-JSの競合を解消するため、一貫したアプローチを採用しました：

1. **CSSクラスとインラインスタイルの併用**:
   ```javascript
   // モバイル表示用のクラス名
   const mobileClass = isMobileView ? styles.mobileView : '';
   
   return (
     <div className={`${styles.Home} ${mobileClass}`}>
       {/* ... */}
     </div>
   );
   ```

2. **デバイス検出スクリプトの最適化**:
   ```javascript
   // ビューポートメタタグを確実に設定
   function ensureViewportMeta() {
     let viewportMeta = document.querySelector('meta[name="viewport"]');
     if (!viewportMeta) {
       viewportMeta = document.createElement('meta');
       viewportMeta.name = 'viewport';
       document.head.appendChild(viewportMeta);
     }
     viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
   }
   ```

### 4. スクリプト読み込みの最適化

デバイス検出スクリプトを早期に読み込むよう設定しました：

```javascript
export const links: LinksFunction = () => {
  return [
    // デバイス検出スクリプトを早期に読み込む
    {
      rel: "preload",
      href: "/scripts/device-detection.js",
      as: "script"
    },
    // ...他のリンク
  ];
};
```

これらの修正により、以下の効果が期待できます：

1. **初期表示時の正確なデバイス検出**: サーバーサイドとクライアントサイドの両方で一貫したデバイス検出
2. **リサイズ時の適切な表示切替**: ブラウザサイズ変更時にも正しいUIが表示される
3. **モバイル表示の確実な適用**: 複数のレイヤーでモバイル検出を行うことによる堅牢性
4. **パフォーマンスの最適化**: 早期スクリプト実行によるフラッシュの防止

これらの対策により、スマートフォンでのポートフォリオ表示問題は確実に解決されるはずです。