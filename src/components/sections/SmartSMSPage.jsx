import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  X, ArrowUpRight, Maximize2, Shield, MessageSquare, Users,
  Server, GitBranch, CheckCircle, ArrowDown, Clock, FileText, BarChart2
} from 'lucide-react';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const modules = [
  {
    icon: Shield,
    title: 'Authentication',
    desc: 'Phone-based authentication, OTP verification, and JWT-secured sessions for every API request.',
    color: '#3B82F6',
  },
  {
    icon: MessageSquare,
    title: 'Messaging System',
    desc: 'Send, receive, and track SMS delivery status with real-time webhook callbacks and retry logic.',
    color: '#6366F1',
  },
  {
    icon: Users,
    title: 'Contact Management',
    desc: 'Organize contacts into groups, perform bulk operations, and run fast search across the directory.',
    color: '#06B6D4',
  },
  {
    icon: Server,
    title: 'API Services',
    desc: 'RESTful APIs built with Django REST Framework — versioned, documented, and pagination-ready.',
    color: '#8B5CF6',
  },
];

const archSteps = [
  { icon: Shield, label: 'User Authentication', desc: 'OTP + JWT' },
  { icon: MessageSquare, label: 'Messaging Engine', desc: 'Send / Receive / Retry' },
  { icon: Users, label: 'Contact Management', desc: 'Groups & Bulk Ops' },
  { icon: BarChart2, label: 'Delivery Tracking', desc: 'Status Webhooks' },
  { icon: FileText, label: 'Reporting & Logs', desc: 'Audit Trail' },
];

const features = [
  'OTP Authentication', 'JWT Authorization', 'SMS Delivery Tracking',
  'Contact Groups', 'Message Templates', 'Scheduled Messaging',
  'Audit Logging', 'REST APIs',
];

const techStack = [
  { name: 'Python', color: '#3B82F6' },
  { name: 'Django', color: '#3B82F6' },
  { name: 'Django REST Framework', color: '#6366F1' },
  { name: 'JWT', color: '#8B5CF6' },
  { name: 'SQLite', color: '#06B6D4' },
  { name: 'PostgreSQL', color: '#06B6D4' },
  { name: 'REST API', color: '#3B82F6' },
  { name: 'Backend Development', color: '#6366F1' },
];

// placeholder gallery items (swap src for real screenshots when available)
const gallery = [
  { label: 'Admin Dashboard', desc: 'Central command & control' },
  { label: 'Message Management Screen', desc: 'Compose, send & track' },
  { label: 'Contact Management Interface', desc: 'Groups & bulk operations' },
  { label: 'Delivery Tracking View', desc: 'Real-time delivery status' },
  { label: 'API Architecture Diagram', desc: 'Endpoint map & data flow' },
];

// Placeholder gradient colours for gallery cards (no images yet)
const placeholderGradients = [
  'from-blue-600/40 to-indigo-900/60',
  'from-indigo-600/40 to-purple-900/60',
  'from-cyan-600/40 to-blue-900/60',
  'from-purple-600/40 to-blue-900/60',
  'from-blue-600/30 to-cyan-900/60',
];

// ─────────────────────────────────────────────
// Lightbox (image-only — extend for screenshots later)
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
// GalleryPlaceholder card
// ─────────────────────────────────────────────
function GalleryPlaceholder({ item, gradient, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden border border-white/8 cursor-pointer group`}
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      {/* Gradient fill */}
      <div className={`w-full h-48 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15), transparent 70%)' }} />
        <Maximize2 size={22} className="text-white/20 mb-3 group-hover:text-white/50 transition-colors duration-300" />
        <span className="font-inter text-[10px] font-bold tracking-[0.25em] uppercase text-white/25 group-hover:text-white/50 transition-colors duration-300">
          Screenshot Coming Soon
        </span>
      </div>
      {/* Label */}
      <div className="p-5 border-t border-white/6">
        <p className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-1">{item.desc}</p>
        <p className="font-jakarta font-bold text-white text-sm">{item.label}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function SmartSMSPage({ onClose }) {
  const scrollRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (d = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const accent = '#3B82F6';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: '#070b0a' }}
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
          {/* Background layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)' }} />
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 50% 40% at 85% 85%, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.025]"
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
                  Backend Project • Django
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.2}
                className="font-jakarta font-black text-6xl md:text-8xl leading-[0.9] tracking-tight text-white mb-4">
                SMART<span style={{ color: accent }}>SMS</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.3}
                className="font-inter text-xl text-white/50 mt-5 mb-3 max-w-xl leading-relaxed">
                Professional SMS Communication &amp; Contact Management Platform
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.38}
                className="font-inter text-base text-white/30 mb-10 max-w-xl leading-relaxed">
                A modular Django-based SMS management system designed for secure messaging,
                contact organization, delivery tracking, and user authentication.
              </motion.p>

              {/* Tags */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.44}
                className="flex flex-wrap gap-2 mb-10">
                {['Django', 'REST API', 'Backend Development', 'System Design'].map(t => (
                  <span key={t} className="font-inter text-[11px] font-semibold px-3 py-1.5 rounded-full text-blue-300"
                    style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)' }}>
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.52}
                className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/ClassyMuhi/smart-sms"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-inter text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)' }}
                >
                  View Source Code <ArrowUpRight size={15} />
                </a>
                <button
                  onClick={() => document.getElementById('sms-arch')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-inter text-sm font-semibold text-white/60 hover:text-white transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  System Architecture <ArrowDown size={15} />
                </button>
              </motion.div>
            </div>

            {/* Right — decorative architecture preview */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-3xl opacity-30"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3), transparent 70%)' }} />

              {/* Architectural flow card */}
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/8 shadow-2xl p-8"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.07), rgba(99,102,241,0.04))' }}>

                <p className="font-inter text-[10px] font-bold tracking-[0.25em] uppercase text-blue-400 mb-6">System Architecture</p>

                <div className="space-y-3">
                  {archSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.30)' }}>
                          <Icon size={16} className="text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-jakarta font-semibold text-white text-sm">{step.label}</span>
                            <span className="font-inter text-[10px] text-white/35 tracking-wider">{step.desc}</span>
                          </div>
                          {i < archSteps.length - 1 && (
                            <div className="mt-2 ml-0 w-px h-3 bg-gradient-to-b from-blue-500/40 to-transparent" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Corner glow */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
                  style={{ background: 'radial-gradient(circle at 100% 100%, rgba(59,130,246,0.8), transparent 70%)' }} />
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
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3 mb-6">
                One Platform. Every SMS Need.
              </h2>
              <p className="font-inter text-white/50 text-lg leading-relaxed max-w-3xl">
                Smart SMS is a scalable backend platform that enables organizations to manage SMS
                communications efficiently through authentication, contact management, delivery
                tracking, and messaging workflows — all exposed through clean, documented REST APIs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 3 — CORE MODULES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">02 — Core Modules</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Built Modularly</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div key={m.title} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="glass rounded-2xl p-7 border border-white/8 hover:border-blue-500/25 transition-all duration-400 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 0% 100%, ${m.color}10, transparent 65%)` }} />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: `${m.color}18`, border: `1px solid ${m.color}35` }}>
                        <Icon size={20} style={{ color: m.color }} />
                      </div>
                      <h3 className="font-jakarta font-bold text-white text-lg mb-2">{m.title}</h3>
                      <p className="font-inter text-white/45 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 4 — ARCHITECTURE
        ═══════════════════════════════ */}
        <section id="sms-arch" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">03 — Architecture Overview</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">How It Flows</h2>
            </motion.div>

            <div className="relative max-w-2xl mx-auto">
              {archSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.label}
                    variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                    className="relative flex items-start gap-6 mb-2"
                  >
                    {/* Vertical connector */}
                    {i < archSteps.length - 1 && (
                      <div className="absolute left-[22px] top-[44px] w-px h-[calc(100%+8px)] bg-gradient-to-b from-blue-500/40 to-transparent" />
                    )}

                    <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)' }}>
                      <Icon size={18} className="text-blue-400" />
                    </div>

                    <div className="flex-1 glass rounded-2xl p-5 border border-white/8 hover:border-blue-500/20 transition-colors duration-300 mb-4 group relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(circle at 0% 50%, rgba(59,130,246,0.07), transparent 70%)' }} />
                      <div className="relative flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta font-bold text-white">{step.label}</h3>
                          <p className="font-inter text-white/40 text-sm mt-0.5">{step.desc}</p>
                        </div>
                        <span className="font-jakarta font-black text-4xl text-white/5 select-none">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 5 — DESIGN SHOWCASE (placeholder gallery)
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">04 — Design Showcase</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Interface Preview</h2>
              <p className="font-inter text-white/40 text-base mt-3">Add dashboard screenshots here — each card is an independent slot.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}>
                  <GalleryPlaceholder
                    item={item}
                    gradient={placeholderGradients[i % placeholderGradients.length]}
                    onClick={() => {/* open lightbox once src is added */ }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 6 — TECH STACK
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">05 — Tech Stack</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">Built With</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t, i) => (
                <motion.div key={t.name}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full font-inter text-sm font-semibold cursor-default transition-all duration-300"
                  style={{ background: `${t.color}15`, color: '#93C5FD', border: `1px solid ${t.color}35` }}>
                  {t.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 7 — KEY FEATURES
        ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
              <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400">06 — Key Features</span>
              <h2 className="font-jakarta font-black text-4xl md:text-5xl text-white mt-3">What It Does</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div key={f}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.06} viewport={{ once: true }}
                  className="flex items-center gap-3 glass rounded-xl px-5 py-4 border border-white/8 hover:border-blue-500/20 transition-colors duration-300 group">
                  <CheckCircle size={15} className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-inter text-sm text-white/70">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            § 8 — OUTCOME
        ═══════════════════════════════ */}
        <section className="px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.06), transparent)' }} />
              <div className="relative">
                <span className="font-inter text-xs font-bold tracking-[0.3em] uppercase text-blue-400 block mb-6">07 — Outcome</span>
                <p className="font-instrument italic text-2xl md:text-3xl text-white/85 leading-relaxed max-w-3xl mx-auto">
                  "Smart SMS demonstrates backend architecture design, API development, authentication systems, and scalable communication workflows using Django and REST Framework."
                </p>
                <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
              </div>
            </motion.div>
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
              <p className="font-inter text-white/35 text-sm mt-2">Drop images into the gallery data array — cards render automatically.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((item, i) => (
                <motion.div key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}>
                  <GalleryPlaceholder
                    item={item}
                    gradient={placeholderGradients[i % placeholderGradients.length]}
                    onClick={() => { }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <div className="px-6 md:px-16 pb-20 pt-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/6">
            <p className="font-inter text-white/30 text-sm">Smart SMS · Django Backend · REST API · System Design</p>
            <div className="flex gap-4">
              <a href="https://github.com/ClassyMuhi/smart-sms" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 font-inter text-xs font-semibold px-5 py-2.5 rounded-full text-white/60 hover:text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                Source Code <ArrowUpRight size={13} />
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
