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

  // scroll offset that matches your click scroll
  const NAV_OFFSET = 110;

  // pill padding
  const PILL_PAD_LEFT = 20;
  const PILL_PAD_RIGHT = 8;

  // prevents scrollspy from fighting while click-scrolling
  const clickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // RAF throttle for scroll
  const rafRef = useRef<number | null>(null);

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

  // ✅ ScrollSpy: choose section whose top is closest to NAV_OFFSET line
  useEffect(() => {
    const getSections = () =>
      items
        .map((i) => document.getElementById(i.id))
        .filter(Boolean) as HTMLElement[];

    const pickActive = () => {
      if (clickingRef.current) return;

      // Special case: near very top -> Home
      if (window.scrollY < 10) {
        if (activeId !== "home") setActiveId("home");
        return;
      }

      const sections = getSections();
      if (!sections.length) return;

      // The reference line: where we consider "active" (just under navbar)
      const line = NAV_OFFSET + 1;

      // Find the section whose top is closest to that line,
      // but only among sections that are above/before the line or near it.
      let bestId = sections[0].id;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const s of sections) {
        const top = s.getBoundingClientRect().top; // relative to viewport
        const dist = Math.abs(top - line);

        // Prefer sections that are not far below the line (prevents jumping ahead)
        // Allow a little below (e.g., 120px) so it still activates when approaching.
        const isCandidate = top <= line + 120;

        if (isCandidate && dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }

      // If nothing qualified (rare), fall back to the first visible section
      if (!bestId) bestId = "home";

      if (bestId && bestId !== activeId) setActiveId(bestId);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        pickActive();
      });
    };

    // Run once on mount (important for refresh mid-page)
    pickActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, activeId]);

  function handleClick(id: string) {
    setActiveId(id);

    clickingRef.current = true;
    if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => {
      clickingRef.current = false;
    }, 750);

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
                btnRefs.current[item.id] = el;
              }}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`
                relative z-10 whitespace-nowrap rounded-full
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
