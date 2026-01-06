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
  <div
  className="
    fixed z-[9999]
    right-4 bottom-4
    sm:right-5 sm:bottom-5
    bottom-[calc(env(safe-area-inset-bottom)+1rem)]
    right-[calc(env(safe-area-inset-right)+1rem)]
  "
>
  <ThemeToggle />
</div>



      {children}
    </div>
  );
}
