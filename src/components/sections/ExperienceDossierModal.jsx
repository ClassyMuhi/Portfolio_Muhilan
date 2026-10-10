import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Users,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Database,
  CheckCheck,
  Eye,
  Quote,
} from 'lucide-react';

export default function ExperienceDossierModal({
  internship,
  isOpen,
  onClose,
  onOpenHireXProject,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(false);

  const handleClose = useCallback(() => {
    setShowEmbeddedPdf(false);
    onClose();
  }, [onClose]);

  // Keyboard navigation: Escape key closes modal
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!internship) return null;

  const isLongshore = internship.id === 'longshore';
  const isKaavian = internship.id === 'kaavian';

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.25 } },
    exit: { opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: { duration: shouldReduceMotion ? 0 : 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dossier-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8"
          style={{
            backgroundColor: 'rgba(5, 7, 12, 0.90)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
          aria-describedby="dossier-summary"
        >
          <motion.div
            key="dossier-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl md:rounded-3xl glass-strong border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden bg-[#070b13]"
          >
            {/* Ambient subtle top glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 pointer-events-none opacity-40 blur-3xl"
              style={{
                background: `radial-gradient(ellipse at center, ${internship.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* ── Sticky Header ── */}
            <div className="relative z-10 px-6 sm:px-8 pt-6 pb-5 border-b border-white/[0.08] bg-[#070b13]/95 backdrop-blur-md flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-inter text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{
                      backgroundColor: `${internship.accentColor}18`,
                      color: internship.accentColor,
                      border: `1px solid ${internship.accentColor}35`,
                    }}
                  >
                    {isLongshore ? <ShieldCheck size={12} /> : <Users size={12} />}
                    {internship.badge}
                  </span>

                  <span className="inline-flex items-center gap-1 font-inter text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <Calendar size={12} className="text-white/40" />
                    {internship.period}
                  </span>

                  <span className="inline-flex items-center gap-1 font-inter text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <MapPin size={12} className="text-white/40" />
                    {internship.location}
                  </span>
                </div>

                <div>
                  <h2
                    id="dossier-title"
                    className="font-jakarta font-bold text-2xl sm:text-3xl text-white tracking-tight"
                  >
                    {internship.company}
                  </h2>
                  <p
                    className="font-inter text-sm sm:text-[15px] font-semibold text-white mt-0.5"
                    style={{ color: '#ffffff' }}
                  >
                    {internship.role}
                    {isLongshore && (
                      <span className="text-white/60 font-normal ml-2 text-xs sm:text-[13px]">
                        • 4-Week Intensive Programme
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Close Button & Shortcut badge */}
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-medium text-white/40 bg-white/5 border border-white/10 rounded">
                  ESC
                </kbd>
                <button
                  onClick={handleClose}
                  aria-label="Close dossier"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="relative z-10 px-6 sm:px-8 py-6 overflow-y-auto space-y-8 scrollbar-thin">
              {/* ══════════════════════════════════════════════════
                  LONGSHORE LABS CASE STUDY PRESENTATION
              ══════════════════════════════════════════════════ */}
              {isLongshore && (
                <>
                  {/* Project Scale Highlight Component (2.1M Records) */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-500/[0.12] via-indigo-500/[0.06] to-transparent border border-blue-500/25 space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 flex items-center gap-2">
                        <Database size={14} />
                        Project Scale & Environment
                      </span>
                      <span className="font-inter text-[10px] text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        Live Compliance Dataset
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-center">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-jakarta font-black text-3xl sm:text-4xl text-white tracking-tight">
                            2.1M
                          </span>
                          <span className="font-inter text-xs font-semibold text-blue-400">
                            Records
                          </span>
                        </div>
                        <span className="font-inter text-xs text-white/70 font-medium mt-1">
                          Live Initiative Dataset
                        </span>
                        <span className="font-inter text-[10px] text-white/40 mt-0.5">
                          Total records in live project
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-center">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-jakarta font-black text-3xl sm:text-4xl text-white tracking-tight">
                            04
                          </span>
                          <span className="font-inter text-xs font-semibold text-blue-400">
                            Weeks
                          </span>
                        </div>
                        <span className="font-inter text-xs text-white/70 font-medium mt-1">
                          Intensive Programme
                        </span>
                        <span className="font-inter text-[10px] text-white/40 mt-0.5">
                          Full-time, in-office schedule
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-center">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-jakarta font-black text-3xl sm:text-4xl text-white tracking-tight">
                            02
                          </span>
                          <span className="font-inter text-xs font-semibold text-blue-400">
                            Locations
                          </span>
                        </div>
                        <span className="font-inter text-xs text-white/70 font-medium mt-1">
                          Cross-Border Teams
                        </span>
                        <span className="font-inter text-[10px] text-white/40 mt-0.5">
                          Chennai & Cayman Islands
                        </span>
                      </div>
                    </div>

                    <p className="font-inter text-xs text-blue-200/70 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 leading-relaxed">
                      <strong>Dataset Scale Note:</strong> 2.1 million records reflects the live dataset scale of Longshore Labs&apos; compliance data initiative worked on by the cross-border team — not an individual throughput metric.
                    </p>
                  </div>

                  {/* Section 1: Overview & Problem */}
                  <div id="dossier-summary" className="space-y-4">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      01 — Overview & Problem Context
                    </h3>
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4">
                      <div>
                        <h4 className="font-jakarta font-bold text-base text-white mb-2">
                          The Fragmented Public-Information Problem
                        </h4>
                        <p className="font-inter text-sm text-white/75 leading-relaxed">
                          {internship.overview.problem}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-jakarta font-bold text-base text-white mb-2">
                          The Initiative Objective
                        </h4>
                        <p className="font-inter text-sm text-white/75 leading-relaxed">
                          {internship.overview.objective}
                        </p>
                      </div>

                      {/* Official Quote */}
                      <div className="p-4 rounded-xl bg-black/40 border-l-2 border-accent-primary flex items-start gap-3">
                        <Quote size={18} className="text-accent-primary shrink-0 mt-0.5" />
                        <p className="font-inter text-xs sm:text-sm text-white/80 italic leading-relaxed">
                          {internship.overview.quote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: My Internship & Collaboration */}
                  <div className="space-y-4">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      02 — My Internship & Team Collaboration
                    </h3>
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-5">
                      <div>
                        <h4 className="font-jakarta font-bold text-base text-white mb-2">
                          Four-Week In-Office Intensive
                        </h4>
                        <p className="font-inter text-sm text-white/75 leading-relaxed">
                          {internship.internshipDetails.programme}
                        </p>
                      </div>

                      {/* Performance Evaluation from Report */}
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                        <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-accent-secondary">
                          Performance Evaluation From Official Report
                        </span>
                        <p className="font-inter text-sm text-white/85 leading-relaxed italic">
                          &ldquo;{internship.internshipDetails.evaluation}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Data Workflow Diagram */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                        03 — Data Workflow Pipeline
                      </h3>
                      <span className="font-inter text-[11px] text-white/40">
                        Reported Work vs. Future Directions
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-5">
                      <p className="font-inter text-sm text-white/70 leading-relaxed">
                        The compliance data pipeline structures raw, inconsistent public filings into clean, verified records. Stages 01 through 05 formed the reported internship focus, while Stage 06 represents the project&apos;s longer-term direction.
                      </p>

                      {/* Visual 6-Step Workflow */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {internship.dataWorkflow.map((step) => {
                          const isFuture = step.isFuture;
                          return (
                            <div
                              key={step.step}
                              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                                isFuture
                                  ? 'bg-amber-500/[0.05] border-amber-500/25'
                                  : 'bg-black/40 border-white/[0.08]'
                              }`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`font-mono text-[10px] font-bold ${
                                      isFuture ? 'text-amber-400' : 'text-blue-400'
                                    }`}
                                  >
                                    STAGE {step.step}
                                  </span>
                                  <span
                                    className={`font-inter text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                                      isFuture
                                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                                    }`}
                                  >
                                    {isFuture ? 'Future Direction' : 'In-Scope Work'}
                                  </span>
                                </div>
                                <h5 className="font-jakarta font-bold text-sm text-white">
                                  {step.name}
                                </h5>
                                <p className="font-inter text-xs text-white/55 leading-relaxed">
                                  {step.summary}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Technical Learning */}
                  <div className="space-y-4">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      04 — Technical Learning & Skills
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {internship.technicalLearning.map((tech) => (
                        <div
                          key={tech.topic}
                          className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-jakarta font-bold text-sm text-white">
                              {tech.topic}
                            </span>
                            <span className="font-inter text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                              {tech.category}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-white/60 leading-relaxed">
                            {tech.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 5: What I Learned */}
                  <div className="space-y-4">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      05 — Practical Lessons & Insights
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {internship.whatILearned.map((lesson) => (
                        <div
                          key={lesson.title}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCheck size={14} className="text-accent-secondary" />
                            <h4 className="font-jakarta font-semibold text-sm text-white/95">
                              {lesson.title}
                            </h4>
                          </div>
                          <p className="font-inter text-xs text-white/60 leading-relaxed pl-5">
                            {lesson.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 6: Next Chapter */}
                  <div className="space-y-4">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      06 — The Next Chapter & Long-Term Roadmap
                    </h3>
                    <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-3">
                      <p className="font-inter text-xs text-white/65 leading-relaxed">
                        Objectives outlined in the report for subsequent internship phases and academic project collaboration:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {internship.nextChapter.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-white/75 font-inter p-2.5 rounded-lg bg-black/30 border border-white/5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer Section */}
                  {showEmbeddedPdf && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                          Original Internship Report Preview
                        </span>
                        <a
                          href={internship.reportPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-inter font-medium"
                        >
                          Open in Full Browser Tab <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl h-[520px] w-full">
                        <iframe
                          src={`${internship.reportPdf}#toolbar=1`}
                          title="Longshore Labs Internship Report"
                          className="w-full h-full border-0"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ══════════════════════════════════════════════════
                  KAAVIAN SYSTEMS CASE STUDY PRESENTATION
              ══════════════════════════════════════════════════ */}
              {isKaavian && (
                <>
                  <div id="dossier-summary" className="space-y-3">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      Project Context & Overview
                    </h3>
                    <p className="font-inter text-sm sm:text-[15px] text-white/80 leading-relaxed">
                      {internship.overview}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/25">
                      <div className="flex items-center gap-2 text-xs font-inter text-indigo-300">
                        <Layers size={15} className="text-indigo-400" />
                        <span>
                          Featured Project: <strong className="text-white">HireX Recruitment Platform</strong>
                        </span>
                      </div>
                      {onOpenHireXProject && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenHireXProject('hirex');
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-inter font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                        >
                          Open Full HireX UI Walkthrough <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent-secondary" />
                      <h3 className="font-jakarta font-semibold text-sm uppercase tracking-wider text-white">
                        Role & Technical Contribution
                      </h3>
                    </div>
                    <p className="font-inter text-sm text-white/75 leading-relaxed">
                      {internship.roleContribution}
                    </p>
                  </div>

                  {internship.tracks && (
                    <div className="space-y-6">
                      <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                        Technical Architecture & Workflows
                      </h3>
                      {internship.tracks.map((track) => (
                        <div
                          key={track.id}
                          className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4"
                        >
                          <div>
                            <span className="font-inter text-[11px] font-semibold tracking-wider uppercase text-accent-secondary">
                              {track.badge}
                            </span>
                            <h4 className="font-jakarta font-bold text-lg text-white mt-1">
                              {track.title}
                            </h4>
                            <p className="font-inter text-xs text-white/50 mt-0.5">
                              {track.subtitle}
                            </p>
                          </div>
                          <p className="font-inter text-sm text-white/70 leading-relaxed">
                            {track.description}
                          </p>
                          <div className="space-y-2">
                            {track.keyPoints.map((point, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-white/75 font-inter">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                      Confirmed Technologies
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {internship.technologies.map((tech) => (
                        <div
                          key={tech.name}
                          className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col"
                        >
                          <span className="font-inter text-[10px] font-medium text-white/40 uppercase">
                            {tech.category}
                          </span>
                          <span className="font-jakarta font-semibold text-xs text-white mt-0.5">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} className="text-white/40" />
                      <h3 className="font-jakarta font-semibold text-xs tracking-[0.2em] uppercase text-white/40">
                        Engineering Considerations
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {internship.engineeringConsiderations.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1"
                        >
                          <h4 className="font-jakarta font-semibold text-xs text-white/90">
                            {item.title}
                          </h4>
                          <p className="font-inter text-xs text-white/55 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Sticky Modal Footer ── */}
            <div className="relative z-10 px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-[#070b13]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
              <span className="font-inter text-xs text-white/40">
                {isLongshore ? 'Primary Source: Longshore_report.pdf' : 'Verified Internship Dossier'}
              </span>

              <div className="flex items-center gap-3">
                {isLongshore && internship.reportPdf && (
                  <>
                    <button
                      onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-inter font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Eye size={13} />
                      {showEmbeddedPdf ? 'Hide PDF Preview' : 'Preview In-Modal'}
                    </button>
                    <a
                      href={internship.reportPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-inter font-semibold text-white bg-blue-600/85 hover:bg-blue-600 transition-colors"
                    >
                      <FileText size={13} />
                      View Internship Report (PDF)
                      <ExternalLink size={12} />
                    </a>
                  </>
                )}

                {isKaavian && onOpenHireXProject && (
                  <button
                    onClick={() => {
                      handleClose();
                      onOpenHireXProject('hirex');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-inter font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 transition-colors"
                  >
                    Inspect HireX Screens <ArrowRight size={13} />
                  </button>
                )}

                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-inter font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
