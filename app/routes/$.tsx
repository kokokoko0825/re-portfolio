import { json } from "@remix-run/cloudflare";
import NotFound from "./404";

export async function loader() {
  // 404ステータスを明示的に返す
  throw json({ message: "Not Found" }, { status: 404 });
}

// このコンポーネントは実際には呼ばれませんが、
// ErrorBoundaryが404ページを表示します
export default function SplatRoute() {
  return <NotFound />;
} 