import { LoaderFunction, redirect } from "@remix-run/cloudflare";

// ルートパス（/）にアクセスした場合、/homeにリダイレクト
export const loader: LoaderFunction = () => {
  return redirect("/home");
};

// このコンポーネントは実際には表示されない（リダイレクトされるため）
export default function Index() {
  return null;
}