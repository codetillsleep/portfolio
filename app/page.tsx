import Navbar from "./Components/Navbar";
import Hero from "./Components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* We'll add these sections next */}
      {/* <About /> */}
      {/* <Skills /> */}
      {/* <Projects /> */}
      {/* <Contact /> */}
    </main>
  );
}
