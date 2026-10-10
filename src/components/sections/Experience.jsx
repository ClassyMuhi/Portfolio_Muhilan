import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import MagneticButton from '../ui/MagneticButton';
import ExperienceDossierModal from './ExperienceDossierModal';
import {
  ExternalLink,
  Calendar,
  MapPin,
  ShieldCheck,
  Users,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  FileText,
  Database,
} from 'lucide-react';
import { featuredInternships, leadershipExperience } from '../../data/experience';

export default function Experience({ setActiveProject }) {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenDossier = useCallback((internship) => {
    setSelectedInternship(internship);
  }, []);

  const handleCloseDossier = useCallback(() => {
    setSelectedInternship(null);
  }, []);

  // Framer Motion variants respecting reduced motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="experience"
      className="section-padding bg-base-100 relative overflow-hidden"
      aria-label="Professional and Leadership Experience"
    >
      {/* Background radial glows */}
      <div
        className="absolute right-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute left-0 bottom-1/3 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Career & Experience"
          title="Professional Experience"
          highlight="Experience"
          subtitle="Engineering internships in live compliance data pipelines and recruitment software, complemented by campus leadership roles."
        />

        {/* ══════════════════════════════════════════════════
            PART 1: FEATURED ENGINEERING INTERNSHIPS
        ══════════════════════════════════════════════════ */}
        <div className="mb-20">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-accent-primary border border-blue-500/20">
                <Sparkles size={16} />
              </span>
              <div>
                <h3 className="font-jakarta font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white/90">
                  Featured Internships
                </h3>
                <p className="font-inter text-xs text-white/45">
                  Click any card to explore the full case study, data workflows, and internship details
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-white/30 uppercase tracking-widest">
              2 Positions
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {featuredInternships.map((item) => {
              const isLongshore = item.id === 'longshore';
              const isKaavian = item.id === 'kaavian';

              return (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  tabIndex={0}
                  role="button"
                  aria-label={`Explore case study for ${item.company} - ${item.role}`}
                  onClick={() => handleOpenDossier(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenDossier(item);
                    }
                  }}
                  className="glass gradient-border card-shine rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)] cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-[#070b0a]"
                >
                  {/* Subtle dynamic ambient glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${item.glowColor}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 space-y-5">
                    {/* Top Metadata Bar */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
                        </span>
                        <span className="font-inter text-[11px] font-bold tracking-[0.2em] text-accent-primary uppercase">
                          {isLongshore ? 'COMPLIANCE DATA INITIATIVE' : (item.badge ? item.badge.toUpperCase() : 'SAP DEVELOPMENT PLATFORM')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-inter text-white/50">
                        <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          <Calendar size={12} className="text-white/40" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          <MapPin size={12} className="text-white/40" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Company and Role Heading */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${item.accentColor}18`,
                            color: item.accentColor,
                            border: `1px solid ${item.accentColor}30`,
                          }}
                        >
                          {isLongshore ? <ShieldCheck size={16} /> : <Users size={16} />}
                        </span>
                        <h4 className="font-jakarta font-bold text-2xl sm:text-3xl text-white group-hover:text-white transition-colors">
                          {item.company}
                        </h4>
                      </div>
                      <p
                        className="font-inter text-sm sm:text-[15px] font-semibold text-white pl-9"
                        style={{ color: '#ffffff' }}
                      >
                        {item.role}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="font-inter text-sm text-white/65 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Longshore-Specific 2.1M Dataset Scale Metric Card */}
                    {isLongshore && item.datasetScale && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/[0.08] via-indigo-500/[0.05] to-transparent border border-blue-500/20 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                            <Database size={20} />
                          </div>
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-jakarta font-black text-2xl text-white tracking-tight">
                                {item.datasetScale.number}
                              </span>
                              <span className="font-inter text-xs font-semibold text-blue-300">
                                {item.datasetScale.unit}
                              </span>
                            </div>
                            <span className="font-inter text-[11px] text-white/50 block">
                              {item.datasetScale.label}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-inter text-blue-300/80 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20 text-right">
                          Live Initiative Scale
                        </span>
                      </div>
                    )}

                    {/* Kaavian Focus Area Previews */}
                    {isKaavian && item.tracks && (
                      <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] space-y-2">
                        <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 block">
                          Focus Areas
                        </span>
                        <div className="space-y-1.5">
                          {item.tracks.map((t) => (
                            <div key={t.id} className="flex items-center gap-2 text-xs text-white/80 font-inter">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                              <span className="font-medium">{t.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Confirmed Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tags.map((tag) => (
                        <Tag key={tag} color="default">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 font-inter text-xs font-semibold text-accent-primary group-hover:text-accent-secondary transition-colors">
                      {isLongshore ? 'Explore Internship' : 'Explore Case Study'}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1.5 transition-transform duration-300"
                      />
                    </span>

                    {/* External Quick Link */}
                    {isLongshore && item.reportPdf && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.reportPdf, '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-inter text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/25 transition-colors cursor-pointer"
                        title="View Longshore Internship Report PDF"
                      >
                        <FileText size={12} className="text-blue-400" />
                        <span>View Report</span>
                        <ExternalLink size={10} />
                      </span>
                    )}

                    {isKaavian && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-inter text-indigo-300/70 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                        <Layers size={12} className="text-indigo-400" />
                        <span>HireX Platform</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            PART 2: CAMPUS LEADERSHIP & EXTRACURRICULARS
        ══════════════════════════════════════════════════ */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="flex items-center gap-2.5 mb-10">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-accent-violet border border-indigo-500/20">
              <Award size={16} />
            </span>
            <div>
              <h3 className="font-jakarta font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white/90">
                Leadership & Extracurriculars
              </h3>
              <p className="font-inter text-xs text-white/45">
                Technical research, creative team leadership, and aerospace innovation initiatives
              </p>
            </div>
          </div>

          {/* Timeline Structure */}
          <div className="relative pl-8 md:pl-12">
            {/* Vertical connector line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ originY: 0 }}
              className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary/60 via-accent-violet/40 to-transparent"
            />

            <div className="space-y-10">
              {leadershipExperience.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={timelineItemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
                  className="relative"
                >
                  {/* Glowing timeline node */}
                  <div className="absolute -left-[2.15rem] md:-left-[3.15rem] top-2 w-3.5 h-3.5 rounded-full bg-accent-primary shadow-[0_0_12px_#3B82F6,0_0_24px_rgba(59,130,246,0.4)] border-2 border-base" />

                  <div className="glass gradient-border card-shine rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-400">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="font-inter text-xs font-bold tracking-[0.2em] text-accent-primary">
                        {item.year}
                      </span>
                      {item.roleType && (
                        <span className="font-inter text-[11px] font-medium text-white/40 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                          {item.roleType}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-jakarta font-semibold text-2xl text-white leading-snug mb-1">
                        {item.title}
                      </h4>
                      <p className="font-inter text-sm font-bold tracking-[0.1em] text-accent-secondary uppercase">
                        {item.company}
                      </p>
                    </div>

                    <p className="font-inter text-sm text-white/55 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <Tag key={tag} color="default">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preserved drive link / external action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12"
            >
              <a
                href="https://drive.google.com/drive/folders/1Rev8HTHu8CfbS0vM29R18WNpMbBSZI5P?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto"
              >
                <MagneticButton
                  className="btn-outline text-sm px-6 py-3 rounded-lg w-full md:w-auto flex items-center justify-center gap-2"
                  strength={0.2}
                >
                  Browse All Work On Drive <ExternalLink size={16} />
                </MagneticButton>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          INTERACTIVE DOSSIER MODAL
      ══════════════════════════════════════════════════ */}
      <ExperienceDossierModal
        isOpen={Boolean(selectedInternship)}
        internship={selectedInternship}
        onClose={handleCloseDossier}
        onOpenHireXProject={setActiveProject}
      />
    </section>
  );
}
