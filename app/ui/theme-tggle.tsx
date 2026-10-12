"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <div className="flex items-center w-14 h-8 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-500 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></div>
      <span className="text-sm font-medium">Switch Theme</span>
    </label>
  );
}
