import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";

export default function App() {
  return (
    <div className="min-h-screen bg-space text-white">
      <Navbar />

      {/* Offset for fixed navbar */}
      <main>

        <HeroSection />
        <AboutSection />
        <ExperienceSection />

        {/* Placeholders for now */}
        <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-semibold">Projects</h2>
        </section>

        <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-semibold">Skills</h2>
        </section>

        <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-semibold">Experience</h2>
        </section>

        <section id="doodle" className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-semibold">Doodle</h2>
        </section>
      </main>
    </div>
  );
}
