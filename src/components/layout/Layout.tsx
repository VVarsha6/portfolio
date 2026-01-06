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
        pt-20 sm:pt-24
      "
    >
      <div className="fixed right-4 top-4 z-[999] sm:right-5 sm:top-5">
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
}
