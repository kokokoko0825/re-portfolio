import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";

export default function About() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.about}>
                <div className={styles.section}>
                    <h1>About me</h1>
                    <div className={styles.list}>
                        <p>高専4年目でプログラミングの楽しさに目覚めたWebエンジニアです。</p>
                        <p>Web以外にはUI/UXなどのデザインやAI活用に興味を持っています。</p>
                        <p>将来はフルスタックのエンジニアを目指しています。</p>
                        <p>小さい頃から嵐、Hey!Say!JUMPなど男性アイドルを好んで聞いています。</p>
                        <p>アイドル以外ではヤバイTシャツ屋さんをよく聞いています。</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Career</h1>
                    <div className={styles.list}>
                        <p>2026 - 現在  株式会社セゾンテクノロジー</p>
                        <p>2021 - 2026  鈴鹿高専 電子情報工学科</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <h1>Skills</h1>
                    <ul>
                        <li>TypeScript</li>
                        <li>C++</li>
                        <li>Python</li>
                        <li>Remix</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
