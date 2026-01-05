import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  href: string; // GitHub or live link
  imageSrc: string; // default thumbnail
  videoSrc?: string; // hover preview (mp4/webm)
  tags: string[];
};

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
}

function ProjectCard({ p }: { p: Project }) {
  const { ref, inView } = useInView<HTMLAnchorElement>({
    threshold: 0.18,
  });

  return (
    <a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className={[
        "group relative block overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.03]",
        "shadow-[0_14px_40px_rgba(0,0,0,0.35)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-sky-300/25",
        // scroll animation (reversible)
        inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.985]",
      ].join(" ")}
      style={{
        transitionProperty: "transform, opacity, border-color, box-shadow",
      }}
      aria-label={`Open ${p.title}`}
    >
      {/* subtle hover bloom */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(520px circle at 30% 35%, rgba(56,189,248,0.10), rgba(56,189,248,0.04) 40%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
        {/* Image (default) */}
        <img
          src={p.imageSrc}
          alt={p.title}
          className="
            absolute inset-0 h-full w-full object-cover
            opacity-100 transition-opacity duration-200
            group-hover:opacity-0
          "
          loading="lazy"
        />

        {/* Video (on hover) */}
        {p.videoSrc ? (
          <video
            className="
              absolute inset-0 h-full w-full object-cover
              opacity-0 transition-opacity duration-200
              group-hover:opacity-100
            "
            src={p.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(e) => {
              // play on hover (best UX + prevents autoplay blocks)
              const v = e.currentTarget;
              v.currentTime = 0;
              v.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              const v = e.currentTarget;
              v.pause();
            }}
          />
        ) : null}

        {/* top-right "view" hint */}
        <div
          className="
            absolute right-3 top-3 rounded-full
            border border-white/10 bg-black/30 px-3 py-1
            text-xs text-white/70 backdrop-blur
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100
          "
        >
          View ↗
        </div>
      </div>

      {/* Content */}
      <div className="relative px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold text-white">{p.title}</h3>
        </div>

        <p className="mt-2 text-[14px] leading-relaxed text-white/70">
          {p.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="
                inline-flex items-center justify-center
                rounded-full border border-white/10 bg-white/5
                px-3 py-1 text-[12px] font-medium text-white/75
                transition-colors duration-200
                group-hover:border-sky-300/25 group-hover:bg-sky-300/10
              "
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  // ✅ Replace with your real projects + links + assets
  const projects: Project[] = useMemo(
    () => [
      {
        title: "DocuWrangler",
        description:
          "Multimodal RAG app that indexes PDFs into a vector store and returns grounded answers with cited references through a chat UI.",
        href: "https://github.com/yourname/docuwrangler",
        imageSrc: "/projects/docu-thumb.png",
        videoSrc: "/projects/docu-preview.mp4",
        tags: ["React", "Python", "RAG", "Vector DB"],
      },
      {
        title: "Virtual Try-On (3D)",
        description:
          "3D virtual try-on experience that renders outfits on models and explores generative personalization for inclusive fashion UX.",
        href: "https://github.com/yourname/virtual-tryon",
        imageSrc: "/projects/tryon-thumb.png",
        videoSrc: "/projects/tryon-preview.mp4",
        tags: ["Three.js", "AWS", "GenAI", "UI/UX"],
      },
      {
        title: "Predictive Maintenance",
        description:
          "ML pipeline for anomaly detection and failure prediction on large-scale telemetry, built for reliable monitoring and analysis.",
        href: "https://github.com/yourname/predictive-maintenance",
        imageSrc: "/projects/pdm-thumb.png",
        videoSrc: "/projects/pdm-preview.mp4",
        tags: ["Python", "Azure", "ML", "Pandas"],
      },
      {
        title: "Sentiment Market Insights",
        description:
          "NLP dashboard that aggregates sentiment signals and surfaces trends for faster decision-making and analysis workflows.",
        href: "https://github.com/yourname/sentiment-dashboard",
        imageSrc: "/projects/sentiment-thumb.png",
        videoSrc: "/projects/sentiment-preview.mp4",
        tags: ["NLP", "React", "APIs", "LLMs"],
      },
      {
        title: "E-Commerce Storefront",
        description:
          "Full-stack shopping flow with product browsing, cart, and checkout-style interactions focused on performance and UX.",
        href: "https://github.com/yourname/ecommerce",
        imageSrc: "/projects/shop-thumb.png",
        videoSrc: "/projects/shop-preview.mp4",
        tags: ["React", "Node", "SQL", "Auth"],
      },
      {
        title: "Step Challenge App",
        description:
          "Mobile step challenge system with daily sync, reliable uploads, and leaderboard-style engagement features.",
        href: "https://github.com/yourname/step-challenge",
        imageSrc: "/projects/steps-thumb.png",
        videoSrc: "/projects/steps-preview.mp4",
        tags: ["Flutter", "Firebase", "Cloud Functions", "Realtime"],
      },
    ],
    []
  );

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-3xl font-semibold text-white text-center">
        Projects
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-center text-white/60 text-[15px]">
        Selected work with product polish, performance focus, and production-grade execution.
      </p>

      <div
        className="
          mt-10 grid gap-5
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
