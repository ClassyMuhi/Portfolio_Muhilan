import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { X, ArrowUpRight, Radio, Zap, Database, Globe, Cpu, Activity, Signal } from 'lucide-react';

const Github = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const features = [
  { icon: Radio,    title: 'Wide-Band Monitoring',       desc: 'Monitors radio-frequency activity across a broad range of the electromagnetic spectrum in real-time.',   color: '#06B6D4' },
  { icon: Cpu,      title: 'SDR Signal Acquisition',     desc: 'Software Defined Radio hardware captures raw RF signals, replacing expensive dedicated hardware.',         color: '#3B82F6' },
  { icon: Activity, title: 'Anomaly Detection',          desc: 'Automated pipeline detects unusual signal events and flags them for further analysis.',                   color: '#8B5CF6' },
  { icon: Database, title: 'Data Logging & Analysis',    desc: 'Continuous spectrum data is logged and visualized, enabling FFT analysis and waterfall plot review.',     color: '#06B6D4' },
  { icon: Signal,   title: 'Spectrum Analysis',          desc: 'Real-time FFT plots and spectrograms reveal signal structure, interference patterns, and events.',         color: '#3B82F6' },
  { icon: Globe,    title: 'Scalable Network Vision',    desc: 'Architecture designed for expansion into a distributed multi-station observation network.',               color: '#8B5CF6' },
];

const applications = [
  'Radio astronomy research',
  'Satellite and atmospheric monitoring',
  'Electromagnetic spectrum analysis',
  'Educational and scientific experimentation',
  'Detection of unusual radio-frequency events',
];

const techStack = [
  { name: 'Software Defined Radio (SDR)', color: '#06B6D4' },
  { name: 'GNU Radio',    color: '#3B82F6' },
  { name: 'Python',       color: '#8B5CF6' },
  { name: 'Signal Processing', color: '#06B6D4' },
  { name: 'Radio Astronomy',   color: '#3B82F6' },
  { name: 'Machine Learning',  color: '#8B5CF6' },
  { name: 'Data Analysis',     color: '#06B6D4' },
  { name: 'FFT / Spectral Analysis', color: '#3B82F6' },
];

const challenges = [
  {
    number: '01',
    challenge: 'Cost barrier in radio astronomy',
    solution: 'Leveraged consumer-grade RTL-SDR dongles and open-source GNU Radio software to build a fully functional observation system under ₹6,000.',
  },
  {
    number: '02',
    challenge: 'Noise & interference in signal capture',
    solution: 'Applied digital filtering, gain calibration, and band-pass filters in the signal processing pipeline to isolate meaningful RF events from background noise.',
  },
  {
    number: '03',
    challenge: 'Automated anomaly identification',
    solution: 'Designed a rule-based anomaly detection layer that compares live spectrum data against baseline noise floor profiles and flags statistically significant deviations.',
  },
];

const futureWork = [
  'Distributed multi-station observation network',
  'AI-powered signal classification using ML models',
  'Optical sensor integration for multi-modal observation',
  'Real-time anomaly tracking dashboard',
  'Citizen science data-sharing platform',
  'Integration with global radio event catalogues',
];

const milestones = [
  { value: '< ₹6K', label: 'Build Cost',          sub: 'Accessible to students & researchers' },
  { value: 'SDR',   label: 'Core Technology',      sub: 'Software Defined Radio' },
  { value: 'GNU',   label: 'Signal Processing',    sub: 'GNU Radio + Python pipeline' },
  { value: 'Auto',  label: 'Anomaly Detection',    sub: 'Automated real-time pipeline' },
];

// ─────────────────────────────────────────────
// Animated Spectrum Bars (decorative hero element)
// ─────────────────────────────────────────────
function SpectrumBars() {
  const bars = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    height: 15 + Math.random() * 70,
    delay:  Math.random() * 2,
    dur:    0.4 + Math.random() * 0.8,
  }));
  return (
    <div className="flex items-end gap-[2px] h-16 w-full opacity-60">
      {bars.map(b => (
        <motion.div
          key={b.id}
          className="flex-1 rounded-sm"
          style={{ height: b.height + '%', background: 'linear-gradient(to top, #06B6D4, #3B82F6)' }}
          animate={{ height: [`${b.height}%`, `${15 + Math.random() * 70}%`, `${b.height}%`] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Animated Hero Visual — Radio Dish + Spectrum UI
// ─────────────────────────────────────────────
function AnimatedHeroVisual() {
  // Waterfall rows (simulated spectrum)
  const waterfallRows = Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 32 }, (_, col) => ({
      id: `${row}-${col}`,
      intensity: Math.random(),
      delay: row * 0.05 + col * 0.02,
    }))
  );

  const signalBars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    h: 10 + Math.random() * 80,
    delay: i * 0.04,
    dur: 0.5 + Math.random() * 0.7,
  }));

  return (
    <div className="relative w-full rounded-3xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #05080f, #080d16)', border: '1px solid rgba(6,182,212,0.2)', boxShadow: '0 0 80px rgba(6,182,212,0.12), inset 0 0 40px rgba(6,182,212,0.03)' }}>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative p-6 md:p-8">
        {/* Top bar — frequency header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-widest">◉ ASTRA · LIVE ACQUISITION</span>
          </div>
          <span className="font-mono text-[10px] text-white/30">433.920 MHz</span>
        </div>

        {/* SVG Dish */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 280 160" className="w-full max-w-xs" style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.3))' }}>
            <defs>
              <radialGradient id="dishGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#1e3a4a" />
                <stop offset="100%" stopColor="#0a1520" />
              </radialGradient>
              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
              </linearGradient>
              <filter id="dishGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* Dish bowl */}
            <ellipse cx="140" cy="70" rx="100" ry="30" fill="url(#dishGrad)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" filter="url(#dishGlow)" />
            {/* Dish rim */}
            <ellipse cx="140" cy="70" rx="100" ry="30" fill="none" stroke="url(#rimGrad)" strokeWidth="2" />
            {/* Dish surface lines */}
            {[-60, -30, 0, 30, 60].map(dx => (
              <path key={dx} d={`M ${140+dx} ${70 - Math.sqrt(Math.max(0, 10000 - dx*dx))*0.30} Q ${140} 40 ${140-dx} ${70 - Math.sqrt(Math.max(0, 10000 - (dx)*(dx)))*0.30}`}
                fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="0.8" />
            ))}

            {/* Support strut */}
            <line x1="140" y1="70" x2="140" y2="130" stroke="rgba(6,182,212,0.5)" strokeWidth="2.5" />
            <rect x="120" y="128" width="40" height="8" rx="3" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />

            {/* Radiating signal rings */}
            {[0, 1, 2].map(r => (
              <motion.ellipse key={r} cx="140" cy="55" rx={15 + r * 20} ry={5 + r * 6}
                fill="none" stroke="#06B6D4" strokeWidth="0.8"
                initial={{ opacity: 0, scaleX: 0.5 }} animate={{ opacity: [0, 0.6, 0], scaleX: [0.5, 1.5] }}
                transition={{ duration: 2, delay: r * 0.6, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformOrigin: '140px 55px' }} />
            ))}

            {/* Feed horn */}
            <circle cx="140" cy="55" r="6" fill="#06B6D4" opacity="0.8" filter="url(#dishGlow)" />
            <motion.circle cx="140" cy="55" r="10" fill="none" stroke="#06B6D4" strokeWidth="1"
              animate={{ r: [8, 16], opacity: [0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </svg>
        </div>

        {/* Spectrum waterfall */}
        <div className="mb-4 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
          <div className="px-3 py-2 flex items-center justify-between" style={{ background: 'rgba(6,182,212,0.06)' }}>
            <span className="font-mono text-[9px] text-cyan-400/70 tracking-widest">WATERFALL · 25–1750 MHz</span>
            <span className="font-mono text-[9px] text-white/30">SNR: 14.2 dB</span>
          </div>
          <div className="p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
            {waterfallRows.map((row, ri) => (
              <div key={ri} className="flex gap-[1px] mb-[1px]">
                {row.map(cell => {
                  const hot = cell.intensity > 0.75;
                  const mid = cell.intensity > 0.45;
                  const bg  = hot ? '#06B6D4' : mid ? '#1e4d6b' : '#0a1520';
                  const op  = hot ? 0.9 : mid ? 0.6 : 0.3;
                  return (
                    <motion.div key={cell.id} className="flex-1 rounded-[1px]" style={{ height: 8, background: bg, opacity: op }}
                      animate={{ opacity: [op, op * 0.4, op] }}
                      transition={{ duration: 1.5 + Math.random(), delay: cell.delay, repeat: Infinity }} />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Live signal strength bars */}
        <div className="flex items-end gap-[2px] h-10">
          {signalBars.map(b => (
            <motion.div key={b.id} className="flex-1 rounded-sm"
              style={{ background: 'linear-gradient(to top, #06B6D4, #3B82F6)' }}
              animate={{ height: [`${b.h}%`, `${10 + Math.random() * 80}%`, `${b.h}%`] }}
              transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>

        {/* Bottom status */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <span className="font-mono text-[9px] text-green-400/80">ANOMALY DETECTOR ACTIVE</span>
          </div>
          <span className="font-mono text-[9px] text-white/25">ASTRA v0.1</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Particle Background (cyan tint)
// ─────────────────────────────────────────────
function HeroParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2, duration: 5 + Math.random() * 6, delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-cyan-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [-20, -60], x: [0, (Math.random() - 0.5) * 30] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ProjectAstraPage({ onClose }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  const accent  = '#06B6D4';
  const accent2 = '#3B82F6';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: '#05080f' }}
    >
      <div ref={scrollRef} className="h-full overflow-y-auto">

        {/* ── Close ── */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          onClick={onClose}
          className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
        ><X size={18} /></motion.button>

        {/* ═══════════════════════════════
            § 1 — HERO
        ═══════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(6,182,212,0.09) 0%, transparent 70%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 35% at 10% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          {/* Scan line */}
          <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
          <HeroParticles />

          <div className="relative max-w-7xl mx-auto w-full pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}
                className="inline-flex items-center gap-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">
                  Radio Astronomy • SDR Research
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.2}
                className="font-jakarta font-black text-6xl md:text-8xl leading-[0.88] tracking-tight text-white mb-4">
                PROJECT<br /><span style={{ color: accent }}>ASTRA</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.3}
                className="font-inter text-xl text-white/50 mt-5 mb-3 max-w-xl leading-relaxed">
                Low-Cost Radio Telescope & RF Signal Research
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.38}
                className="font-inter text-base text-white/30 mb-8 max-w-xl leading-relaxed">
                Designing a functional radio observation system under&nbsp;<span className="text-cyan-400 font-semibold">₹6,000</span> using Software Defined Radio technology, making radio astronomy accessible to students and independent researchers.
              </motion.p>

              {/* Budget highlight */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.44}
                className="inline-flex items-center gap-4 mb-8 px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)' }}>
                <span className="font-jakarta font-black text-3xl text-cyan-400">₹6,000</span>
                <div>
                  <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/70">Target Build Cost</p>
                  <p className="font-inter text-sm text-white/50">Fully functional radio observation system</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.52}
                className="flex flex-wrap gap-4 mb-10">
                <a href="https://github.com" target="_blank" rel="noreferrer"
                  className="btn-primary gap-2"
                  style={{ background: 'linear-gradient(135deg, #06B6D4, #0284C7)', border: 'none' }}>
                  <Github size={16} /> View Source
                </a>
                <button
                  onClick={() => document.getElementById('astra-features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline gap-2"
                  style={{ borderColor: 'rgba(6,182,212,0.4)', color: '#06B6D4' }}>
                  Explore Research
                </button>
              </motion.div>

              {/* Live spectrum animation */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.6}
                className="rounded-2xl overflow-hidden p-4"
                style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)' }}>
                <p className="font-mono text-[10px] text-cyan-400/50 mb-3 tracking-widest">◉ LIVE SPECTRUM · 433 MHz BAND</p>
                <SpectrumBars />
              </motion.div>
            </div>

            {/* Right — hero visual */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.5), transparent 70%)' }} />
              <AnimatedHeroVisual />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-16 flex items-center gap-3">
            <motion.div className="w-px h-16 origin-top"
              style={{ background: 'linear-gradient(to bottom, rgba(6,182,212,0.8), transparent)' }}
              animate={{ scaleY: [0, 1] }} transition={{ duration: 1, delay: 1.5 }} />
            <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-white/30">Scroll to explore</span>
          </motion.div>
        </section>

        {/* ═══════════════════════════════
            § 2 — RESEARCH OVERVIEW
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">01 — Research Overview</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3 mb-6">
                Making Radio Astronomy <span style={{ color: accent }}>Accessible</span>
              </h2>
              <p className="font-inter text-white/55 text-lg leading-relaxed max-w-3xl">
                Traditional radio telescope setups require expensive hardware costing tens of thousands of rupees. Project Astra explores whether a functional radio observation system—capable of monitoring RF spectrum, detecting signal anomalies, and logging astronomical data—can be built for under ₹6,000 using consumer SDR hardware and open-source software.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {/* Research question */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(circle at 0% 0%, rgba(6,182,212,0.3), transparent 60%)' }} />
                <div className="relative">
                  <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 block mb-4">Research Question</span>
                  <p className="font-instrument italic text-xl text-white/85 leading-relaxed">
                    "Can a fully functional radio observation and anomaly detection system be built for under ₹6,000 using Software Defined Radio technology?"
                  </p>
                </div>
              </motion.div>

              {/* Key stats */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-white/8">
                <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 block mb-6">System Specifications</span>
                <div className="space-y-4">
                  {[
                    { label: 'Receiver',        value: 'RTL-SDR Dongle (RTL2832U)' },
                    { label: 'Software',         value: 'GNU Radio + Python' },
                    { label: 'Frequency Range',  value: '25 MHz – 1.75 GHz' },
                    { label: 'Detection Method', value: 'Automated anomaly engine' },
                    { label: 'Build Cost',        value: '< ₹6,000' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start justify-between gap-4 pb-4 border-b border-white/6 last:border-0 last:pb-0">
                      <span className="font-inter text-white/40 text-sm">{item.label}</span>
                      <span className="font-inter text-white/80 text-sm font-medium text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 3 — KEY FEATURES
        ═══════════════════════════════ */}
        <section id="astra-features" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">02 — Key Features</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">System Capabilities</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="glass rounded-2xl p-6 border border-white/8 hover:border-cyan-500/25 transition-all duration-400 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 0% 100%, ${f.color}08, transparent 60%)` }} />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                        <Icon size={18} style={{ color: f.color }} />
                      </div>
                      <h3 className="font-jakarta font-bold text-white mb-2">{f.title}</h3>
                      <p className="font-inter text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 4 — TECH STACK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">03 — Technology Stack</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Tools & Technologies</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t, i) => (
                <motion.div key={t.name}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full font-inter text-sm font-semibold transition-all duration-300 cursor-default"
                  style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}30` }}>
                  {t.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 5 — PIPELINE / IMPLEMENTATION
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">04 — Implementation</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Signal Pipeline</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* SDR acquisition code */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden border border-white/8">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-xs text-white/40">sdr_capture.py</span>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto">
{`import rtlsdr
import numpy as np

sdr = rtlsdr.RtlSdr()
sdr.sample_rate   = 2.4e6   # 2.4 MHz
sdr.center_freq   = 433e6   # 433 MHz
sdr.freq_correction = 60    # PPM correction
sdr.gain = 'auto'

def capture_samples(n=256*1024):
    samples = sdr.read_samples(n)
    # Compute power spectrum (FFT)
    fft = np.fft.fftshift(np.fft.fft(samples))
    power_db = 20 * np.log10(np.abs(fft) + 1e-10)
    return power_db

sdr.close()`}
                  </pre>
                </div>
                <div className="px-6 pb-6">
                  <p className="font-inter text-white/45 text-sm">RTL-SDR samples raw IQ data. FFT converts time-domain samples into a frequency-domain power spectrum for analysis.</p>
                </div>
              </motion.div>

              {/* Anomaly detection code */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden border border-white/8">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-xs text-white/40">anomaly_detector.py</span>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto">
{`def detect_anomalies(power_db, baseline,
                     threshold_db=10.0):
    """
    Flag frequency bins where power exceeds
    the baseline noise floor by threshold_db.
    """
    delta = power_db - baseline
    anomaly_mask = delta > threshold_db
    
    anomaly_freqs = np.where(anomaly_mask)[0]
    events = []
    for idx in anomaly_freqs:
        events.append({
            "freq_bin":   idx,
            "excess_db":  delta[idx],
            "timestamp":  time.time()
        })
    return events`}
                  </pre>
                </div>
                <div className="px-6 pb-6">
                  <p className="font-inter text-white/45 text-sm">Anomaly detection compares live power spectrum against the calibrated noise baseline. Spikes above threshold are flagged as events.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 6 — APPLICATIONS
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.07), rgba(59,130,246,0.04))', border: '1px solid rgba(6,182,212,0.2)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 0% 100%, rgba(6,182,212,0.06), transparent)' }} />
              <div className="relative grid md:grid-cols-2 gap-12">
                <div>
                  <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 block mb-4">05 — Applications</span>
                  <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-6">Use Cases</h2>
                  <div className="space-y-4">
                    {applications.map((a, i) => (
                      <motion.div key={a} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                        className="flex items-start gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2 group-hover:scale-150 transition-transform duration-300" />
                        <span className="font-inter text-white/65 text-sm leading-relaxed group-hover:text-white/90 transition-colors">{a}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400 block mb-4">Future Vision</span>
                  <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-6">Distributed Network</h2>
                  <p className="font-inter text-white/55 leading-relaxed text-sm">
                    The long-term vision is to expand Project Astra into a distributed observation network—multiple low-cost stations sharing data in real-time, with AI-powered signal classification, optical sensor integration, and a citizen-science platform for global collaboration in radio event detection.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 7 — CHALLENGES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">06 — Engineering Challenges</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Problems Solved</h2>
            </motion.div>
            <div className="space-y-5">
              {challenges.map((c, i) => (
                <motion.div key={c.number} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className="glass rounded-2xl p-7 border border-white/8 hover:border-cyan-500/20 transition-all duration-300 grid md:grid-cols-[auto_1fr_1fr] gap-6 items-start">
                  <span className="font-jakarta font-black text-5xl text-white/8 select-none">{c.number}</span>
                  <div>
                    <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-red-400/70 mb-2">Challenge</p>
                    <p className="font-jakarta font-semibold text-white/80">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/70 mb-2">Solution</p>
                    <p className="font-inter text-white/60 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 8 — RESULTS / MILESTONES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">07 — Project Milestones</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">What Was Achieved</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {milestones.map((m, i) => (
                <motion.div key={m.label}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                  className="glass rounded-2xl p-6 border border-white/8 text-center hover:border-cyan-500/25 transition-colors duration-300">
                  <p className="font-jakarta font-black text-2xl text-cyan-400 mb-1 leading-tight">{m.value}</p>
                  <p className="font-inter text-xs text-white/70 font-semibold mb-1">{m.label}</p>
                  <p className="font-inter text-[10px] text-white/35 leading-snug">{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 9 — FUTURE WORK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="glass rounded-2xl p-10 md:p-14 border border-white/8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-40"
                style={{ background: 'radial-gradient(ellipse 50% 50% at 100% 0%, rgba(6,182,212,0.12), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 block mb-3">08 — Research Roadmap</span>
                <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-10">Future Vision</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {futureWork.map((item, i) => (
                    <motion.div key={item}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                      className="flex items-center gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      <span className="font-inter text-white/65 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <div className="px-6 md:px-16 pb-20 pt-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/6">
            <p className="font-inter text-white/30 text-sm">Project Astra · Radio Telescope Research · SDR</p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="btn-outline text-xs px-5 py-2.5 rounded-full gap-2"
                style={{ borderColor: 'rgba(6,182,212,0.4)', color: '#06B6D4' }}>
                <Github size={13} /> Source Code
              </a>
              <button onClick={onClose} className="btn-primary text-xs px-5 py-2.5 rounded-full gap-2"
                style={{ background: 'linear-gradient(135deg, #06B6D4, #0284C7)', border: 'none' }}>
                Back to Portfolio <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
