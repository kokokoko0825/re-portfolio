import { ReactNode, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // ログインしていない場合は何も表示しない
    }

    return <>{children}</>;
} 