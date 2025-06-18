import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext";

import "app/styles/globals.css";
import { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
//import Page from "./routes/_index/route";


export function Layout({ children }: { children: React.ReactNode }): ReactNode {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="brDkeRhoxktrjCiqqUefNlNyOKLGHk0Cik9q9MzLv2E" />
        <Meta />
        <Links />
        <title>Koshi Quest(仮)</title>
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
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
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
    { title: "Koshi Quest" },
    { rel: "icon", href: "/images/account_icon_v2.jpg" },
    { name: "description", content: "エンジニアkokokoko0825のポートフォリオ" },
    { name: "robots", content: "index, follow" },
    { name: "og:title", content: "Koshi Quest" },
    { name: "og:description", content: "エンジニアkokokoko0825のポートフォリオ" },
    { name: "og:url", content: "https://kokokoko0825.pages.dev" },
    { name: "og:image", content: "https://kokokoko0825.pages.dev/ogp.png" },
    {
      property: "og:image:url",
      content: "https://kokokoko0825.pages.dev/ogp.png",
    },
    { property: "og:image:alt", content: "Koshi Quest" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Koshi Quest" },
    { name: "twitter:description", content: "エンジニアkokokoko0825のポートフォリオ" },
    {
      name: "twitter:image",
      content: "https://kokokoko0825.pages.dev/ogp.png",
    },
    { name: "twitter:image:alt", content: "Koshi Quest" },
  ];
};