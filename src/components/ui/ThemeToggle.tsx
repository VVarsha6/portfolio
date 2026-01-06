import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="
        group relative inline-flex items-center justify-center
        h-10 w-10 rounded-full
        border border-black/20 bg-white/90
        shadow-sm backdrop-blur
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:border-sky-400/50
        dark:border-white/15 dark:bg-white/10
      "
    >
      {/* Neon outline glow */}
      <span
        className="
          pointer-events-none absolute -inset-[2px] rounded-full
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100
        "
        style={{
          boxShadow:
            "0 0 0 2px rgba(56,189,248,0.9), 0 0 20px rgba(56,189,248,0.45), 0 0 40px rgba(56,189,248,0.20)",
        }}
      />

      {/* Icons */}
      <img
        src={theme === "dark" ? "./src/icons/sun.png" : "./src/icons/moon.png"}
        alt=""
        className="h-5 w-5 select-none"
        draggable={false}
      />
    </button>
  );
}
