import { typeStyle, space } from "~/styles/tokens";
import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "../contexts/AuthContext";
import { vars } from "../styles/theme.css";

export default function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, loading, login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    // 既にログインしている場合はadminページにリダイレクト
    useEffect(() => {
        if (!loading && isLoggedIn) {
            navigate("/admin");
        }
    }, [isLoggedIn, loading, navigate]);

    const handleGoogleLogin = async () => {
        setError(null);
        setIsSigningIn(true);
        try {
            await login();
        } catch (err: unknown) {
            if (err instanceof Error && err.message === "unauthorized") {
                setError("このアカウントにはログイン権限がありません。");
            } else if (!(err instanceof Error && "code" in err && err.code === "auth/popup-closed-by-user")) {
                setError("ログインに失敗しました。もう一度お試しください。");
            }
        } finally {
            setIsSigningIn(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.frame}>
                <Header />
                <div className={styles.login}>
                    <div style={{ color: vars.color.text, textAlign: "center", padding: space[20] }}>
                        読み込み中...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.login}>
                <h1>Login</h1>
                <div className={styles.loginCard}>
                    <p style={{ textAlign: "center", ...typeStyle("uiBody"), }}>
                        管理者アカウントでログインしてください
                    </p>
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isSigningIn}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: space[12],
                            padding: `${space[12]} ${space[24]}`,
                            background: vars.color.text,
                            color: vars.color.background,
                            border: `2px solid ${vars.color.borderColor}`,
                            borderRadius: "10px",
                            cursor: isSigningIn ? "not-allowed" : "pointer",
                            ...typeStyle("uiBody"),
                            opacity: isSigningIn ? 0.7 : 1,
                            width: "100%",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                            <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                        </svg>
                        {isSigningIn ? "ログイン中..." : "Googleでログイン"}
                    </button>
                    {error && (
                        <div style={{
                            color: "#ff6b6b",
                            ...typeStyle("uiBody"),
                            marginTop: space[12],
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
