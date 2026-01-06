import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "./sections/Footer";
import FadeSection from "./components/ui/FadeSection";



export default function App() {
  return (
    <div className="min-h-screen bg-space text-white/90">
      <Navbar />

      {/* Offset for fixed navbar */}
      <main>
        <FadeSection>
        <HeroSection />
        </FadeSection>

        <FadeSection>
        <AboutSection />
        </FadeSection>
    
        <ProjectsSection />

        <FadeSection>
        <SkillsSection />
        </FadeSection>
      
        <ExperienceSection />
        <Footer />


      </main>
    </div>
  );
}
