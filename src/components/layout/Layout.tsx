import React from "react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-screen
        bg-[#f9fafb] text-black/85
        dark:bg-[#0e141b] dark:text-white/90
        bg-space
        transition-colors duration-300
      "
    >
      <div className="fixed right-5 top-5 z-[999]">
        <ThemeToggle />
      </div>

      {/* App content */}
      {children}
    </div>
  );
}
