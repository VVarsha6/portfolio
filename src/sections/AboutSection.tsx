export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        mx-auto
        max-w-5xl
        px-6
        pt-6
        pb-24
      "
    >
    <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
          ABOUT
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Building reliable systems with product focus.
        </h2>

        <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
          I’m a software engineer with a strong full-stack foundation and
          experience shipping production-ready systems in fast-moving
          environments. I’ve built and owned features end to end, improved
          reliability, and made engineering decisions based on direct user
          feedback loops, since users surface constraints and priorities that no
          spec fully captures. I adapt quickly by understanding systems deeply,
          which helps me debug effectively and deliver with efficiency.
        </p>

        <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
          I’m especially interested in building scalable, maintainable software
          that serves real communities and creates tangible impact.
        </p>

        {/* Optional: small “metrics chips” row (looks senior, not noisy) */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">

          {[
            "Full-stack",
            "Systems thinking",
            "Reliability",
            "Product engineering",
            "Fast iteration",
          ].map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                border border-white/10
                bg-white/5
                px-3 py-1
                text-xs font-medium
                text-white/60
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
