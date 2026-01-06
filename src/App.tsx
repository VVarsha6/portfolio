import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "./sections/Footer";
import FadeSection from "./components/ui/FadeSection";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <Layout>
      <Navbar />

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
    </Layout>
  );
}
