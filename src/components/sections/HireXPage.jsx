import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { X, ArrowUpRight, CheckCircle, Search, Users, Activity, BarChart, Settings, Sliders, Maximize2, Type, Grid, Palette } from 'lucide-react';

import ui1 from '../../assets/HireX - UI/Desktop.png';
import ui2 from '../../assets/HireX - UI (1)/Desktop.png';
import ui3 from '../../assets/HireX - UI (2)/Desktop.png';
import ui4 from '../../assets/HireX - UI (3)/Desktop.png';
import ui5 from '../../assets/HireX - UI (4)/Desktop.png';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const features = [
  { icon: CheckCircle, title: 'Candidate Evaluation', desc: 'Automated assessment and screening workflows.', color: '#3B82F6' },
  { icon: Search,      title: 'Skill Matching', desc: 'Compare candidate profiles against job requirements.',                  color: '#6366F1' },
  { icon: Users,       title: 'Smart Shortlisting', desc: 'Rule-based filtering and candidate ranking.',               color: '#8B5CF6' },
  { icon: Activity,    title: 'Recruiter Dashboard', desc: 'Centralized hiring management interface.', color: '#06B6D4' },
  { icon: BarChart,    title: 'Status Tracking', desc: 'Real-time recruitment workflow updates.',              color: '#F59E0B' },
];

const processSteps = [
  { num: '01', title: 'Research',     desc: 'Understanding recruiter pain points.' },
  { num: '02', title: 'Wireframing',  desc: 'Building intuitive recruitment flows.' },
  { num: '03', title: 'UI Design',    desc: 'Creating a clean and professional hiring platform.' },
  { num: '04', title: 'Prototyping',  desc: 'Designing smooth user experiences.' },
];

const skills = [
  'UI Design', 'UX Design', 'Dashboard Design', 'Figma',
  'User Flows', 'Wireframing', 'Prototyping', 'Design Systems',
];

const gallery = [
  { src: ui1, label: 'Recruiter Dashboard', span: 'col-span-2' },
  { src: ui2, label: 'Candidate Evaluation Screen', span: 'col-span-1' },
  { src: ui3, label: 'Job Listing Interface', span: 'col-span-1' },
  { src: ui4, label: 'Candidate Profile View', span: 'col-span-1' },
  { src: ui5, label: 'Shortlisting Workflow', span: 'col-span-1' },
];

const colorPalette = [
  { name: 'Primary Blue',  hex: '#3B82F6', bg: '#3B82F6' },
  { name: 'Deep Indigo',   hex: '#4F46E5', bg: '#4F46E5' },
  { name: 'Soft White',    hex: '#F8FAFC', bg: '#F8FAFC' },
  { name: 'Surface Dark',  hex: '#0F172A', bg: '#0F172A' },
  { name: 'Accent Cyan',   hex: '#06B6D4', bg: '#06B6D4' },
];

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({ src, label, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 font-inter text-xs transition-colors">
          <X size={16} /> Close
        </button>
        <img src={src} alt={label} className="w-full rounded-2xl shadow-2xl" />
        {label && <p className="mt-4 text-center font-inter text-sm text-white/40">{label}</p>}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function HireXPage({ onClose }) {
  const scrollRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  const accent = '#3B82F6';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: '#07090f' }}
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
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 35% at 80% 80%, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* Scan line */}
          <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)' }}
            animate={{ top: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />

          <div className="relative max-w-7xl mx-auto w-full pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.1}
                className="inline-flex items-center gap-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">
                  UI/UX Design • Case Study
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.2}
                className="font-jakarta font-black text-6xl md:text-8xl leading-[0.9] tracking-tight text-white mb-4">
                HIRE<span style={{ color: accent }}>X</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.3}
                className="font-inter text-xl text-white/50 mt-5 mb-3 max-w-xl leading-relaxed">
                An Intelligent Recruitment & Candidate Evaluation Platform
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.38}
                className="font-inter text-base text-white/30 mb-10 max-w-xl leading-relaxed">
                A modern recruitment platform designed to streamline candidate screening, automate evaluation workflows, and improve hiring efficiency through intelligent automation.
              </motion.p>

              {/* Tags */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.44}
                className="flex flex-wrap gap-2 mb-10">
                {['UI/UX Design', 'Dashboard Design', 'Recruitment Tech', 'Product Design'].map(t => (
                  <span key={t} className="font-inter text-[11px] font-semibold px-3 py-1.5 rounded-full text-blue-300"
                    style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)' }}>{t}</span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.52}
                className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('hx-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary gap-2">View Screens</button>
                <button className="btn-outline gap-2">Explore Design</button>
              </motion.div>
            </div>

            {/* Right — hero image */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-3xl opacity-30"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3), transparent 70%)' }} />
              <div className="relative rounded-3xl overflow-hidden border border-white/8 shadow-2xl cursor-zoom-in group"
                onClick={() => setLightbox({ src: ui1, label: 'HireX — Recruiter Dashboard' })}>
                <img src={ui1} alt="HireX Dashboard" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent opacity-30" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 2 — PROJECT OVERVIEW
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">01 — Project Overview</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3 mb-6">Simplify the Hiring Process.</h2>
              <p className="font-inter text-white/50 text-lg leading-relaxed max-w-3xl">
                HireX simplifies the hiring process by helping recruiters evaluate candidates, match skills with job requirements, and manage recruitment workflows through an intuitive digital experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 3 — KEY FEATURES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">02 — Key Features</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">What HireX Does</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="glass rounded-2xl p-6 border border-white/8 hover:border-blue-500/25 transition-all duration-400 group relative overflow-hidden">
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
            § 4 — DESIGN SHOWCASE
        ═══════════════════════════════ */}
        <section id="hx-gallery" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">03 — Design Showcase</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">App Screens</h2>
              <p className="font-inter text-white/40 text-base mt-3">Click any screen to view full size.</p>
            </motion.div>

            {/* Featured large image */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-6 rounded-3xl overflow-hidden border border-white/8 cursor-zoom-in group shadow-2xl relative"
              onClick={() => setLightbox({ src: ui2, label: 'HireX — Candidate Evaluation Screen' })}>
              <img src={ui2} alt="Candidate Evaluation" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090f]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <p className="font-inter text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-1">Candidate Evaluation</p>
                  <p className="font-jakarta font-bold text-white text-lg">Automated assessment and screening workflows</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={15} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Two-column grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: ui3, label: 'Job Listing Interface', desc: 'Manage Openings' },
                { src: ui4, label: 'Candidate Profile View', desc: 'In-Depth Profiles' },
              ].map((img, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.12} viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden border border-white/8 cursor-zoom-in group shadow-xl relative"
                  onClick={() => setLightbox({ src: img.src, label: `HireX — ${img.label}` })}>
                  <img src={img.src} alt={img.label} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090f]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-0.5">{img.desc}</p>
                      <p className="font-jakarta font-bold text-white text-sm">{img.label}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={13} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 5 — WORKFLOW VISUALIZATION
        ═══════════════════════════════ */}
        <section className="section-padding bg-[#0a0d16]">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">04 — Workflow</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Seamless Hiring Process</h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-center gap-4">
              {['Resume Upload', 'Skill Analysis', 'Candidate Evaluation', 'Shortlisting', 'Recruiter Dashboard'].map((step, idx, arr) => (
                <div key={step} className="flex flex-col md:flex-row items-center gap-4">
                  <div className="glass px-6 py-4 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="font-jakarta font-bold text-white text-sm whitespace-nowrap">{step}</span>
                  </div>
                  {idx !== arr.length - 1 && (
                    <div className="text-white/30 hidden md:block">
                      →
                    </div>
                  )}
                  {idx !== arr.length - 1 && (
                    <div className="text-white/30 md:hidden">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 6 — DESIGN PROCESS
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">05 — Design Process</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">How It Was Built</h2>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-5">
              {processSteps.map((s, i) => (
                <motion.div key={s.num} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                  className="glass rounded-2xl p-6 border border-white/8 hover:border-blue-500/20 transition-colors duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.06), transparent 70%)' }} />
                  <div className="relative">
                    <span className="font-jakarta font-black text-5xl text-white/6 select-none block mb-4">{s.num}</span>
                    <h4 className="font-jakarta font-bold text-white mb-2">{s.title}</h4>
                    <p className="font-inter text-white/45 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 7 — OUTCOME
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.06), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400 block mb-6">06 — Outcome</span>
                <p className="font-instrument italic text-2xl md:text-3xl text-white/85 leading-relaxed max-w-3xl mx-auto">
                  "HireX demonstrates how thoughtful product design can improve recruitment workflows, reduce manual effort, and create a more efficient hiring experience."
                </p>
                <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 8 — SKILLS
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">07 — Skills Demonstrated</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">What I Applied</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <motion.div key={s}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full font-inter text-sm font-semibold cursor-default transition-all duration-300"
                  style={{ background: 'rgba(59,130,246,0.10)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.25)' }}>
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 9 — FINAL GALLERY
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">08 — Final Gallery</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">All Screens</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className={`rounded-2xl overflow-hidden border border-white/8 cursor-zoom-in group shadow-xl relative ${img.span}`}
                  onClick={() => setLightbox({ src: img.src, label: `HireX — ${img.label}` })}
                >
                  <img src={img.src} alt={img.label}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090f]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-jakarta font-semibold text-white text-sm">{img.label}</p>
                    <Maximize2 size={14} className="text-white/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <div className="px-6 md:px-16 pb-20 pt-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/6">
            <p className="font-inter text-white/30 text-sm">HireX · UI/UX Case Study · Product Design</p>
            <div className="flex gap-4">
              <button className="btn-outline text-xs px-5 py-2.5 rounded-full gap-2">
                Explore Design <ArrowUpRight size={13} />
              </button>
              <button onClick={onClose} className="btn-primary text-xs px-5 py-2.5 rounded-full gap-2">
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
