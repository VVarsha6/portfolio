import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";

function Section({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-white/5" />
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-indigo-950 text-white">
      <Navbar />

      <div className="pt-24">
        <HeroSection />
        <Section id="about" title="About" />
        <Section id="projects" title="Projects" />
        <Section id="skills" title="Skills" />
        <Section id="experience" title="Experience" />
        <Section id="doodle" title="Doodle" />
      </div>
    </div>
  );
}
