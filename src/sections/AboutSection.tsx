export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-3xl px-6 pt-6 pb-10 sm:pt-10 sm:pb-16"
    >
      <h2 className="text-3xl font-semibold text-black/90 dark:text-white text-center">
        About
      </h2>

      <div className="mt-10 sm:mt-10 space-y-6 text-center text-[17px] leading-relaxed text-black/70 dark:text-white/70">
        <p>
          A product focused software engineer with a strong full stack foundation
          and experience building production ready systems in fast moving
          environments. Work is driven by a deep interest in how users interact
          with systems and how thoughtful engineering decisions translate into
          reliability, clarity, and long term impact.
        </p>

        <p>
          Strong belief in user informed engineering where real usage, feedback,
          and constraints shape technical decisions. Problems are approached by
          digging into details, understanding tradeoffs, and iterating with
          intention rather than overengineering.
        </p>

        <p>
          Comfortable operating in ambiguous situations that require quick
          reasoning, adaptability, and learning on the go. Curiosity and a
          systems mindset enable fast ramp up, efficient execution, and
          continuous improvement across projects and teams.
        </p>
      </div>
    </section>
  );
}
