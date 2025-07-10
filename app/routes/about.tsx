import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Koshi Tanakaについて" },
    { name: "og:title", content: "About | kokokoko0825"},
    { name: "og:description", content: "Koshi Tanakaについて"},
    { name: "og:url", content: "https://kokokoko0825.dev/about"},
    { name: "og:image", content: "/images/icon.png"},
    { name: "og:image:url", content: "/images/icon.png"},
    { name: "og:image:alt", content: "kokokoko0825"},
    { name: "og:type", content: "website"},
    { name: "og:site_name", content: "kokokoko0825"},
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function About() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.about}>
                <div className={styles.section}>
                    <h1>About me</h1>
                    <div className={styles.list}>
                        <p className={styles.careerText}>高専4年目でプログラミングの楽しさに目覚めたWebエンジニアです。</p>
                        <p className={styles.careerText}>Web以外にはUI/UXなどのデザインやAI活用に興味を持っています。</p>
                        <p className={styles.careerText}>将来はフルスタックのエンジニアを目指しています。</p>
                        <p className={styles.careerText}>小さい頃から嵐、Hey!Say!JUMPなど男性アイドルを好んで聞いています。</p>
                        <p className={styles.careerText}>アイドル以外ではヤバイTシャツ屋さんをよく聞いています。</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Career</h1>
                    <div className={styles.list}>
                        {/*
                        <p>2026 - 現在  株式会社セゾンテクノロジー</p>
                        */}
                        <p className={styles.careerText}>2021 - 2026  鈴鹿高専 電子情報工学科</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Skills</h1>
                    <ul>
                        <li>TypeScript</li>
                        <li>C++</li>
                        <li>Python</li>
                        <li>Remix</li>
                        <li>Figma</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
