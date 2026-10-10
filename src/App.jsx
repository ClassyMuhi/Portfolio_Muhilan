import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import DeepfakeDetectionPage from './components/sections/DeepfakeDetectionPage';
import PolypharmacyEnginePage from './components/sections/PolypharmacyEnginePage';
import EduMatePage from './components/sections/EduMatePage';
import ProjectAstraPage from './components/sections/ProjectAstraPage';
import HireXPage from './components/sections/HireXPage';
import SmartSMSPage from './components/sections/SmartSMSPage';

// Lazy-load below-fold sections
const About = lazy(() => import('./components/sections/About'));
const FeaturedWork = lazy(() => import('./components/sections/FeaturedWork'));
const Projects = lazy(() => import('./components/sections/Projects'));
const DesignShowcase = lazy(() => import('./components/sections/DesignShowcase'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const MagnetLinesSection = lazy(() => import('./components/sections/MagnetLinesSection'));

function SectionFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-accent-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base text-white overflow-x-hidden transition-colors duration-300">
        <AnimatePresence>
        {activeProject === 'deepfake' && (
          <DeepfakeDetectionPage key="deepfake" onClose={() => setActiveProject(null)} />
        )}
        {activeProject === 'polypharmacy' && (
          <PolypharmacyEnginePage key="polypharmacy" onClose={() => setActiveProject(null)} />
        )}
        {activeProject === 'edumate' && (
          <EduMatePage key="edumate" onClose={() => setActiveProject(null)} />
        )}
        {activeProject === 'astra' && (
          <ProjectAstraPage key="astra" onClose={() => setActiveProject(null)} />
        )}
        {activeProject === 'hirex' && (
          <HireXPage key="hirex" onClose={() => setActiveProject(null)} />
        )}
        {activeProject === 'smartsms' && (
          <SmartSMSPage key="smartsms" onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero setActiveProject={setActiveProject} />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedWork setActiveProject={setActiveProject} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects setActiveProject={setActiveProject} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DesignShowcase setActiveProject={setActiveProject} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience setActiveProject={setActiveProject} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MagnetLinesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  </ThemeProvider>
);
}
