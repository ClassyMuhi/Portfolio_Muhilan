import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Built' },
  { value: 4, suffix: '', label: 'Research Works' },
  { value: 15, suffix: '+', label: 'Design Concepts' },
  { value: 25, suffix: '+', label: 'Technologies Explored' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="about" onMouseMove={handleMouseMove} className="section-padding bg-base relative overflow-hidden group">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Faint Dot Grid */}
        <div className="absolute inset-0 opacity-5 z-0"
          style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
          
        {/* Reactive Bright Dot Grid (Revealed on Hover) */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ 
            backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', 
            backgroundSize: '32px 32px',
            WebkitMaskImage: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)`,
            maskImage: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)`
          }} />
          
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 60%)', filter: 'blur(60px)' }}
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 80, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — Bio */}
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Where Code Meets"
              highlight="Creativity"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-5"
            >
              <p className="font-inter text-white/65 text-lg leading-relaxed">
                I'm a Computer Science & Design student driven by a deep curiosity at the intersection of{' '}
                <em className="font-instrument italic text-white/90 not-italic">artificial intelligence</em> and{' '}
                <em className="font-instrument italic text-white/90 not-italic">human experience</em>.
              </p>
              <p className="font-inter text-white/55 leading-relaxed">
                My work spans building neural networks that see and reason, designing interfaces that feel intuitive,
                and researching how AI systems can be made more interpretable and fair. I believe the best technology
                is both technically rigorous and beautifully crafted.
              </p>
              <p className="font-inter text-white/55 leading-relaxed">
                When not deep in a codebase or paper, you'll find me sketching UI concepts, exploring generative art,
                or building side projects that challenge the boundaries of what's possible.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-4"
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl glass border border-accent-primary/20">
                  <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                  <span className="font-inter text-sm text-white/70">Available for internships & collaborations</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                className="glass gradient-border rounded-2xl p-7 flex flex-col gap-2"
              >
                <span className="font-jakarta font-black text-4xl md:text-5xl text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-inter text-sm text-white/50 leading-snug">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
