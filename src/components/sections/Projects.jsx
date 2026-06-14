import { motion } from 'framer-motion';
import { ExternalLink, Radio, MessageSquare, Activity } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import MagneticButton from '../ui/MagneticButton';
import { projects } from '../../data/projects';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Map of project id → overlay key
const PROJECT_OVERLAYS = { 1: 'deepfake', 4: 'polypharmacy', 5: 'edumate', 6: 'astra', 7: 'hirex', 8: 'smartsms' };

export default function Projects({ setActiveProject }) {
  return (
    <section id="projects" className="section-padding bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="All Projects"
          title="Projects"
          subtitle="End-to-end builds spanning AI systems, web platforms, and design tools."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={card}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 250, damping: 18 } }}
              onClick={() => {
                const overlay = PROJECT_OVERLAYS[project.id];
                if (overlay && setActiveProject) setActiveProject(overlay);
              }}
              className="group glass gradient-border rounded-2xl overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Gradient Image Placeholder */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-end p-5`}>
                {/* Dynamic Image or Icon */}
                {project.image ? (
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                ) : project.iconName ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                    {project.iconName === 'Radio' && <Radio size={80} className="text-white" />}
                    {project.iconName === 'MessageSquare' && <MessageSquare size={80} className="text-white" />}
                    {project.iconName === 'Activity' && <Activity size={80} className="text-white" />}
                  </div>
                ) : null}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/30 to-transparent opacity-80" />

                <span className="absolute top-3 left-3 z-10 font-inter text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/70">
                  {project.category}
                </span>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)' }} />
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-jakarta font-semibold text-base text-white group-hover:text-accent-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-inter text-xs text-white/50 leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <MagneticButton className="btn-outline text-xs px-4 py-2.5 mt-1 rounded-lg w-fit" strength={0.2}>
                  Learn More <ExternalLink size={11} />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
