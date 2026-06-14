import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, BookOpen, ArrowUpRight, ChevronRight, Zap, FileText, AlertTriangle, Activity, Database, Cpu } from 'lucide-react';

const Github = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const modules = [
  {
    icon: Cpu,
    label: 'OCR Layer',
    title: 'OCR Engine',
    color: '#10B981',
    badge: 'GEMINI API',
    description: 'Uses Google Gemini\'s multimodal vision capabilities to extract medication names directly from prescription images, handling varied handwriting, print styles, and image quality.',
    detail: 'Input: Prescription Image → Output: Raw Medication List',
  },
  {
    icon: Database,
    label: 'Normalization',
    title: 'Medicine Parser',
    color: '#34D399',
    badge: 'DATA CLEANING',
    description: 'Normalizes extracted medicine names, removes inconsistencies, resolves abbreviations, and validates medications against a curated pharmaceutical reference database.',
    detail: 'Input: Raw Medication List → Output: Standardized Medicine Records',
  },
  {
    icon: AlertTriangle,
    label: 'DDI Detection',
    title: 'Interaction Engine',
    color: '#F59E0B',
    badge: 'RISK DETECTION',
    description: 'Evaluates every pair of medications in the patient\'s profile against a structured drug-drug interaction (DDI) database, classifying each interaction as HIGH, MODERATE, or LOW severity.',
    detail: 'e.g. Warfarin + Aspirin → HIGH: Serious bleeding risk',
  },
  {
    icon: Activity,
    label: 'Risk Scoring',
    title: 'Polypharmacy Risk Engine',
    color: '#EF4444',
    badge: 'CLINICAL RISK',
    description: 'Calculates a composite polypharmacy risk score factoring medication count, severity-weighted interaction burden, and patient-specific profile characteristics.',
    detail: 'Output: Risk Score (Low / Moderate / High)',
  },
  {
    icon: FileText,
    label: 'Output',
    title: 'Clinical Report Generator',
    color: '#8B5CF6',
    badge: 'REPORTING',
    description: 'Assembles clinician-friendly reports in multiple formats—plain text, structured JSON, and printable PDF—summarising all detected interactions and the overall risk classification.',
    detail: 'Formats: Text · JSON · PDF',
  },
];

const techStack = [
  { name: 'Python', color: '#3B82F6' },
  { name: 'Google Gemini API', color: '#10B981' },
  { name: 'OCR Processing', color: '#34D399' },
  { name: 'JSON Drug Database', color: '#F59E0B' },
  { name: 'Clinical Rule Engine', color: '#EF4444' },
  { name: 'PDF Generation', color: '#8B5CF6' },
  { name: 'Healthcare AI', color: '#EC4899' },
];

const challenges = [
  {
    number: '01',
    challenge: 'Prescription OCR accuracy',
    solution: 'Implemented AI-powered OCR extraction using Google Gemini\'s vision model, which handles varied handwriting, print quality, and image distortions far better than traditional CV approaches.',
  },
  {
    number: '02',
    challenge: 'Medicine name inconsistencies',
    solution: 'Built a medicine normalization and validation layer that resolves abbreviations, brand/generic name variants, and OCR-introduced spelling errors before interaction analysis.',
  },
  {
    number: '03',
    challenge: 'Clinical risk interpretation',
    solution: 'Created a severity-based interaction framework that classifies each drug pair into HIGH / MODERATE / LOW severity, enabling clinicians to prioritise the most dangerous combinations first.',
  },
];

const workflowSteps = [
  { step: '01', title: 'Upload', desc: 'Prescription image is submitted to the pipeline.' },
  { step: '02', title: 'Extract', desc: 'OCR engine pulls medication names from the image.' },
  { step: '03', title: 'Analyse', desc: 'Interaction engine evaluates all drug combinations.' },
  { step: '04', title: 'Score', desc: 'Risk engine calculates the polypharmacy burden score.' },
  { step: '05', title: 'Report', desc: 'Clinical report is generated in PDF and JSON formats.' },
];

const futureWork = [
  'Larger pharmaceutical interaction database',
  'Integration with Electronic Health Records (EHR)',
  'Explainable AI recommendations',
  'Real-time physician monitoring dashboard',
  'Patient-specific risk modelling',
  'REST API for healthcare system integration',
];

// ─────────────────────────────────────────────
// Particle Background (green tint)
// ─────────────────────────────────────────────
function HeroParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [-20, -60], x: [0, (Math.random() - 0.5) * 40] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Pipeline Flow Diagram
// ─────────────────────────────────────────────
function PipelineDiagram() {
  const steps = [
    { label: 'Prescription Image', y: 0 },
    { label: 'OCR Extraction', y: 1 },
    { label: 'Medicine Parsing', y: 2 },
    { label: 'Drug Interaction Analysis', y: 3 },
    { label: 'Polypharmacy Risk Calculation', y: 4 },
    { label: 'Clinical Report Generation', y: 5 },
  ];
  const stepH = 80;
  const svgH = stepH * 5 + 80;

  const colors = ['#10B981', '#34D399', '#6EE7B7', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="relative w-full overflow-x-auto py-4">
      <svg viewBox={`0 0 600 ${svgH}`} className="w-full max-w-lg mx-auto" style={{ height: svgH }}>
        <defs>
          <filter id="pglow"><feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connecting lines */}
        {steps.slice(0, -1).map((_, idx) => (
          <motion.line
            key={idx}
            x1="300" y1={40 + idx * stepH + 20}
            x2="300" y2={40 + (idx + 1) * stepH - 20}
            stroke={colors[idx]}
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity={0.7}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
            viewport={{ once: true }}
          />
        ))}

        {/* Nodes */}
        {steps.map((step, idx) => {
          const cy = 40 + idx * stepH;
          const w = 220;
          const h = 40;
          const color = colors[idx];
          return (
            <motion.g key={idx} filter="url(#pglow)"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}>
              <rect x={300 - w / 2} y={cy - h / 2} width={w} height={h} rx="10"
                fill={`${color}15`} stroke={`${color}60`} strokeWidth="1" />
              <text x="300" y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="12" fontFamily="Inter, sans-serif" opacity={0.9}>
                {step.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────
export default function PolypharmacyEnginePage({ onClose }) {
  const scrollRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  const accent = '#10B981';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: '#060b09' }}
    >
      {/* Scrollable Container */}
      <div ref={scrollRef} className="h-full overflow-y-auto">

        {/* ── Close Button ── */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onClose}
          className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          aria-label="Close project page"
        >
          <X size={18} />
        </motion.button>

        {/* ═══════════════════════════════
            § 1 — HERO
        ═══════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 70%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(52,211,153,0.07) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <HeroParticles />

          {/* Scan-line animation */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative max-w-5xl mx-auto w-full pt-28 pb-20">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}
              className="inline-flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">
                Healthcare AI • Clinical Informatics
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.2}
              className="font-jakarta font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white mb-4"
            >
              POLY<span style={{ color: accent }}>PHARMACY</span><br />
              ENGINE
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0.35}
              className="font-inter text-lg md:text-xl text-white/50 mt-6 mb-3 max-w-2xl leading-relaxed"
            >
              AI-Powered Drug Interaction &amp; Polypharmacy Risk Analysis System
            </motion.p>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0.42}
              className="font-inter text-base text-white/35 mb-10 max-w-2xl leading-relaxed"
            >
              A clinical decision-support platform that analyzes patient medication profiles, detects dangerous drug-drug interactions, assesses polypharmacy risks, and generates comprehensive clinical reports.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.5}
              className="flex flex-wrap gap-4">
              <a href="https://github.com/ClassyMuhi/Polypharamacy_Engine" target="_blank" rel="noreferrer" className="btn-primary gap-2"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none' }}>
                <Github size={16} /> View Source Code
              </a>
              <button
                onClick={() => document.getElementById('poly-architecture')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline gap-2" style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>
                <BookOpen size={16} /> Explore Architecture
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-0 flex items-center gap-3">
              <motion.div
                className="w-px h-16 origin-top"
                style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.8), transparent)' }}
                animate={{ scaleY: [0, 1] }} transition={{ duration: 1, delay: 1.4 }} />
              <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-white/30">Scroll to explore</span>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 2 — THE PROBLEM
        ═══════════════════════════════ */}
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">01 — The Problem</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3 mb-6">
                Medication Errors Are a <span style={{ color: accent }}>Silent</span> Healthcare Threat
              </h2>
              <p className="font-inter text-white/55 text-lg leading-relaxed max-w-3xl">
                Polypharmacy—the simultaneous use of multiple medications—is increasingly common among elderly and chronic-care patients. As medication counts increase, so does the risk of dangerous drug interactions, adverse drug reactions, and clinical complications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {/* Risk factors */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-red-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-red-400">Risk Factors</span>
                </div>
                {['Dangerous drug interactions', 'Adverse drug reactions', 'Clinical complications', 'Increased hospitalization rates'].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 mb-4 last:mb-0">
                    <div className="w-7 h-7 rounded-full border border-red-500/30 flex items-center justify-center text-red-400 font-inter text-xs font-bold flex-shrink-0">{i + 1}</div>
                    <span className="font-inter text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Challenge */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-emerald-500/25 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 20%, rgba(16,185,129,0.15), transparent 60%)' }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-emerald-400">The Challenge</span>
                  </div>
                  <p className="font-instrument italic text-xl text-white/80 leading-relaxed">
                    "Can we automate medication review and risk assessment to support faster and safer clinical decisions?"
                  </p>
                  <div className="mt-6 w-12 h-px mx-0" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 3 — SOLUTION OVERVIEW
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.04))', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(16,185,129,0.05), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 block mb-6">02 — Solution Overview</span>
                <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-4">Building an Intelligent Medication Review Pipeline</h2>
                <p className="font-inter text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
                  The Polypharmacy Engine combines OCR, medicine normalization, interaction analysis, risk assessment, and report generation into a single automated workflow.
                </p>
                <div className="mt-10">
                  <PipelineDiagram />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 4 — SYSTEM ARCHITECTURE
        ═══════════════════════════════ */}
        <section id="poly-architecture" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">03 — System Architecture</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Pipeline Modules</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <motion.div
                    key={mod.title}
                    variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                    className="group glass rounded-2xl p-7 border border-white/8 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer relative overflow-hidden"
                    onClick={() => setActiveModal(mod)}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${mod.color}10, transparent 60%)` }} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
                            <Icon size={18} style={{ color: mod.color }} />
                          </div>
                          <div>
                            <p className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{mod.label}</p>
                            <h3 className="font-jakarta font-bold text-white text-base mt-0.5">{mod.title}</h3>
                          </div>
                        </div>
                        <span className="font-inter text-[9px] font-bold tracking-[0.2em] px-2 py-1 rounded-full"
                          style={{ background: `${mod.color}15`, color: mod.color, border: `1px solid ${mod.color}25` }}>
                          {mod.badge}
                        </span>
                      </div>
                      <p className="font-inter text-white/55 text-sm leading-relaxed mb-5">{mod.description}</p>
                      <div className="rounded-xl px-4 py-3 font-mono text-xs text-emerald-300/80"
                        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                        {mod.detail}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 5 — TECH STACK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">04 — Technology Stack</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Tools &amp; Libraries</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full font-inter text-sm font-semibold transition-all duration-300 cursor-default"
                  style={{ background: `${tech.color}12`, color: tech.color, border: `1px solid ${tech.color}30` }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 6 — IMPLEMENTATION
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">05 — Implementation</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Core Algorithms</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* OCR Code */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-2xl overflow-hidden border border-white/8">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-xs text-white/40">ocr_extractor.py</span>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto">
                    {`import google.generativeai as genai

def extract_medications(image_path):
    model = genai.GenerativeModel(
        "gemini-1.5-flash"
    )
    with open(image_path, "rb") as f:
        image_data = f.read()
    
    prompt = (
        "Extract all medication names "
        "from this prescription image."
    )
    response = model.generate_content(
        [prompt, {"mime_type": "image/jpeg",
                  "data": image_data}]
    )
    return parse_medications(response.text)`}
                  </pre>
                </div>
                <div className="px-6 pb-6">
                  <p className="font-inter text-white/45 text-sm">Gemini's vision model handles varied handwriting and print quality, far outperforming traditional OCR libraries on prescription images.</p>
                </div>
              </motion.div>

              {/* Interaction check */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }} className="glass rounded-2xl overflow-hidden border border-white/8">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-xs text-white/40">interaction_engine.py</span>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto">
                    {`def check_interactions(medications, db):
    interactions = []
    pairs = combinations(medications, 2)
    
    for drug_a, drug_b in pairs:
        result = db.lookup(drug_a, drug_b)
        if result:
            interactions.append({
                "pair": (drug_a, drug_b),
                "severity": result["severity"],
                "description": result["desc"]
            })
    
    # Sort by severity: HIGH first
    severity_order = {"HIGH":0,"MODERATE":1,"LOW":2}
    return sorted(interactions,
        key=lambda x: severity_order[x["severity"]])`}
                  </pre>
                </div>
                <div className="px-6 pb-6">
                  <p className="font-inter text-white/45 text-sm">All medication pairs are evaluated against the DDI database. Results are sorted so HIGH-severity interactions are always surfaced first.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 7 — SAMPLE WORKFLOW
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">06 — Sample Workflow</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">End-to-End Pipeline</h2>
            </motion.div>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.5), transparent)' }} />
              <div className="space-y-6">
                {workflowSteps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="flex items-start gap-6 pl-0"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                      <span className="font-jakarta font-black text-emerald-400 text-sm">{s.step}</span>
                    </div>
                    <div className="glass rounded-2xl p-6 border border-white/8 flex-1 hover:border-emerald-500/20 transition-colors duration-300">
                      <h4 className="font-jakarta font-bold text-white mb-1">{s.title}</h4>
                      <p className="font-inter text-white/50 text-sm">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 8 — CHALLENGES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">07 — Engineering Challenges</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Problems Solved</h2>
            </motion.div>

            <div className="space-y-5">
              {challenges.map((c, i) => (
                <motion.div
                  key={c.number}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className="glass rounded-2xl p-7 border border-white/8 hover:border-emerald-500/20 transition-all duration-300 grid md:grid-cols-[auto_1fr_1fr] gap-6 items-start"
                >
                  <span className="font-jakarta font-black text-5xl text-white/8 select-none">{c.number}</span>
                  <div>
                    <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-red-400/70 mb-2">Challenge</p>
                    <p className="font-jakarta font-semibold text-white/80">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-emerald-400/70 mb-2">Solution</p>
                    <p className="font-inter text-white/60 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 9 — RESULTS
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">08 — Results</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Project Outcomes</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { value: '3', label: 'Severity Levels', sub: 'HIGH · MODERATE · LOW' },
                { value: 'OCR→Report', label: 'Automated Workflow', sub: 'End-to-End Pipeline' },
                { value: 'Gemini', label: 'Vision OCR Engine', sub: 'AI-Powered Extraction' },
                { value: 'PDF+JSON', label: 'Report Formats', sub: 'Structured Clinical Output' },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                  className="glass rounded-2xl p-6 border border-white/8 text-center hover:border-emerald-500/25 transition-colors duration-300"
                >
                  <p className="font-jakarta font-black text-2xl text-emerald-400 mb-1 leading-tight">{m.value}</p>
                  <p className="font-inter text-xs text-white/70 font-semibold mb-1">{m.label}</p>
                  <p className="font-inter text-[10px] text-white/35 leading-snug">{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 10 — IMPACT
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.04))', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(16,185,129,0.05), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 block mb-6">09 — Impact</span>
                <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-6">Why This Matters</h2>
                <p className="font-inter text-white/60 text-lg leading-relaxed max-w-3xl">
                  This project demonstrates how AI and software engineering can support healthcare professionals by reducing manual effort, identifying dangerous medication combinations, and improving medication safety workflows. Although designed as a hackathon project, the architecture was built with real-world clinical decision-support concepts in mind.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 11 — FUTURE WORK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="glass rounded-2xl p-10 md:p-14 border border-white/8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-40"
                style={{ background: 'radial-gradient(ellipse 50% 50% at 100% 0%, rgba(16,185,129,0.1), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 block mb-3">10 — Future Work</span>
                <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white mb-10">Research Roadmap</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {futureWork.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
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
            <p className="font-inter text-white/30 text-sm">Polypharmacy Engine · Healthcare AI · Clinical Informatics</p>
            <div className="flex gap-4">
              <a href="https://github.com/ClassyMuhi/Polypharamacy_Engine" target="_blank" rel="noreferrer"
                className="btn-outline text-xs px-5 py-2.5 rounded-full gap-2" style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>
                <Github size={13} /> Source Code
              </a>
              <button onClick={onClose} className="btn-primary text-xs px-5 py-2.5 rounded-full gap-2"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none' }}>
                Back to Portfolio <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════
          Modal overlay for module detail
      ═══════════════════════════════ */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-6"
            style={{ background: 'rgba(6,11,9,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-lg w-full border border-white/12 relative"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${activeModal.color}18`, border: `1px solid ${activeModal.color}35` }}>
                <activeModal.icon size={22} style={{ color: activeModal.color }} />
              </div>
              <p className="font-inter text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: activeModal.color }}>{activeModal.badge}</p>
              <h3 className="font-jakarta font-black text-2xl text-white mb-4">{activeModal.title}</h3>
              <p className="font-inter text-white/60 leading-relaxed mb-6">{activeModal.description}</p>
              <div className="rounded-xl px-5 py-4 font-mono text-sm text-emerald-300/80"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                {activeModal.detail}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
