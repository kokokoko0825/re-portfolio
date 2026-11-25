import { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "../../contexts/ThemeContext";
import * as icons from "./themeIcons.css";

export function ThemeToggle({ className }: { className: string }) {
    const { theme, toggleTheme } = useTheme();
    const [isDark, setIsDark] = useState<boolean>();
    useEffect(() => {
        setIsDark(document.documentElement.dataset.theme === "dark");
    }, [theme]);

    return (
        <button type="button" className={className} onClick={toggleTheme}
            aria-label="テーマを切り替え" aria-pressed={isDark}>
            <DarkModeOutlinedIcon className={icons.lightIcon} />
            <LightModeOutlinedIcon className={icons.darkIcon} />
        </button>
    );
}
