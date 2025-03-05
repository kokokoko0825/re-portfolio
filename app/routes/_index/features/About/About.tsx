import { ReactNode } from "react";
import * as styles from "./styles.css";

export function About(): ReactNode {
    return (
        <div className={styles.about}>
            <div className={styles.titleFrame}>
                <div className={styles.title}>about this site</div>
            </div>
            <div className={styles.contentFrame}>
                <div className={styles.text}>ここはKoshiの制作物やスキル、ブログが見れるポートフォリオ。<br></br><br />Koshiを知る旅へ出かけよう!!</div>
            </div>
        </div>
    );
}