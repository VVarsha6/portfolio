import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string; // static thumbnail
  media?: string; // hover video OR gif (mp4/webm/gif)
  link?: string; // optional (some cards shouldn't be clickable)
};

const projects: Project[] = [
  {
    title: "Anomalyze",
    description:
      "Predictive maintenance React dashboard benchmarking XGBoost, CatBoost, and ensemble baselines on NASA equipment failure datasets to flag early degradation signals.",
    tech: ["React", "XGBoost", "CatBoost", "Python", "Dashboard"],
    image: "/projects/anomalyze.png",
    media: "/projects/anomalyze.mp4",
    link: "https://github.com/Anomalyze-AIM/Anomalyze",
  },
  {
    title: "Capital Agent",
    description:
      "Investment insights app combining forecasting models and a conversational interface to generate risk signals, scenarios, and portfolio guidance.",
    tech: ["React", "Flask", "MongoDB", "ML"],
    image: "/projects/capital-agent.png",
    media: "/projects/capital-agent.mp4",
    link: "https://devpost.com/software/capitalagent",
  },
  {
    title: "DocuWrangler",
    description:
      "RAG document QA with grounded citations and highlight-aware retrieval for fast, reliable querying across large PDFs.",
    tech: ["LangChain", "GPT-4o", "React", "Flask"],
    image: "/projects/docuwrangler.png",
    media: "/projects/docuwrangler.mp4",
    link: "https://github.com/greeshiee/DocuWrangler",
  },
  {
    title: "Med-istory",
    description:
      "Clinical summarization assistant turning transcripts into structured summaries with secure document handling and real-time updates.",
    tech: ["React", "Flask", "Azure", "LLM"],
    image: "/projects/medistory.png",
    media: "/projects/medistory.mp4",
    link: "https://github.com/VVarsha6/Medistory",
  },
  {
    title: "SentimentShop",
    description:
      "Transformer-based sentiment dashboard analyzing YouTube comments to surface actionable insights for creators at scale.",
    tech: ["React", "Flask", "BERT", "YouTube API"],
    image: "/projects/sentimentshop.png",
    media: "/projects/sentimentshop.mp4",
    link: "https://youtubeproductreview-10068906480.development.catalystappsail.com/",
  },
  {
    title: "Avinyam Bot",
    description:
      "Robotics + computer vision workflow for agricultural produce inspection using calibrated camera angles and CV-based classification.",
    tech: ["OpenCV", "Computer Vision", "Arduino"],
    image: "/projects/avinyam.png",
    media: "/projects/avinyam.mp4",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-31066-9_62",
  },
  {
    title: "Cat-Search Engine",
    description:
      "Built a cat-focused search engine by crawling 150,000+ websites with Apache Nutch and indexing in Solr; improved ranking via Rocchio feedback + hierarchical clustering and shipped a Streamlit UI.",
    tech: ["Apache Nutch", "Apache Solr", "Rocchio", "Clustering", "Streamlit"],
    image: "/projects/cat-search.png",
    media: "/projects/cat-search.mp4",
    link: "https://gamma.app/docs/Search-Engine-for-Cats-Project-Overview-4t2cknunsmj46ey",
  },
  {
    title: "GRU Time Series Prediction",
    description:
      "Engineered a GRU-based model for stock-market time series to capture long-term dependencies and benchmarked against RNNs/LSTMs for stability and forecasting quality.",
    tech: ["Python", "TensorFlow", "NumPy", "pandas", "GRU"],
    image: "/projects/gru-stocks.png",
    media: "/projects/gru-stocks.mp4",
    // no link
  },
];

function isVideo(src?: string) {
  if (!src) return false;
  return (
    src.endsWith(".mp4") ||
    src.endsWith(".webm") ||
    src.endsWith(".ogg") ||
    src.includes(".mp4?") ||
    src.includes(".webm?")
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Card({ p }: { p: Project }) {
  const Wrapper: any = p.link ? motion.a : motion.div;

  return (
    <Wrapper
      href={p.link}
      target={p.link ? "_blank" : undefined}
      rel={p.link ? "noreferrer" : undefined}
      className={[
        "group relative block rounded-2xl border border-white/10 bg-white/5 p-5 transition",
        "hover:bg-white/7 focus:outline-none",
        p.link ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      whileHover={p.link ? { y: -2 } : undefined}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Neon hover outline */}
      <div
        className="
          pointer-events-none absolute -inset-[1px] rounded-[18px]
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100 group-focus-visible:opacity-100
        "
        style={{
          boxShadow:
            "0 0 0 1px rgba(56,189,248,0.55), 0 0 22px rgba(56,189,248,0.18)",
        }}
      />

      {/* Media */}
      <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-black/35">
        <img
          src={p.image}
          alt={p.title}
          className="
            absolute inset-0 h-full w-full object-cover
            transition-opacity duration-200
            group-hover:opacity-0
          "
          loading="lazy"
        />

        {p.media ? (
          isVideo(p.media) ? (
            <video
              src={p.media}
              muted
              loop
              playsInline
              autoPlay
              className="
                absolute inset-0 h-full w-full object-cover
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100
              "
            />
          ) : (
            <img
              src={p.media}
              alt={`${p.title} preview`}
              className="
                absolute inset-0 h-full w-full object-cover
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100
              "
              loading="lazy"
            />
          )
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-70" />
      </div>

      <h3 className="mb-2 text-[15px] font-semibold text-white sm:text-base">
        {p.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-white/65">
        {p.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {p.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="
              rounded-full border border-white/10 bg-white/5
              px-3 py-1 text-[11px] text-white/70
            "
          >
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rows = useMemo(() => chunk(projects, 4), []);

  // Scroll progress *through this section* (smooth, reversible, no "re-trigger" flicker)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // When the section enters the viewport (bottom hits bottom) -> progress 0
    // When the section leaves the viewport (top hits top) -> progress 1
    offset: ["start end", "end start"],
  });

  // Row 1 grows first, then row 2. Adjust ranges if you want earlier/later reveal.
  const row1Scale = useTransform(scrollYProgress, [0.05, 0.28], [0.9, 1]);
  const row1Opacity = useTransform(scrollYProgress, [0.03, 0.18], [0, 1]);

  const row2Scale = useTransform(scrollYProgress, [0.28, 0.6], [0.9, 1]);
  const row2Opacity = useTransform(scrollYProgress, [0.26, 0.42], [0, 1]);

  return (
    <section ref={sectionRef} id="projects" className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="mb-16 text-center text-3xl font-semibold text-white">
        Projects
      </h2>

      {/* ✅ row-by-row grow-on-scroll; reverses naturally when scrolling up */}
      <div className="space-y-10">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{
            scale: row1Scale,
            opacity: row1Opacity,
            transformOrigin: "top center",
            willChange: "transform, opacity",
          }}
        >
          {rows[0]?.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </motion.div>

        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{
            scale: row2Scale,
            opacity: row2Opacity,
            transformOrigin: "top center",
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
