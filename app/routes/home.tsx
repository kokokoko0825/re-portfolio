import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./home.styles.css";
import { useDevice } from "../contexts/DeviceContext";

export const meta: MetaFunction = () => {
    return [
        { title: "kokokoko0825" },
        { name: "description", content: "Koshi Tanakaのポートフォリオ" },
        // ビューポートの設定を明示的に追加
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    ];
};

export default function Home() {
    // DeviceContextからモバイルかどうかの情報を取得
    const { isMobile } = useDevice();
    
    // モバイル表示用のクラス名
    const mobileClass = isMobile ? styles.mobileView : '';
    
    return (
        <div className={`${styles.Home} ${mobileClass}`}>
            <Header />
            <div className={styles.item}>
                <div className={styles.icon}></div>
                <div className={styles.myName}>
                    <h1>Koshi Tanaka</h1>
                    <small>@kokokoko0825</small>
                    <h2>Software Engineer</h2>
                </div>
                <div className={styles.accontFrame}>
                    <Link to="https://github.com/kokokoko0825">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5103 0.5C5.59245 0.5 0 6.22914 0 13.3169C0 18.9825 3.58327 23.7783 8.55422 25.4757C9.17572 25.6033 9.40337 25.1999 9.40337 24.8606C9.40337 24.5634 9.38288 23.545 9.38288 22.4838C5.90281 23.2478 5.17812 20.9559 5.17812 20.9559C4.61885 19.4705 3.79018 19.0887 3.79018 19.0887C2.65116 18.3036 3.87315 18.3036 3.87315 18.3036C5.13663 18.3885 5.79961 19.6192 5.79961 19.6192C6.9179 21.5713 8.7199 21.0197 9.44486 20.6801C9.54831 19.8525 9.87993 19.2796 10.232 18.9614C7.45642 18.6642 4.53613 17.5609 4.53613 12.6377C4.53613 11.2372 5.03292 10.0914 5.8201 9.20022C5.6959 8.882 5.26083 7.56612 5.94455 5.80493C5.94455 5.80493 7.00086 5.46534 9.38263 7.12055C10.4023 6.83999 11.454 6.69727 12.5103 6.69607C13.5667 6.69607 14.6435 6.84477 15.6378 7.12055C18.0198 5.46534 19.0761 5.80493 19.0761 5.80493C19.7599 7.56612 19.3245 8.882 19.2003 9.20022C20.0083 10.0914 20.4846 11.2372 20.4846 12.6377C20.4846 17.5609 17.5643 18.6429 14.7679 18.9614C15.2237 19.3645 15.6171 20.1283 15.6171 21.3379C15.6171 23.0567 15.5966 24.4361 15.5966 24.8603C15.5966 25.1999 15.8245 25.6033 16.4457 25.4759C21.4167 23.778 24.9999 18.9825 24.9999 13.3169C25.0204 6.22914 19.4075 0.5 12.5103 0.5Z" fill="white"/>
                        </svg>
                    </Link>
                    <Link to="https://x.com/kokokoko0825">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                            <path d="M14.8784 11.0092L24.1852 0H21.9798L13.8987 9.55916L7.44433 0H0L9.76025 14.4551L0 26H2.20554L10.7394 15.9052L17.5557 26H25L14.8784 11.0092ZM11.8576 14.5825L10.8687 13.1431L3.00023 1.68958H6.38781L12.7378 10.9329L13.7267 12.3723L21.9808 24.3873H18.5933L11.8576 14.5825Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}