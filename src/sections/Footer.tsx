export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Varsha Viswanathan
        </p>
        <p className="mt-1 text-[11px] text-white/35">
          Built with React, TypeScript, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
