import { useMemo } from "react";

type WorkItem = {
  title: string;
  org: string;
  location?: string;
  date: string;
  summary: string;
};

export default function ExperienceSection() {
  const items: WorkItem[] = useMemo(
    () => [
      {
        title: "Software Engineer",
        org: "Unicgate",
        location: "Richardson, TX",
        date: "Sep 2025 – Present",
        summary:
          "Owned Flutter and Firebase platform with Cloud Firestore sync and Node.js Cloud Functions, shipping reliable step tracking and challenges with idempotent writes and real time updates.",
      },
      {
        title: "Analyst",
        org: "Kanny Technology Solutions",
        location: "Richardson, TX",
        date: "Jul 2025 – Sep 2025",
        summary:
          "Owned Databricks analytics pipelines using SQL and PySpark to transform raw datasets into curated tables and dashboards, improving data reliability and accelerating stakeholder decisions.",
      },
      {
        title: "Software Engineering Intern",
        org: "Zoho Corporation",
        location: "Chennai, India",
        date: "Jan 2023 – Jun 2023",
        summary:
          "Owned backend feature delivery in Java and MySQL, improving service reliability and data consistency through clean API design, debugging, and production ready fixes.",
      },
      {
        title: "Software Engineering Intern",
        org: "ZeusDesk",
        location: "Remote",
        date: "Jun 2022 – Dec 2022",
        summary:
          "Owned React and REST feature development end to end, driving fast iteration, UI integration, and issue resolution in a startup environment.",
      },
    ],
    []
  );

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-14">
      <h2 className="text-3xl font-semibold text-white/95 text-center">
        Experience
      </h2>

      <div className="mt-10 space-y-4">
        {items.map((item, idx) => (
          <div
            key={`${item.org}-${item.date}-${idx}`}
            className="group relative"
          >
            {/* Left indicator */}
            <div className="pointer-events-none absolute left-0 top-6 hidden -translate-x-6 sm:block">
              <div
                className="
                  h-3 w-3 rounded-full
                  border border-sky-300/45 bg-transparent
                  shadow-[0_0_12px_rgba(56,189,248,0.14)]
                  transition-all duration-300
                  group-hover:bg-sky-300/85
                  group-hover:border-sky-300/85
                  group-hover:shadow-[0_0_22px_rgba(56,189,248,0.30)]
                "
              />
            </div>

            <article
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-white/15
                bg-white/6
                px-5 py-4
                shadow-[0_10px_24px_rgba(0,0,0,0.26)]
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                hover:border-sky-300/40
              "
            >
              {/* 🔵 Bigger + glowier neon outline (outline-only, no inner bleed) */}
              <div
                className="
                  pointer-events-none absolute -inset-[2px]
                  rounded-[20px]
                  opacity-0 transition-opacity duration-200
                  group-hover:opacity-100
                "
                style={{
                  boxShadow: `
                    0 0 0 2px rgba(56,189,248,0.95),
                    0 0 38px rgba(56,189,248,0.55),
                    0 0 60px rgba(56,189,248,0.25)
                  `,
                }}
              />

              {/* Subtle ambient bloom */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
                style={{
                  background:
                    "radial-gradient(520px circle at 32% 40%, rgba(56,189,248,0.10), rgba(56,189,248,0.04) 42%, rgba(0,0,0,0) 72%)",
                }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[18px] font-semibold text-white/95">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-white/85">
                      {item.org}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[13px] text-white/65 whitespace-nowrap">
                      {item.date}
                    </p>
                    {item.location && (
                      <p className="mt-0.5 text-[12px] text-white/50 whitespace-nowrap">
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  • {item.summary}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
