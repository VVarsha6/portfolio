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
  const PILL_PAD_LEFT = 20;
  const PILL_PAD_RIGHT = 8;

  const clickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const recalcPill = () => {
    const nav = navRef.current;
    const btn = btnRefs.current[activeId];
    if (!nav || !btn) return;

    const navRect = nav.getBoundingClientRect();
    const span = btn.querySelector("span");
    const rect = span?.getBoundingClientRect() ?? btn.getBoundingClientRect();

    const width = Math.ceil(rect.width + PILL_PAD_LEFT + PILL_PAD_RIGHT);
    const left = Math.round(rect.left - navRect.left - PILL_PAD_LEFT-3);

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

  useEffect(() => {
    const getSections = () =>
      items
        .map((i) => document.getElementById(i.id))
        .filter(Boolean) as HTMLElement[];

    const pickActive = () => {
      if (clickingRef.current) return;

      if (window.scrollY < 10) {
        if (activeId !== "home") setActiveId("home");
        return;
      }

      const sections = getSections();
      if (!sections.length) return;

      const line = NAV_OFFSET + 1;

      let bestId = sections[0].id;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const s of sections) {
        const top = s.getBoundingClientRect().top;
        const dist = Math.abs(top - line);
        const isCandidate = top <= line + 120;

        if (isCandidate && dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }

      if (bestId && bestId !== activeId) setActiveId(bestId);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        pickActive();
      });
    };

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
    <div className="fixed left-1/2 top-3 z-50 w-[94vw] -translate-x-1/2 sm:top-6 sm:w-auto">
      <nav
        ref={navRef}
        className="
          relative flex items-center
          rounded-full
          border border-black/10 bg-white/70
          dark:border-white/10 dark:bg-zinc-950/60
          backdrop-blur-xl
          px-2 py-2
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]
          dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          max-w-full
        "
        aria-label="Primary"
      >
        {/* Scroll container so labels never spill out on mobile */}
        <div className="relative flex w-full items-center overflow-x-auto no-scrollbar">
          {/* Active pill */}
          <div
            className="
              absolute rounded-full
              bg-black/5 ring-1 ring-black/10
              dark:bg-white/10 dark:ring-white/10
              transition-all duration-300 ease-out
            "
            style={{
              transform: `translateX(${pill.left}px)`,
              width: `${pill.width}px`,
              top: "6px",
              bottom: "6px",
            }}
          />

          <div className="relative z-10 flex items-center gap-1 pr-1">
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
                    whitespace-nowrap rounded-full
                    px-3 py-2 text-[13px] sm:px-4 sm:text-sm
                    font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "text-sky-500 dark:text-sky-300"
                        : "text-black/60 hover:text-sky-600 dark:text-white/55 dark:hover:text-sky-300"
                    }
                    focus:outline-none
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
