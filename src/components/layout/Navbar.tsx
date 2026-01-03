import { useMemo, useState } from "react";
type NavItem = {
  id: string;   
  label: string;
};

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "doodle", label: "Fun" },

    ],
    []
  );

  const [activeId, setActiveId] = useState<string>("home");

  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.id === activeId)
  );

  function handleClick(id: string) {
    setActiveId(id);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      {/* Outer pill */}
      <nav
        className="
          relative flex items-center gap-1
          rounded-full border border-white/10
          bg-zinc-900/70 backdrop-blur-xl
          px-2 py-2 shadow-lg shadow-black/30
        "
        aria-label="Primary"
      >
        {/* Active pill highlight */}
        <div
          className="
            absolute top-1 bottom-1
            rounded-full bg-white/10
            ring-1 ring-white/10
            transition-all duration-300 ease-out
          "
          style={{
            left: `calc(${activeIndex} * (100% / ${items.length}) + 0.25rem)`,
            width: `calc((100% / ${items.length}) - 0.5rem)`,
          }}
        />

        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`
                relative z-10
                flex-1 whitespace-nowrap
                rounded-full px-5 py-2 text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "text-sky-300"
                    : "text-white/55 hover:text-sky-300"
                }
                focus:outline-none
                focus-visible:text-sky-300
              `}


              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
