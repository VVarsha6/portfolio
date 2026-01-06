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

/** Mobile detector */
function useIsMobile(breakpointPx = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [breakpointPx]);

  return isMobile;
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
    const t = window.setInterval(
      () => setIdx((p) => clampIndex(p + 1, sources.length)),
      1100
    );
    return () => window.clearInterval(t);
  }, [active, hasMultiple, sources.length]);

  return (
    <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-black/[0.06] ring-1 ring-black/10 dark:bg-black/35 dark:ring-white/10">
      <img
        src={sources[idx]}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 dark:from-black/35" />
    </div>
  );
}

function Card({ p }: { p: Project }) {
  const Wrapper: any = p.link ? motion.a : motion.div;
  const [hovered, setHovered] = useState(false);

  const sources = useMemo(
    () => (p.images?.length ? p.images : p.image ? [p.image] : []),
    [p.images, p.image]
  );

  return (
    <Wrapper
      href={p.link}
      target={p.link ? "_blank" : undefined}
      rel={p.link ? "noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        group relative rounded-2xl
        border border-black/15 bg-black/[0.035]
        p-5 transition-colors duration-200
        hover:bg-black/[0.055]
        dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/12
        focus:outline-none
      "
      whileHover={p.link ? { y: -6, scale: 1.02 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-[20px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          boxShadow:
            "0 0 0 2px rgba(56,189,248,0.92), 0 0 40px rgba(56,189,248,0.38), 0 0 70px rgba(56,189,248,0.18)",
        }}
      />

      {sources.length > 0 && (
        <CardMedia title={p.title} sources={sources} active={hovered} />
      )}

      <h3 className="mb-2 text-[15px] font-semibold text-black/95 dark:text-white/95 sm:text-base">
        {p.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-black/75 dark:text-white/80">
        {p.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {p.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded-full border border-black/15 bg-black/[0.04] px-3 py-1 text-[11px] text-black/75 dark:border-white/20 dark:bg-white/10 dark:text-white/85"
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

  return {
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 0.86]),
    opacity: useTransform(
      scrollYProgress,
      [0, 0.35, 0.5, 0.82, 1],
      [0.25, 0.75, 1, 0.7, 0.45]
    ),
    y: useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -10]),
  };
}

export default function ProjectsSection() {
  const isMobile = useIsMobile(640);

  const rows = useMemo(() => chunk(projects, 4), []);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);
  const row1 = useRowMotion(row1Ref);
  const row2 = useRowMotion(row2Ref);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <h2 className="mb-10 sm:mb-16 text-center text-3xl font-semibold text-black/95 dark:text-white">
        Projects
      </h2>

      <div className="space-y-12 sm:space-y-14">
        {isMobile ? (
          /* ✅ Mobile: NO animation, simple readable list */
          <div className="grid gap-8">
            {projects.map((p) => (
              <Card key={p.title} p={p} />
            ))}
          </div>
        ) : (
          /* ✅ Desktop: unchanged animated rows */
          <>
            <motion.div
              ref={row1Ref}
              style={row1}
              className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {rows[0]?.map((p) => (
                <Card key={p.title} p={p} />
              ))}
            </motion.div>

            <motion.div
              ref={row2Ref}
              style={row2}
              className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {rows[1]?.map((p) => (
                <Card key={p.title} p={p} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
