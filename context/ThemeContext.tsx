"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme : Theme) => void,
  username: string,
  setUsername:(username: string) => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
export function ThemeProvider({children}:{children: React.ReactNode}) {
  const [theme, setThemeState]= useState<Theme>( ()=> {
     if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return "light";
  })

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme)
  },[theme])

  const setTheme = (theme: Theme) =>{
     setThemeState(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
  const [username, setUsername] = useState("Balaji");
 return (
    <ThemeContext.Provider value={{ theme, setTheme, username, setUsername }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}