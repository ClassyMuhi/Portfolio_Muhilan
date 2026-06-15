import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  X, BookOpen, ArrowUpRight, ChevronRight, Zap, Eye, Brain, Cpu,
  BarChart2, Layers, Maximize2, CheckCircle, XCircle, AlertTriangle, FileText,
} from 'lucide-react';

import screenUpload from '../../assets/Screenshot (404).png';
import screenProcess from '../../assets/Screenshot (405).png';
import screenResults from '../../assets/Screenshot (406).png';
import screenMatrix from '../../assets/Screenshot (407).png';

const Github = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const heroMetrics = [
  { value: '93.2%', label: 'Accuracy', sub: 'FaceForensics++' },
  { value: '91.8%', label: 'Precision', sub: 'On held-out set' },
  { value: '94.1%', label: 'Recall',    sub: 'Synthetic media' },
  { value: '24 FPS', label: 'Real-Time', sub: 'Inference speed' },
];

const contributions = [
  {
    icon: Eye,
    title: 'Blink Dynamics Analysis',
    badge: 'EAR',
    color: '#3B82F6',
    desc: 'Tracks Eye Aspect Ratio across frames to identify unnatural blink rates and static eyelids characteristic of GAN-generated faces.',
    formula: 'EAR = (‖p₂−p₆‖ + ‖p₃−p₅‖) / (2·‖p₁−p₄‖)',
  },
  {
    icon: Zap,
    title: 'Audio-Visual Synchrony',
    badge: 'MAR + VSR',
    color: '#60A5FA',
    desc: 'Measures Mouth Aspect Ratio against inferred phoneme timings. Deepfakes routinely exhibit desynchronized lip geometry versus spoken audio.',
    formula: 'MAR = (‖p₂−p₈‖ + ‖p₃−p₇‖ + ‖p₄−p₆‖) / (2·‖p₁−p₅‖)',
  },
  {
    icon: Layers,
    title: 'Texture Forensics',
    badge: 'LAPLACIAN',
    color: '#818CF8',
    desc: 'Laplacian variance over the face ROI reveals high-frequency smoothing artifacts introduced by diffusion/GAN synthesis pipelines.',
    formula: 'L(x,y) = ∂²f/∂x² + ∂²f/∂y²',
  },
  {
    icon: Brain,
    title: 'Biological Veto Constraint',
    badge: 'VETO',
    color: '#34D399',
    desc: 'A single strong biological anomaly can veto the weighted ensemble, mirroring how forensic analysts apply domain heuristics.',
    formula: 'Verdict = FAKE if ∃ veto(EAR) ∨ fused_score > θ',
  },
  {
    icon: Cpu,
    title: 'Weighted Fusion Engine',
    badge: 'ENSEMBLE',
    color: '#F59E0B',
    desc: 'All three signal scores are combined via a tunable weighted sum, producing an explainable, human-auditable decision confidence.',
    formula: 'S = w₁·EAR + w₂·MAR + w₃·Lap ; (w₁,w₂,w₃)=(0.35,0.35,0.30)',
  },
  {
    icon: FileText,
    title: 'Explainable Decision Report',
    badge: 'XAI',
    color: '#EC4899',
    desc: 'Each verdict ships with a per-channel breakdown and confidence band, providing forensic evidence that can be reviewed by a human analyst.',
    formula: 'Explainability ≡ {channel_i, weight_i, anomaly_flag_i}',
  },
];

// Comparison table
const comparisonModels = ['XceptionNet', 'EfficientNet-B4', 'LipForensics', 'Our Method'];
const comparisonProps = [
  { label: 'Explainability',                values: [false, false, false, true]  },
  { label: 'No Training Required',          values: [false, false, false, true]  },
  { label: 'Context-Aware Detection',       values: [false, false, true,  true]  },
  { label: 'Biological Realism Constraints',values: [false, false, false, true]  },
  { label: 'Multi-Signal Fusion',           values: [false, false, false, true]  },
  { label: 'Real-Time Capable',             values: [true,  true,  false, true]  },
  { label: 'Open Source',                   values: [true,  false, false, true]  },
];

const performanceRows = [
  { model: 'XceptionNet',     acc: 80, pre: 78, rec: 75, color: '#475569' },
  { model: 'EfficientNet-B4', acc: 84, pre: 82, rec: 79, color: '#475569' },
  { model: 'LipForensics',    acc: 88, pre: 86, rec: 84, color: '#475569' },
  { model: 'Our Method',      acc: 93.2, pre: 91.8, rec: 94.1, color: '#3B82F6' },
];

const archPipeline = [
  { label: 'Video Input',                   desc: 'Raw MP4 / stream frame',         cols: 1 },
  { label: 'YOLOv8 Face Detection',         desc: 'Bounding box extraction',        cols: 1 },
  { label: 'MediaPipe Face Mesh',           desc: '468 3D landmarks per frame',     cols: 1 },
  { label: 'Signal Extraction',             desc: 'EAR · MAR · Laplacian parallel', cols: 3 },
  { label: 'Weighted Fusion Engine',        desc: 'Ensemble + Veto Logic',          cols: 1 },
  { label: 'REAL / SUSPICIOUS / FAKE',      desc: 'Explainable verdict + report',   cols: 1 },
];

const galleryImages = [
  { src: screenResults, label: 'Analysis Results Dashboard', desc: 'System Module Breakdown' },
  { src: screenUpload,  label: 'Media Upload Interface',     desc: 'New Forensic Scan' },
  { src: screenProcess, label: 'Real-time Processing View',  desc: 'Analysis Pipeline' },
  { src: screenMatrix,  label: 'Frame Anomaly Timeline',     desc: 'Explainability Matrix' },
];

const techStack = [
  { name: 'Python',           color: '#3B82F6' },
  { name: 'YOLOv8',           color: '#60A5FA' },
  { name: 'OpenCV',           color: '#34D399' },
  { name: 'MediaPipe',        color: '#818CF8' },
  { name: 'NumPy',            color: '#F59E0B' },
  { name: 'Computer Vision',  color: '#EC4899' },
  { name: 'Signal Processing',color: '#8B5CF6' },
  { name: 'Explainable AI',   color: '#3B82F6' },
  { name: 'Multimedia Forensics', color: '#06B6D4' },
];

const researchImpact = [
  'Human-auditable AI decisions with per-channel evidence',
  'Robust to video compression and encoding artifacts',
  'Zero training required — fully rule-based signal analysis',
  'Applicable to real-time interview monitoring scenarios',
  'Forensic-grade explainable decision report generation',
  'Veto mechanism prevents single-signal false positives',
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function Lightbox({ src, label, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute -top-10 right-0 text-white/50 hover:text-white flex items-center gap-2 font-inter text-xs transition-colors">
          <X size={15} /> Close
        </button>
        <img src={src} alt={label} className="w-full rounded-2xl shadow-2xl" />
        {label && <p className="mt-4 text-center font-inter text-sm text-white/40">{label}</p>}
      </motion.div>
    </motion.div>
  );
}

function HeroParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2, duration: 4 + Math.random() * 6, delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-blue-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [-20, -60], x: [0, (Math.random() - 0.5) * 40] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }} />
      ))}
    </div>
  );
}

function PerformanceBar({ value, max = 100, color, delay = 0 }) {
  return (
    <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function DeepfakeDetectionPage({ onClose }) {
  const scrollRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') { if (lightbox) setLightbox(null); else onClose?.(); } };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox, onClose]);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: '#070b0a' }}
    >
      <div ref={scrollRef} className="h-full overflow-y-auto">

        {/* ── Close ── */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          onClick={onClose}
          className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <X size={18} />
        </motion.button>

        {/* ═══════════════════════════════
            § 1 — HERO
        ═══════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.13) 0%, transparent 70%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <HeroParticles />
          <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />

          <div className="relative max-w-7xl mx-auto w-full pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              {/* Publication badge */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.05}
                className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full"
                style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.30)' }}>
                <BookOpen size={12} className="text-blue-400" />
                <span className="font-inter text-[11px] font-bold tracking-[0.25em] uppercase text-blue-400">
                  Research Publication · Computer Vision · XAI
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.15}
                className="font-jakarta font-black text-5xl md:text-7xl leading-[0.9] tracking-tight text-white mb-4">
                MULTIMODAL<br />
                <span style={{ color: '#3B82F6' }}>DEEPFAKE</span><br />
                DETECTION
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.28}
                className="font-inter text-lg text-white/50 mt-5 mb-3 max-w-xl leading-relaxed">
                Explainable AI-Based Detection using Blink Analysis, Lip-Sync Verification, and Texture Forensics.
              </motion.p>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.35}
                className="font-inter text-sm text-white/30 mb-8 max-w-xl leading-relaxed">
                A training-free multimodal forensic framework that mimics how human analysts evaluate manipulated media — fusing biological signals with texture forensics into one explainable decision engine.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.44}
                className="flex flex-wrap gap-4">
                <a href="https://github.com/ClassyMuhi/Multimodal-deepfake-detection" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-inter text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)' }}>
                  <Github size={15} /> View Source Code
                </a>
                <button
                  onClick={() => document.getElementById('df-arch')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-inter text-sm font-semibold text-white/60 hover:text-white transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <BookOpen size={15} /> System Architecture
                </button>
              </motion.div>
            </div>

            {/* Right — metric cards */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {heroMetrics.map((m, i) => (
                    <motion.div key={m.label}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="glass rounded-2xl p-6 border border-white/8 text-center relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08), transparent 70%)' }} />
                      <p className="font-jakarta font-black text-3xl text-white mb-1">{m.value}</p>
                      <p className="font-inter text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{m.label}</p>
                      <p className="font-inter text-[10px] text-white/30">{m.sub}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                  className="text-center"
                  style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: '12px', padding: '10px 16px' }}>
                  <p className="font-inter text-[11px] text-white/40">
                    Evaluated on <span className="text-blue-400 font-semibold">FaceForensics++</span> benchmark dataset
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 2 — RESEARCH MOTIVATION
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">01 — Research Motivation</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3 mb-6">
                Why Existing Detectors <span style={{ color: '#3B82F6' }}>Fail</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-red-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  style={{ background: 'radial-gradient(circle at 100% 0%, #ef4444, transparent 70%)' }} />
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-red-400">Existing Approaches</span>
                </div>
                {[
                  'Black-box CNN/Transformer architectures',
                  'Poor cross-dataset generalisation',
                  'Single-modality vulnerability',
                  'Zero forensic explainability',
                  'Brittle to adversarial compression',
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                    <XCircle size={14} className="text-red-400/70 flex-shrink-0" />
                    <span className="font-inter text-white/55 text-sm">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-blue-500/25 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(circle at 70% 20%, rgba(59,130,246,0.15), transparent 60%)' }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-blue-400">This Research</span>
                  </div>
                  {[
                    'Interpretable multimodal forensic framework',
                    'Mimics human analyst evaluation process',
                    'Biological + forensic signal fusion',
                    'Full per-channel decision explainability',
                    'Training-free — zero dataset dependency',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                      <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                      <span className="font-inter text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 3 — RESEARCH QUESTION
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))', border: '1px solid rgba(59,130,246,0.22)' }}>
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.06), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400 block mb-6">02 — Research Question</span>
                <p className="font-instrument italic text-2xl md:text-4xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  "Can multiple independent biological and forensic signals be fused into a single explainable, human-auditable deepfake detection framework?"
                </p>
                <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 4 — RESEARCH CONTRIBUTIONS
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">03 — Research Contributions</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">The Five Innovations</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {contributions.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div key={c.title}
                    variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="glass rounded-2xl p-7 border border-white/8 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${c.color}10, transparent 65%)` }} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}>
                          <Icon size={20} style={{ color: c.color }} />
                        </div>
                        <span className="font-inter text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full"
                          style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}>
                          {c.badge}
                        </span>
                      </div>
                      <h3 className="font-jakarta font-bold text-white text-base mb-2">{c.title}</h3>
                      <p className="font-inter text-white/45 text-sm leading-relaxed mb-4">{c.desc}</p>
                      <div className="rounded-xl px-4 py-3 font-mono text-[11px] text-blue-300/70 leading-relaxed"
                        style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                        {c.formula}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 5 — SYSTEM ARCHITECTURE
        ═══════════════════════════════ */}
        <section id="df-arch" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">04 — System Architecture</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Detection Pipeline</h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="glass rounded-2xl p-8 md:p-12 border border-white/8">
              <div className="max-w-3xl mx-auto space-y-4">
                {archPipeline.map((step, i) => {
                  const isMulti = step.cols === 3;
                  return (
                    <div key={step.label}>
                      {isMulti ? (
                        /* Three-branch parallel */
                        <div>
                          <div className="flex justify-center mb-2">
                            <div className="w-px h-6 bg-gradient-to-b from-blue-500/50 to-transparent" />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {['EAR — Blink Analysis', 'MAR — Lip Sync', 'Laplacian — Texture'].map((branch, bi) => (
                              <motion.div key={branch}
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 + bi * 0.08 }} viewport={{ once: true }}
                                className="rounded-xl py-4 px-3 text-center"
                                style={{ background: 'rgba(96,165,250,0.10)', border: '1px solid rgba(96,165,250,0.25)' }}>
                                <p className="font-jakarta font-semibold text-white/90 text-xs">{branch}</p>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex justify-center mt-2">
                            <div className="w-px h-6 bg-gradient-to-b from-transparent to-blue-500/50" />
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                          {i > 0 && (
                            <div className="flex justify-center mb-2">
                              <div className="w-px h-5 bg-gradient-to-b from-blue-500/40 to-transparent" />
                            </div>
                          )}
                          <div className="rounded-xl py-4 px-6 text-center"
                            style={{
                              background: i === archPipeline.length - 1
                                ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(99,102,241,0.12))'
                                : 'rgba(59,130,246,0.12)',
                              border: i === archPipeline.length - 1
                                ? '1px solid rgba(59,130,246,0.50)'
                                : '1px solid rgba(59,130,246,0.30)',
                            }}>
                            <p className="font-jakarta font-bold text-white text-sm">{step.label}</p>
                            <p className="font-inter text-[10px] text-white/40 mt-0.5">{step.desc}</p>
                          </div>
                          {i < archPipeline.length - 1 && i !== 2 && (
                            <div className="flex justify-center mt-2">
                              <div className="w-px h-5 bg-gradient-to-b from-transparent to-blue-500/40" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 6 — COMPARISON TABLE
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">05 — Comparison with Existing Models</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Capability Matrix</h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden border border-white/8">
              {/* Header */}
              <div className="grid border-b border-white/8" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
                <div className="px-6 py-4">
                  <span className="font-inter text-xs font-bold text-white/30 uppercase tracking-wider">Capability</span>
                </div>
                {comparisonModels.map((m, i) => (
                  <div key={m} className={`px-4 py-4 text-center border-l border-white/6 ${i === 3 ? 'bg-blue-500/8' : ''}`}>
                    <span className={`font-jakarta font-bold text-xs ${i === 3 ? 'text-blue-400' : 'text-white/50'}`}>{m}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparisonProps.map((row, ri) => (
                <motion.div key={row.label}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: ri * 0.06 }} viewport={{ once: true }}
                  className="grid border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
                  <div className="px-6 py-4 flex items-center">
                    <span className="font-inter text-sm text-white/65">{row.label}</span>
                  </div>
                  {row.values.map((v, vi) => (
                    <div key={vi} className={`px-4 py-4 flex items-center justify-center border-l border-white/5 ${vi === 3 ? 'bg-blue-500/5' : ''}`}>
                      {v
                        ? <CheckCircle size={16} className="text-blue-400" />
                        : <div className="w-4 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                      }
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 7 — PERFORMANCE COMPARISON
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">06 — Performance Comparison</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Benchmark Results</h2>
              <p className="font-inter text-white/35 text-sm mt-2">FaceForensics++ evaluation · c23 compression level</p>
            </motion.div>

            <div className="space-y-5">
              {performanceRows.map((row, ri) => (
                <motion.div key={row.model}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={ri * 0.08} viewport={{ once: true }}
                  className={`glass rounded-2xl p-7 border transition-all duration-500 ${row.model === 'Our Method' ? 'border-blue-500/35 shadow-[0_0_40px_rgba(59,130,246,0.08)]' : 'border-white/8'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      {row.model === 'Our Method' && (
                        <span className="font-inter text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full text-blue-400"
                          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.30)' }}>
                          THIS RESEARCH
                        </span>
                      )}
                      <h3 className={`font-jakarta font-bold text-lg ${row.model === 'Our Method' ? 'text-white' : 'text-white/60'}`}>
                        {row.model}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6">
                      {[
                        { label: 'ACC', value: row.acc },
                        { label: 'PRE', value: row.pre },
                        { label: 'REC', value: row.rec },
                      ].map(m => (
                        <div key={m.label} className="text-right">
                          <p className={`font-jakarta font-black text-xl ${row.model === 'Our Method' ? 'text-blue-400' : 'text-white/50'}`}>
                            {m.value}%
                          </p>
                          <p className="font-inter text-[10px] text-white/30 tracking-wider">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Accuracy',  value: row.acc },
                      { label: 'Precision', value: row.pre },
                      { label: 'Recall',    value: row.rec },
                    ].map((m, mi) => (
                      <div key={m.label} className="flex items-center gap-4">
                        <span className="font-inter text-[10px] text-white/30 w-14 text-right">{m.label}</span>
                        <div className="flex-1">
                          <PerformanceBar value={m.value} color={row.color} delay={ri * 0.1 + mi * 0.07} />
                        </div>
                        <span className="font-mono text-[10px] text-white/40 w-10">{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════
            § 9 — RESEARCH IMPACT
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">08 — Research Impact</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Why It Matters</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {researchImpact.map((item, i) => (
                <motion.div key={item}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.07} viewport={{ once: true }}
                  className="flex items-start gap-3 glass rounded-xl px-5 py-5 border border-white/8 hover:border-blue-500/25 transition-all duration-300 group">
                  <CheckCircle size={15} className="text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-inter text-sm text-white/65 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 10 — RESEARCH GALLERY
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">09 — Research Gallery</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">System in Action</h2>
              <p className="font-inter text-white/40 text-base mt-3">Click any image to view full size.</p>
            </motion.div>

            {/* Featured large */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-6 rounded-3xl overflow-hidden border border-white/8 cursor-zoom-in group shadow-2xl relative"
              onClick={() => setLightbox(galleryImages[0])}>
              <img src={galleryImages[0].src} alt={galleryImages[0].label}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-1">{galleryImages[0].desc}</p>
                  <p className="font-jakarta font-bold text-white text-lg">{galleryImages[0].label}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={15} className="text-white" />
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {galleryImages.slice(1).map((img, i) => (
                <motion.div key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden border border-white/8 cursor-zoom-in group shadow-xl relative"
                  onClick={() => setLightbox(img)}>
                  <img src={img.src} alt={img.label}
                    className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-0.5">{img.desc}</p>
                      <p className="font-jakarta font-bold text-white text-sm">{img.label}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={12} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 11 — TECH STACK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">10 — Research Domains & Tools</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Built With</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t, i) => (
                <motion.div key={t.name}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full font-inter text-sm font-semibold cursor-default transition-all duration-300"
                  style={{ background: `${t.color}12`, color: '#93C5FD', border: `1px solid ${t.color}30` }}>
                  {t.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 12 — OUTCOME
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))', border: '1px solid rgba(59,130,246,0.22)' }}>
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.06), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400 block mb-6">11 — Outcome</span>
                <p className="font-instrument italic text-2xl md:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  "This research demonstrates that explainable, training-free deepfake detection is achievable by fusing biological signals and forensic texture analysis into a unified, human-auditable decision framework."
                </p>
                <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['Computer Vision', 'Explainable AI', 'Multimedia Forensics', 'Signal Processing', 'Research Engineering'].map(tag => (
                    <span key={tag} className="font-inter text-xs font-semibold px-4 py-2 rounded-full text-blue-300"
                      style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <div className="px-6 md:px-16 pb-20 pt-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/6">
            <p className="font-inter text-white/30 text-sm">Multimodal Deepfake Detection · Computer Vision · Explainable AI</p>
            <div className="flex gap-4">
              <a href="https://github.com/ClassyMuhi/Multimodal-deepfake-detection" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 font-inter text-xs font-semibold px-5 py-2.5 rounded-full text-white/60 hover:text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <Github size={13} /> Source Code
              </a>
              <button onClick={onClose}
                className="inline-flex items-center gap-2 font-inter text-xs font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-300"
                style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)' }}>
                Back to Portfolio <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
