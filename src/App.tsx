import { BootScreen } from './components/BootScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { PixelDivider } from './components/PixelDivider';
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
      <BootScreen />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <PixelDivider />
        <Skills />
        <PixelDivider />
        <Experience />
        <PixelDivider />
        <Projects />
        <Hackathons />
        <Publication />
        <PixelDivider />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
