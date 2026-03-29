import Navbar from "./Components/Navbar";
import About from "./Components/sections/About";
import Contact from "./Components/sections/Contact";
import Footer from "./Components/sections/Footer";
import Hero from "./Components/sections/Hero";
import Projects from "./Components/sections/Projects";
import Skills from "./Components/sections/Skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      {/* <Skills /> */}
      <Contact />
      <Footer />
    </main>
  );
}
