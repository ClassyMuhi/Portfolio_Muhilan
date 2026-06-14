import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const NeuralScene = lazy(() => import('../three/NeuralScene'));

const words = ['CREATING', 'INTELLIGENT'];
const wordLine2 = ['DIGITAL', 'EXPERIENCES.'];

function HeroHeadline() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
  };
  const letter = {
    hidden: { opacity: 0, y: 60, rotateX: -30 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const renderLine = (lineWords, isLast) =>
    lineWords.map((word, wi) => (
      <span key={wi} className="inline-flex overflow-hidden mr-[0.3em]">
        {word.split('').map((char, ci) => (
          <motion.span key={ci} variants={letter} className="inline-block" style={{ perspective: 800 }}>
            {char === '.' ? <span className="text-accent-primary">.</span> : char}
          </motion.span>
        ))}
      </span>
    ));

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-jakarta font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight"
      style={{ perspective: 1000 }}
    >
      <div>{renderLine(words, false)}</div>
      <div>{renderLine(wordLine2, true)}</div>
    </motion.h1>
  );
}



export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-base" id="hero">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.6 }}
      >
        <source
          src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-hero-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-1 bg-hero-bottom" />

      {/* Vertical Grid Lines */}
      {[25, 50, 75].map((pct) => (
        <div key={pct} className="grid-line z-2" style={{ left: `${pct}%` }} />
      ))}

      {/* Glow blob */}
      <div
        className="absolute z-2 pointer-events-none animate-glow-pulse"
        style={{
          width: 600,
          height: 600,
          left: '5%',
          top: '15%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <NeuralScene />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen section-padding pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl flex flex-col gap-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-inter text-sm font-medium tracking-[0.18em] text-white/50 uppercase"
            >
              AI Engineer × Researcher × Product Designer
            </motion.p>

            {/* Headline */}
            <HeroHeadline />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="font-inter text-lg text-white/55 max-w-xl leading-relaxed"
            >
              I design, build, and research technology that combines{' '}
              <em className="font-instrument italic text-white/80">artificial intelligence</em>,
              user experience, and real-world impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <MagneticButton
                className="btn-primary"
                onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton
                className="btn-outline"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
