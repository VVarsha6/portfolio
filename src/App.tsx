import Navbar from "./components/layout/Navbar";
import Layout from "./components/layout/Layout";

import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import Footer from "./sections/Footer";

import FadeSection from "./components/ui/FadeSection";

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
