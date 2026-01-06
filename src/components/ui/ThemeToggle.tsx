import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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
        border border-black/15 bg-white/80
        shadow-sm backdrop-blur
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:border-sky-400/50
        dark:border-white/15 dark:bg-white/10
      "
    >
      {/* Neon outline */}
      <span
        className="
          pointer-events-none absolute -inset-[2px] rounded-full
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100
        "
        style={{
          boxShadow:
            "0 0 0 2px rgba(56,189,248,0.9), 0 0 20px rgba(56,189,248,0.45)",
        }}
      />

      <img
        src={theme === "dark" ? "./public/icons/sun.png" : "./public/icons/moon.png"}
        alt=""
        className="h-5 w-5 select-none"
        draggable={false}
      />
    </button>
  );
}
