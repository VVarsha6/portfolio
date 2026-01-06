import { useEffect, useMemo, useRef, useState } from "react";

export default function SkillsSection() {
  const skills = useMemo(
    () => [
      "Java",
      "Python",
      "C++",
      "SQL",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Redux",
      "MongoDB",
      "Docker",
      "AWS",
      "Azure",
      "Git",
      "Tailwind",
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);

  // Measure final layout height (invisible)
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | null>(null);

  const [started, setStarted] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > 0) setFixedHeight(h);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (shownCount >= skills.length) return;

    const t = window.setTimeout(() => {
      setShownCount((c) => c + 1);
    }, 55);

    return () => window.clearTimeout(t);
  }, [started, shownCount, skills.length]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="mx-auto max-w-7xl px-6 pt-20 pb-40"
    >
      <h2 className="text-3xl font-semibold text-black/90 dark:text-white/95 text-center">
        Skills
      </h2>

      {/* Invisible measurement layout (for height lock, no layout shift) */}
      <div className="pointer-events-none absolute -left-[9999px] top-0 opacity-0">
        <div ref={measureRef} className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <span
              key={`measure-${skill}`}
              className="
                inline-flex items-center justify-center
                rounded-full
                border border-black/15 dark:border-white/20
                bg-black/[0.04] dark:bg-white/10
                px-5 py-2.5
                text-sm font-medium leading-none
                text-black/80 dark:text-white/85
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Visible skills */}
      <div
        className="mt-12 flex flex-wrap justify-center gap-4"
        style={{ height: fixedHeight ?? undefined }}
      >
        {skills.slice(0, shownCount).map((skill) => (
          <span
            key={skill}
            className="
              group relative inline-flex items-center justify-center
              rounded-full
              border border-black/15 dark:border-white/20
              bg-black/[0.05] dark:bg-white/10
              px-5 py-2.5
              text-sm font-medium leading-none
              text-black/85 dark:text-white/90
              transition-colors duration-200
            "
          >
            {skill}

            {/* Neon outline glow — outline only */}
            <span
              className="
                pointer-events-none absolute -inset-[1px]
                rounded-full
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100
              "
              style={{
                boxShadow:
                  "0 0 0 1px rgba(56,189,248,0.85), 0 0 20px rgba(56,189,248,0.40)",
              }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
