import { ReactNode, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "../../contexts/AuthContext";
import { vars } from "../../styles/theme.css";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, loading, navigate]);

    if (loading) {
        return (
            <div style={{ color: vars.color.text, textAlign: "center", padding: "120px 20px" }}>
                読み込み中...
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
}
