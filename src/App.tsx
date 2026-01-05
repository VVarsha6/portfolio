import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-space text-white">
      <Navbar />

      {/* Offset for fixed navbar */}
      <main>

        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />

      </main>
    </div>
  );
}
