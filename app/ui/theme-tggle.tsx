"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, username, setTheme } = useTheme();

  return (
    <>
      <p className={`mx-2`}>Logged in {username} </p>
      <label 
        className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          className="sr-only peer theme-toggle-input"
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <div className="theme-toggle-track"></div>
        <span className="text-sm font-medium">{theme.toLocaleUpperCase()} Theme</span>
      </label>
    </>
  );
}
