import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "../contexts/AuthContext";

export default function Works() {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);

    // 既にログインしている場合はadminページにリダイレクト
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/admin");
        }
    }, [isLoggedIn, navigate]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // エラーメッセージをクリア
        if (error) {
            setError(null);
        }
    };

    const handleLogin = () => {
        // 指定された認証情報でチェック
        if (formData.email === "warekoshinari" && formData.password === "tAnAkA-54!") {
            // ログイン成功
            console.log("ログイン成功");
            login(); // AuthContextのlogin関数を呼び出し
            // navigate("/admin"); // AuthContextのuseEffectで自動的にリダイレクトされる
        } else {
            // ログイン失敗
            setError("メールアドレスまたはパスワードが正しくありません");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.login}>
                <h1>Login</h1>
                <div className={styles.loginCard}>
                    <small>Email</small>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ color: "#03031B" }}
                    />
                    <small>Password</small>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ color: "#03031B" }}
                    />
                    {error && (
                        <div style={{
                            color: "#ff6b6b",
                            fontSize: "0.9rem",
                            marginTop: "10px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}
                </div>
                <button onClick={handleLogin} style={{color: "#03031B", background: "#F2F1FF", border: "2px solid #9496AD"}}>ログイン</button>
            </div>
            <Footer />
        </div>
    );
}