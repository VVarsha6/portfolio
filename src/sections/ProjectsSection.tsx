import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  images?: string[];
  image?: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "Anomalyze",
    description:
      "Predictive maintenance React dashboard benchmarking XGBoost, CatBoost, and ensemble baselines on NASA equipment failure datasets to flag early degradation signals.",
    tech: ["React", "XGBoost", "CatBoost", "Python", "Dashboard"],
    images: ["/projects/anomalyze.png"],
    link: "https://github.com/Anomalyze-AIM/Anomalyze",
  },
  {
    title: "Capital Agent",
    description:
      "Investment insights app combining forecasting models and a conversational interface to generate risk signals, scenarios, and portfolio guidance.",
    tech: ["React", "Flask", "MongoDB", "ML"],
    images: [
      "/projects/capitalagent1.png",
      "/projects/capitalagent2.png",
      "/projects/capitalagent3.png",
      "/projects/capitalagent4.png",
    ],
    link: "https://devpost.com/software/capitalagent",
  },
  {
    title: "DocuWrangler",
    description:
      "RAG document QA with grounded citations and highlight-aware retrieval for fast, reliable querying across large PDFs.",
    tech: ["LangChain", "GPT-4o", "React", "Flask"],
    images: ["/projects/docuwrangler1.png", "/projects/docuwrangler2.png"],
    link: "https://github.com/greeshiee/DocuWrangler",
  },
  {
    title: "Med-istory",
    description:
      "Clinical summarization assistant turning transcripts into structured summaries with secure document handling and real-time updates.",
    tech: ["React", "Flask", "Azure", "LLM"],
    images: ["/projects/medistory1.png", "/projects/medistory2.png"],
    link: "https://github.com/VVarsha6/Medistory",
  },
  {
    title: "SentimentShop",
    description:
      "Transformer-based sentiment dashboard analyzing YouTube comments to surface actionable insights for creators at scale.",
    tech: ["React", "Flask", "BERT", "YouTube API"],
    images: ["/projects/sentimentshop1.png", "/projects/sentimentshop2.png"],
    link: "https://youtubeproductreview-10068906480.development.catalystappsail.com/",
  },
  {
    title: "Avinyam Bot",
    description:
      "Robotics + computer vision workflow for agricultural produce inspection using calibrated camera angles and CV-based classification.",
    tech: ["OpenCV", "Computer Vision", "Arduino"],
    image: "/projects/avinyam.png",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-31066-9_62",
  },
  {
    title: "Cat-Search Engine",
    description:
      "Built a cat-focused search engine by crawling 150,000+ websites with Apache Nutch and indexing in Solr; improved ranking via Rocchio feedback + hierarchical clustering and shipped a Streamlit UI.",
    tech: ["Apache Nutch", "Apache Solr", "Rocchio", "Clustering", "Streamlit"],
    image: "/projects/catsearch.png",
    link: "https://gamma.app/docs/Search-Engine-for-Cats-Project-Overview-4t2cknunsmj46ey",
  },
  {
    title: "GRU Time Series Prediction",
    description:
      "Engineered a GRU-based model for stock-market time series to capture long-term dependencies and benchmarked against RNNs/LSTMs for stability and forecasting quality.",
    tech: ["Python", "TensorFlow", "NumPy", "pandas", "GRU"],
    image: "/projects/gru.png",
  },
];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function clampIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function CardMedia({
  title,
  sources,
  active,
}: {
  title: string;
  sources: string[];
  active: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const hasMultiple = sources.length > 1;

  useEffect(() => {
    if (!active) setIdx(0);
  }, [active]);

  useEffect(() => {
    if (!active || !hasMultiple) return;

    const t = window.setInterval(() => {
      setIdx((prev) => clampIndex(prev + 1, sources.length));
    }, 1100);

    return () => window.clearInterval(t);
  }, [active, hasMultiple, sources.length]);

  return (
    <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-black/35">
      <img
        src={sources[idx]}
        alt={title}
        className="
          absolute inset-0 h-full w-full object-cover
          transform-gpu transition duration-300 ease-out
          group-hover:scale-[1.04]
        "
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-90" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
    </div>
  );
}

function Card({ p }: { p: Project }) {
  const Wrapper: any = p.link ? motion.a : motion.div;
  const [hovered, setHovered] = useState(false);

  const sources = useMemo(() => {
    return p.images?.length ? p.images : p.image ? [p.image] : [];
  }, [p.images, p.image]);

  return (
    <Wrapper
      href={p.link}
      target={p.link ? "_blank" : undefined}
      rel={p.link ? "noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        group relative block rounded-2xl border border-white/15 bg-white/10 p-5
        transition-colors duration-200 hover:bg-white/12 focus:outline-none
      "
      whileHover={p.link ? { y: -6, scale: 1.02 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Neon glow behind the card on hover */}
      <div
        className="
          pointer-events-none absolute -inset-3 rounded-[22px]
          opacity-0 blur-2xl transition-opacity duration-200
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(56,189,248,0.22), rgba(56,189,248,0.06) 55%, transparent 70%)",
        }}
      />

      {/* Crisp neon outline */}
      <div
        className="
          pointer-events-none absolute -inset-[1px] rounded-[18px]
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100 group-focus-visible:opacity-100
        "
        style={{
          boxShadow:
            "0 0 0 1px rgba(56,189,248,0.7), 0 0 30px rgba(56,189,248,0.22)",
        }}
      />

      {sources.length ? (
        <CardMedia title={p.title} sources={sources} active={hovered} />
      ) : null}

      <h3 className="mb-2 text-[15px] font-semibold text-white/95 sm:text-base">
        {p.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-white/80">
        {p.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {p.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="
              rounded-full border border-white/20 bg-white/10
              px-3 py-1 text-[11px] text-white/85
              transition-colors duration-200
              group-hover:border-white/25 group-hover:bg-white/12
            "
          >
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

function useRowMotion(targetRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["center end", "center start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 0.86]);

  const opacity = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.5, 0.82, 1.0],
    [0.25, 0.75, 1.0, 0.7, 0.45]
  );

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -10]);

  return { scale, opacity, y };
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rows = useMemo(() => chunk(projects, 4), []);

  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  const row1 = useRowMotion(row1Ref);
  const row2 = useRowMotion(row2Ref);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <h2 className="mb-20 text-center text-3xl font-semibold text-white">
        Projects
      </h2>

      <div className="space-y-14">
        <motion.div
          ref={row1Ref}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{
            scale: row1.scale,
            opacity: row1.opacity,
            y: row1.y,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          {rows[0]?.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </motion.div>

        <motion.div
          ref={row2Ref}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{
            scale: row2.scale,
            opacity: row2.opacity,
            y: row2.y,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          {rows[1]?.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
