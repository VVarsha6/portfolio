import { useMemo } from "react";

type ItemType = "experience" | "education";

type TimelineItem = {
  year: string;
  type: ItemType;
  title: string;
  org: string;
  location?: string;
  date: string;
  oneLiner: string; // tight, keyword-packed
};

export default function ExperienceSection() {
  const items: TimelineItem[] = useMemo(
    () => [
      {
        year: "2025",
        type: "experience",
        title: "Software Engineer",
        org: "Unicgate",
        location: "Richardson, TX",
        date: "Sep 2025 – Present",
        oneLiner:
          "Owned Flutter + Firebase mobile platform with Cloud Firestore and Node.js Cloud Functions, delivering real-time step tracking, idempotent writes, and scalable event ingestion.",
      },
      {
        year: "2025",
        type: "education",
        title: "M.S. Computer Science",
        org: "The University of Texas at Dallas",
        location: "Dallas, TX",
        date: "Aug 2023 – May 2025",
        oneLiner:
          "Graduate CS training across systems and applied ML, building production-style projects with API design, data pipelines, and performance-focused engineering practices.",
      },
      {
        year: "2023",
        type: "experience",
        title: "Software Engineering Intern",
        org: "Zoho Corporation",
        location: "Chennai, India",
        date: "Jan 2023 – Jun 2023",
        oneLiner:
          "Built and shipped backend features using Java and MySQL, improving reliability, data consistency, and end-to-end feature delivery in a large-scale org.",
      },
      {
        year: "2022",
        type: "experience",
        title: "Software Engineering Intern",
        org: "ZeusDesk",
        location: "Remote",
        date: "Jun 2022 – Dec 2022",
        oneLiner:
          "Developed full-stack features with React and REST APIs, owning UI integration, debugging, and fast iteration in a startup environment.",
      },
      {
        year: "2023",
        type: "education",
        title: "B.E. Computer Science & Engineering",
        org: "Anna University",
        location: "India",
        date: "Jun 2019 – Apr 2023",
        oneLiner:
          "Strong foundation in data structures, OOP, and software engineering, translating theory into maintainable, testable systems.",
      },
    ],
    []
  );

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      {/* Heading only */}
      <h2 className="text-3xl font-semibold text-white text-center">
        Experience
      </h2>

      <div className="relative mt-14">
        {/* Center line (desktop) */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
        {/* Line (mobile) */}
        <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-white/10 md:hidden" />

        <div className="space-y-6">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={`${item.org}-${item.date}-${idx}`}
                className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-10"
              >
                {/* Year label (desktop only) */}
                <div
                  className="
                    pointer-events-none absolute
                    left-1/2 top-5 hidden
                    -translate-x-[72px]
                    text-xs font-medium text-white/40
                    md:block
                  "
                >
                  {item.year}
                </div>

                {/* Node dot */}
                <div className="pointer-events-none absolute left-3 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-300/70 shadow-[0_0_18px_rgba(56,189,248,0.35)] md:left-1/2" />

                {/* Card column */}
                <div
                  className={[
                    "md:col-span-1",
                    isLeft ? "md:col-start-1" : "md:col-start-2",
                    "pl-10 md:pl-0",
                    isLeft ? "md:pr-6 md:text-right" : "md:pl-6 md:text-left",
                  ].join(" ")}
                >
                  <article
                    className="
                      group relative overflow-hidden
                      rounded-2xl border border-white/10 bg-white/[0.03]
                      p-5 md:p-6
                      shadow-[0_14px_40px_rgba(0,0,0,0.35)]
                      transition-transform duration-300 ease-out
                      hover:-translate-y-0.5
                      hover:border-sky-300/35
                    "
                  >
                    {/* Hover bloom (subtle center pop) */}
                    <div
                      className="
                        pointer-events-none absolute inset-0 opacity-0
                        transition-opacity duration-300 ease-out
                        group-hover:opacity-100
                      "
                      style={{
                        background:
                          "radial-gradient(520px circle at 50% 50%, rgba(56,189,248,0.14), rgba(56,189,248,0.06) 35%, rgba(0,0,0,0) 70%)",
                      }}
                    />

                    {/* Subtle outline glow */}
                    <div
                      className="
                        pointer-events-none absolute inset-0 opacity-0
                        transition-opacity duration-300 ease-out
                        group-hover:opacity-100
                      "
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(56,189,248,0.16), 0 0 26px rgba(56,189,248,0.10)",
                        borderRadius: "16px",
                      }}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                          {item.type === "experience" ? "Work" : "Education"}
                        </span>
                        <span className="text-white/40">•</span>
                        <span>{item.date}</span>
                        {item.location ? (
                          <>
                            <span className="text-white/40">•</span>
                            <span>{item.location}</span>
                          </>
                        ) : null}
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/70">{item.org}</p>

                      {/* Bullet-style precision */}
                      <p className="mt-4 text-sm leading-relaxed text-white/65">
                        • {item.oneLiner}
                      </p>
                    </div>
                  </article>
                </div>

                {/* Empty column to preserve alternating layout (desktop) */}
                <div
                  className={[
                    "hidden md:block",
                    isLeft ? "md:col-start-2" : "md:col-start-1",
                  ].join(" ")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
