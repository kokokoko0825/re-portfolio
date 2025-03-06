import { ReactNode } from "react";
import * as styles from "./styles.css";

export function About(): ReactNode {
    return (
        <div className={styles.about}>
            <div className={styles.titleFrame}>
                <div className={styles.title}>about this site</div>
            </div>
            <div className={styles.contentFrame}>
                <div className={styles.text}>ここはKoshiの制作物やスキル、ブログが見れるポートフォリオです。<br></br><br />まだまだ発展途上ですが、ぜひ楽しんで見ていってください。</div>
            </div>
        </div>
    );
}