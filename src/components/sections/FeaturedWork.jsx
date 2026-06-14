import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Radio, MessageSquare, Activity } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import { featuredWork } from '../../data/projects';

// Map of project id → overlay key
const PROJECT_OVERLAYS = { 1: 'deepfake', 4: 'polypharmacy', 5: 'edumate', 6: 'astra', 7: 'hirex', 8: 'smartsms' };

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function FeaturedWork({ setActiveProject }) {
  return (
    <section id="work" className="section-padding bg-base-100 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Featured"
          title="Selected Work"
          highlight="Work"
          subtitle="A curated selection of projects spanning AI research, product development, and design."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {featuredWork.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover="hover"
              className="group relative rounded-2xl overflow-hidden glass border border-white/8 cursor-pointer"
              onClick={() => {
                const overlay = PROJECT_OVERLAYS[item.id];
                if (overlay && setActiveProject) setActiveProject(overlay);
              }}
            >
              {/* Gradient Thumbnail */}
              <div className={`relative h-52 bg-gradient-to-br ${item.gradient} flex items-end p-6 overflow-hidden`}>
                {/* Dynamic Image or Icon */}
                {item.image ? (
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                ) : item.iconName ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                    {item.iconName === 'Radio' && <Radio size={100} className="text-white" />}
                    {item.iconName === 'MessageSquare' && <MessageSquare size={100} className="text-white" />}
                    {item.iconName === 'Activity' && <Activity size={100} className="text-white" />}
                  </div>
                ) : null}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/40 to-transparent" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 z-10 text-[10px] font-inter font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: `${item.accentColor}30`, color: '#fff', border: `1px solid ${item.accentColor}60` }}>
                  {item.category}
                </span>

                {/* Hover arrow */}
                <motion.div
                  variants={{ hover: { opacity: 1, scale: 1 } }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <ArrowUpRight size={16} className="text-white" />
                </motion.div>
              </div>

                {/* Decorative glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${item.accentColor}20 0%, transparent 70%)` }} />

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-jakarta font-bold text-lg text-white leading-snug group-hover:text-accent-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-white/55 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                {/* View Project CTA — only for cards with a linked overlay */}
                {PROJECT_OVERLAYS[item.id] && (
                  <button
                    className="mt-2 w-fit inline-flex items-center gap-2 font-inter text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    onClick={(e) => { e.stopPropagation(); setActiveProject && setActiveProject(PROJECT_OVERLAYS[item.id]); }}
                  >
                    View Project <ExternalLink size={11} />
                  </button>
                )}
              </div>

              {/* Bottom hover border */}
              <motion.div
                variants={{ hover: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                style={{ originX: 0, background: `linear-gradient(to right, ${item.accentColor}, transparent)` }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
