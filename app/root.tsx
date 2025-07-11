import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { MenuProvider } from "./contexts/MenuContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { getDeviceInfoFromRequest } from "./utils/deviceDetection";

// Vanilla Extract CSSのエントリーポイントをインポート
import "app/styles/globals.css";
import { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getCriticalCss } from "./utils/criticalCss";
import NotFound from "./routes/404";
//import Page from "./routes/_index/route";

export async function loader({ request }: LoaderFunctionArgs) {
  const deviceInfo = getDeviceInfoFromRequest(request);
  
  return {
    deviceInfo
  };
}

export function Layout({ children }: { children: React.ReactNode }): ReactNode {
  // クリティカルCSSを取得
  const criticalCss = getCriticalCss();
  
  // デバイス検出スクリプト（インライン版）
  const deviceDetectionScript = `
    // デバイス検出と即時スタイル適用のためのスクリプト
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
  
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="LQ31apSdI1TM-XP0eZ0Bdbv7eoBFrndb8pwSpCPhg2c" />
        <Meta />
        {/* デバイス検出スクリプトを早期に実行 */}
        <script dangerouslySetInnerHTML={{ __html: deviceDetectionScript }} />
        {/* 最小限のクリティカルCSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <Links />
        <title>kokokoko0825</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* 完全版のデバイス検出スクリプトを読み込み */}
        <script src="/scripts/device-detection.js"></script>
      </body>
    </html>
  );
}

export default function App(): ReactNode {
  const data = useLoaderData<typeof loader>();
  
  return (
    <DeviceProvider serverDeviceInfo={data.deviceInfo}>
      <AuthProvider>
        <MenuProvider>
          <Outlet />
        </MenuProvider>
      </AuthProvider>
    </DeviceProvider>
  );
}

export const links: LinksFunction = () => {
  return [
    // デバイス検出スクリプトを早期に読み込む
    {
      rel: "preload",
      href: "/scripts/device-detection.js",
      as: "script"
    },
    { rel: "icon", href: "/images/icon.png", type: "image/png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous" as const,
    },
    {
      href: "https://fonts.googleapis.com/css2?family=DotGothic16&family=Jersey+10&display=swap",
      rel: "stylesheet"
    }
  ];
};

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    { title: "kokokoko0825" },
    { name: "description", content: "Koshi Tanakaのポートフォリオ" },
    { name: "robots", content: "index, unfollow" },
    
    // Open Graph tags
    { property: "og:title", content: "kokokoko0825" },
    { property: "og:description", content: "Koshi Tanakaのポートフォリオ" },
    { property: "og:url", content: "https://kokokoko0825.dev" },
    { property: "og:image", content: "/images/icon.png" },
    { property: "og:image:url", content: "/images/icon.png" },
    { property: "og:image:alt", content: "kokokoko0825" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "kokokoko0825" },
    { property: "og:locale", content: "ja_JP" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "kokokoko0825" },
    { name: "twitter:description", content: "Koshi Tanakaのポートフォリオ" },
    { name: "twitter:image", content: "/images/icon.png" },
    { name: "twitter:image:alt", content: "kokokoko0825" },
    { name: "twitter:site", content: "@kokokoko0825" },
    { name: "twitter:creator", content: "@kokokoko0825" },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  // 404エラーの場合
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>404 - ページが見つかりません | kokokoko0825</title>
          <Meta />
          <Links />
        </head>
        <body>
          <NotFound />
          <Scripts />
        </body>
      </html>
    );
  }

  // その他のエラーの場合
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>エラーが発生しました | kokokoko0825</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>申し訳ございません</h1>
          <p>予期しないエラーが発生しました。</p>
          <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
            ホームへ戻る
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}