import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Koshi Tanakaについて" },
        { name: "og:title", content: "About | kokokoko0825" },
        { name: "og:description", content: "Koshi Tanakaについて" },
        { name: "og:url", content: "https://kokokoko0825.dev/about" },
        { name: "og:image", content: "/images/icon.png" },
        { name: "og:image:url", content: "/images/icon.png" },
        { name: "og:image:alt", content: "kokokoko0825" },
        { name: "og:type", content: "website" },
        { name: "og:site_name", content: "kokokoko0825" },
        { name: "robots", content: "noindex, nofollow" },
    ];
};

export default function About() {
    return (
        <div className={styles.frame}>
            <Header />
            <main className={styles.about}>
                <div className={styles.section}>
                    <h1>About me</h1>
                    <div className={styles.list}>
                        <p className={styles.careerText}>高専4年目でプログラミングの楽しさに目覚めたWebエンジニアです。</p>
                        <p className={styles.careerText}>Web以外にはUIデザインやAI活用に興味を持っています。</p>
                        <p className={styles.careerText}>将来はフルスタックのエンジニアを目指しています。</p>
                        <p className={styles.careerText}>お仕事の依頼は<a href="mailto:me@kokokoko0825.dev" className={styles.linkUnderline}>こちら</a>からお願いします。</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <ul>
                        <li className={styles.careerText}>TypeScript</li>
                        <li className={styles.careerText}>C++</li>
                        <li className={styles.careerText}>Python</li>
                        <li className={styles.careerText}>Remix</li>
                        <li className={styles.careerText}>Figma</li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Career</h2>
                    <ul className={styles.timeline}>
                        {/*
                        <li className={styles.timelineItem}>
                            <small className={styles.timelineYear}>2026 - 現在</small>
                            <h3 className={styles.timelineTitle}>株式会社セゾンテクノロジー</h3>
                        </li>
                        */}
                        <li className={styles.timelineItem}>
                            <small className={styles.timelineYear}>2021 - 2026</small>
                            <h3 className={styles.timelineTitle}>鈴鹿高専 電子情報工学科</h3>
                        </li>
                        <li className={styles.timelineItem}>
                            <small className={styles.timelineYear}>2005</small>
                            <h3 className={styles.timelineTitle}>爆誕</h3>
                        </li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Favorite</h2>
                    <h3 className={styles.subsectionTitle}>Technology</h3>
                    <div className={styles.list}>
                        <ul>
                            <li className={styles.careerText}>UI design</li>
                            <li className={styles.careerText}>Vibe Coding</li>
                            <li className={styles.careerText}>Web Application</li>
                        </ul>
                    </div>
                    <h3 className={styles.subsectionTitle}>Person</h3>
                    <div className={styles.list}>
                        <ul>
                            <li className={styles.careerText}>大野智 (嵐)</li>
                            <li className={styles.careerText}>八乙女光 (Hay! Say! JUMP)</li>
                            <li className={styles.careerText}>ヤバイTシャツ屋さん</li>
                            <li className={styles.careerText}>遠藤さくら (乃木坂46)</li>
                            <li className={styles.careerText}>谷口愛季 (櫻坂46)</li>
                            <li className={styles.careerText}>環やね (きゅるりんってしてみて)</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
