import { ScrollProgress } from './components/ScrollProgress';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Hackathons } from './components/Hackathons';
import { Publication } from './components/Publication';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Hackathons />
        <Publication />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
