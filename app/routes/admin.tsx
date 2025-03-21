import { useState } from "react";
import { useNavigate } from "@remix-run/react";

// クライアントサイドでのみ実行されるLocalStorage関数
export const saveLoginState = () => {
    if (typeof window !== "undefined") {
        localStorage.setItem("isAdminLoggedIn", "true");
    }
};

export const checkLoginState = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("isAdminLoggedIn") === "true";
    }
    return false;
};

export const removeLoginState = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("isAdminLoggedIn");
    }
};

export default function Admin() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // 簡易的な認証: nameとpassがともに"admin"の場合のみログイン成功
        if (name === "admin" && pass === "PassWord1234") {
            saveLoginState();
            // blog.new.tsxに遷移
            navigate("/blog/new");
        } else {
            setError("ユーザー名またはパスワードが間違っています");
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "400px",
            margin: "0 auto"
        }}>
            <h1>管理者ログイン</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ width: "100%", marginBottom: "15px" }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ユーザー名"
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
            </div>

            <div style={{ width: "100%", marginBottom: "15px" }}>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="パスワード"
                    style={{ width: "100%", padding: "10px" }}
                />
            </div>

            <button
                onClick={handleLogin}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                ログイン
            </button>
        </div>
    );
}