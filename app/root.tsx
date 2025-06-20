import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { MenuProvider } from "./contexts/MenuContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { getDeviceInfoFromRequest } from "./utils/deviceDetection";

import "app/styles/globals.css";
import { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
//import Page from "./routes/_index/route";

export async function loader({ request }: LoaderFunctionArgs) {
  // サーバーサイドでデバイス情報を取得
  const deviceInfo = getDeviceInfoFromRequest(request);
  
  return {
    deviceInfo
  };
}

export function Layout({ children }: { children: React.ReactNode }): ReactNode {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="brDkeRhoxktrjCiqqUefNlNyOKLGHk0Cik9q9MzLv2E" />
        <Meta />
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
  const { deviceInfo } = useLoaderData<typeof loader>();
  
  return (
    <DeviceProvider serverDeviceInfo={deviceInfo}>
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
    { rel: "icon", href: "/images/account_icon_v2.jpg", type: "image/jpg" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=DotGothic16&family=Jersey+10&display=swap",
      rel: "stylesheet"
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "kokokoko0825" },
    { rel: "icon", href: "/images/icon.jpg" },
    { name: "description", content: "Koshi Tanakaのポートフォリオ" },
    { name: "robots", content: "index, follow" },
    { name: "og:title", content: "kokokoko0825" },
    { name: "og:description", content: "Koshi Tanakaのポートフォリオ" },
    { name: "og:url", content: "https://kokokoko0825.pages.dev" },
    { name: "og:image", content: "https://kokokoko0825.pages.dev/ogp.png" },
    {
      property: "og:image:url",
      content: "https://kokokoko0825.pages.dev/ogp.png",
    },
    { property: "og:image:alt", content: "kokokoko0825" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "kokokoko0825" },
    { name: "twitter:description", content: "Koshi Tanakaのポートフォリオ" },
    {
      name: "twitter:image",
      content: "https://kokokoko0825.pages.dev/ogp.png",
    },
    { name: "twitter:image:alt", content: "kokokoko0825" },
  ];
};