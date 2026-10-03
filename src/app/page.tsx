import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechnicalInterests from "@/components/sections/TechnicalInterests";
import Skills from "@/components/sections/Skills";
import InteractiveLabs from "@/components/sections/InteractiveLabs";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Education from "@/components/sections/Education";
import CurrentlyExploring from "@/components/sections/CurrentlyExploring";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechnicalInterests />
      <Skills />
      <InteractiveLabs />
      <FeaturedProject />
      <Education />
      <CurrentlyExploring />
      <Contact />
    </>
  );
}
