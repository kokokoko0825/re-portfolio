import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    // 初期化時にlocalStorageからテーマを読み込む、またはOS設定を確認
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") as Theme | null;
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.setAttribute("data-theme", savedTheme);
            } else {
                // OS設定を確認
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const initialTheme: Theme = prefersDark ? "dark" : "light";
                setTheme(initialTheme);
                document.documentElement.setAttribute("data-theme", initialTheme);
            }
        }
    }, []);

    // OS設定の変更を監視（初回のみ、ユーザーが手動で変更した場合は無視）
    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = (e: MediaQueryListEvent) => {
                // localStorageに保存されている場合は、OS設定の変更を無視
                const savedTheme = localStorage.getItem("theme");
                if (!savedTheme) {
                    const newTheme: Theme = e.matches ? "dark" : "light";
                    setTheme(newTheme);
                    document.documentElement.setAttribute("data-theme", newTheme);
                }
            };

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme: Theme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            if (typeof window !== "undefined") {
                document.documentElement.setAttribute("data-theme", newTheme);
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
