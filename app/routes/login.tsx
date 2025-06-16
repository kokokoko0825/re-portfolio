import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";

export default function Works() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.login}>
                <h1>Login</h1>
                <div className={styles.loginCard}>
                    <small>Email</small>
                    <input type="text" placeholder="Email" />
                    <small>Password</small>
                    <input type="password" placeholder="Password" />
                </div>
                <button>ログイン</button>
            </div>
            <Footer />
        </div>
    );
}