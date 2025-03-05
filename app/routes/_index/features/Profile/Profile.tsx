import { ReactNode } from "react";
import * as styles from "./styles.css";

export const Profile = (): ReactNode => {
    return (
        <div id="profile" className={styles.Profile}>
            <div className={styles.subTitleFrame}>
                <div className={styles.subTitle}>Profile</div>
            </div>
            <div className={styles.profileFrame}>
                <div className={styles.icon}></div>
                <div className={styles.aboutMe}>
                    <div className={styles.text}>高専の電子情報工学科でプログラミングを4年間学んできました。<br />
                        Webサイト作成やWebアプリ開発などフロントエンドの開発に興味があります。</div>
                    <div className={styles.link}>
                        <div className={styles.linkItem}>
                            <div className={styles.github}></div>
                            <a href="https://github.com/kokokoko0825" >GitHub</a>
                        </div>
                        <div className={styles.linkItem}>
                            <div className={styles.twitter}></div>
                            <a href="https://twitter.com/kokokoko0825">Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};