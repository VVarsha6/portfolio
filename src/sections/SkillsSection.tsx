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

  // Used to measure final layout height (invisible)
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | null>(null);

  const [started, setStarted] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  // ✅ Measure the final wrapped height once (after first paint)
  useEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > 0) setFixedHeight(h);
    };

    measure();

    // Re-measure on resize so mobile wrapping stays correct
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ Start once when scrolled into view
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

  // ✅ Spawn pills one-by-one
  useEffect(() => {
    if (!started) return;
    if (shownCount >= skills.length) return;

    const t = window.setTimeout(() => {
      setShownCount((c) => c + 1);
    }, 55); // tiny delay (tune: 35–80)

    return () => window.clearTimeout(t);
  }, [started, shownCount, skills.length]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <h2 className="text-3xl font-semibold text-white text-center">Skills</h2>

      {/* Invisible measurement layout: renders ALL pills but doesn't affect layout */}
      <div className="pointer-events-none absolute -left-[9999px] top-0 opacity-0">
        <div ref={measureRef} className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={`measure-${skill}`}
              className="
                inline-flex items-center justify-center
                rounded-full border border-white/10 bg-white/5
                px-4 py-2 text-sm font-medium leading-none
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Visible container with fixed height to prevent layout shift */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-3"
        style={{ height: fixedHeight ?? undefined }}
      >
        {skills.slice(0, shownCount).map((skill) => (
          <span
            key={skill}
            className="
              inline-flex items-center justify-center
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm font-medium leading-none
              text-white/80
              transition
              hover:border-sky-400/40
              hover:bg-sky-400/10
              hover:text-white
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
