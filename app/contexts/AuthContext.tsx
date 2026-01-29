import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const googleProvider = new GoogleAuthProvider();
const ALLOWED_EMAIL = "koushi.tanaka54@gmail.com";

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser && firebaseUser.email !== ALLOWED_EMAIL) {
                signOut(auth);
                return;
            }
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user.email !== ALLOWED_EMAIL) {
            await signOut(auth);
            throw new Error("unauthorized");
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!user,
            user,
            loading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
