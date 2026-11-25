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
import { ThemeProvider } from "./contexts/ThemeContext";
import { getDeviceInfoFromRequest } from "./utils/deviceDetection";

// Vanilla Extract CSSのエントリーポイントをインポート
import "app/styles/globals.css";
import { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getCriticalCss } from "./utils/criticalCss";
import NotFound from "./routes/404";
import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer/Footer";
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
  
  // 初回描画前にdata-themeを設定（localStorage優先、なければデバイスのprefers-color-scheme）
  const themeScript = `
    (function() {
      var saved = localStorage.getItem("theme");
      var theme = (saved === "light" || saved === "dark") ? saved : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    })();
  `;
  
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="emotion-insertion-point" content="" />
        <meta name="google-site-verification" content="LQ31apSdI1TM-XP0eZ0Bdbv7eoBFrndb8pwSpCPhg2c" />
        <Meta />
        {/* 初回描画前にテーマを適用（デバイス設定 or localStorage） */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* 最小限のクリティカルCSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <Links />
        <title>kokokoko0825</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App(): ReactNode {
  const data = useLoaderData<typeof loader>();
  
  return (
    <ThemeProvider>
      <DeviceProvider serverDeviceInfo={data.deviceInfo}>
        <AuthProvider>
          <MenuProvider>
            <Outlet />
          </MenuProvider>
        </AuthProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/images/icon.png", type: "image/png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous" as const,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap",
    },
  ];
};

export const meta: MetaFunction = ({ error }) => {
  if (error) {
    return [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: isRouteErrorResponse(error) && error.status === 404
        ? "404 - ページが見つかりません | kokokoko0825"
        : "エラーが発生しました | kokokoko0825" },
      { name: "robots", content: "noindex, nofollow" },
    ];
  }
  return [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
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
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <ThemeProvider>
      <DeviceProvider serverDeviceInfo={{ isMobile: false, deviceType: "desktop", userAgent: null }}>
        <MenuProvider>
          {notFound ? <NotFound /> : (
            <>
              <Header />
              <main style={{ padding: "6rem 2rem", textAlign: "center" }}>
                <h1>申し訳ございません</h1>
                <p>予期しないエラーが発生しました。</p>
                <a href="/">ホームへ戻る</a>
              </main>
              <Footer />
            </>
          )}
        </MenuProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
