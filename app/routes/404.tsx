import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "404 - ページが見つかりません | kokokoko0825" },
    { name: "description", content: "お探しのページは見つかりませんでした。" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function NotFound() {
    return (
        <div className={styles.frame}>
            <Header />
            <main className={styles.blog}>
                <h1>404</h1>
                <p>ページが見つかりません</p>
                <Link to="/" className={styles.linkText}>ホームへ戻る</Link>
            </main>
            <Footer />
        </div>
    );
}
