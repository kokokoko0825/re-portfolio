import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export default function BlogId() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.blogId}>
                <small>投稿日: 2025-00-00,  編集日: 2025-00-00</small>
                <div className={styles.thumbnail}>
                    <img src="/public/images/icon.jpg" alt="thumbnail" />
                    <h1>Work Title</h1>
                </div>
                <div className={styles.textFrame}>
                    <p> #test post<br />
                    初めてのポストです。<br />
                    何が使えるかなどの確認を行います。<br />
                    <br />
                    ## Markdown記法の確認<br />
                    - 黒チョボ出せるか<br />
                    1. 箇条書き数字ver<br />
                    2. 2個目の反応もあり<br />
                    <br />
                    **太字**太字の確認<br />
                    ~~ italic ~~ 文字の確認<br />
                    <br />
                    ### 折り返すかの確認<br />
                    ああああああああああああああああああああああああああああああああああああ<br />
                    <br />
                    ##このブログサイトの仕様<br />
                    Markdown形式で書くzennみたいな感じがいいかも<br />
                    ブログにはTwitterとか他の人のブログとかを埋め込めるようにしたい。</p>
                </div>
                <div className={styles.backFrame}>
                    <Link to="/works">
                        <small>Back</small>
                    </Link>
            </div>
            </div>
            <Footer />
        </div>
    );
}