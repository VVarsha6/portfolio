import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type NavItem = { id: string; label: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
    ],
    []
  );

  const [activeId, setActiveId] = useState("home");

  const navRef = useRef<HTMLElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const NAV_OFFSET = 110;

  // pill padding (before/after text)
  const PILL_PAD_LEFT = 20;
  const PILL_PAD_RIGHT = 8; // ⬅️ slightly more natural than 1

  // prevent scrollspy from fighting a click scroll
  const clickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  const recalcPill = () => {
    const nav = navRef.current;
    const btn = btnRefs.current[activeId];
    if (!nav || !btn) return;

    const navRect = nav.getBoundingClientRect();
    const span = btn.querySelector("span");
    const rect = span?.getBoundingClientRect() ?? btn.getBoundingClientRect();

    const width = Math.ceil(rect.width + PILL_PAD_LEFT + PILL_PAD_RIGHT);
    const left = Math.round(rect.left - navRect.left - PILL_PAD_LEFT);

    setPill({ left, width });
  };

  useLayoutEffect(() => {
    recalcPill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    const onResize = () => recalcPill();
    window.addEventListener("resize", onResize);

    const ro = navRef.current ? new ResizeObserver(() => recalcPill()) : null;
    if (navRef.current && ro) ro.observe(navRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // ✅ ScrollSpy: update activeId as you scroll
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (clickingRef.current) return;

        // choose most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        // tune these margins to your taste
        // makes the next section become "active" before it fully reaches the top
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.12, 0.2, 0.3, 0.4, 0.5],
      }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  function handleClick(id: string) {
    setActiveId(id);

    clickingRef.current = true;
    if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => {
      clickingRef.current = false;
    }, 700);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <nav
        ref={navRef}
        className="
          relative inline-flex items-center gap-1
          rounded-full border border-white/10
          bg-zinc-950/60 backdrop-blur-xl
          px-2 py-2
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          max-w-[92vw]
        "
        aria-label="Primary"
      >
        {/* Active pill */}
        <div
          className="
            absolute rounded-full
            bg-white/10 ring-1 ring-white/10
            transition-all duration-300 ease-out
          "
          style={{
            transform: `translateX(${pill.left}px)`,
            width: `${pill.width}px`,
            top: "6px",
            bottom: "6px",
          }}
        />

        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={(el) => {
                btnRefs.current[item.id] = el; // ✅ TS-safe (returns void)
              }}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`
                relative z-10
                whitespace-nowrap rounded-full
                px-4 py-2 text-sm font-medium
                transition-colors duration-200
                ${isActive ? "text-sky-300" : "text-white/55 hover:text-sky-300"}
                focus:outline-none
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
