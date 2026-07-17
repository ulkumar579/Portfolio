import AmbientBackground from "./background/AmbientBackground";
import ScrollHUD from "./background/ScrollHUD";
import Navbar from "./navbar/Navbar";
import Hero from "./hero/Hero";
import Experience from "./experience/Experience";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import Certifications from "./certifications/Certifications";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";
import SocialStrip from "./social/SocialStrip";
import { ThemeProvider } from "./theme/ThemeContext";

export default function Portfolio() {
  return (
    <ThemeProvider>
      <div className="portfolio-root relative min-h-screen font-display text-white antialiased">
        <AmbientBackground />
        <ScrollHUD />
        <Navbar />
        <SocialStrip />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}