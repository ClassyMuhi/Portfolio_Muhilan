import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import MagneticButton from '../ui/MagneticButton';
import { ExternalLink } from 'lucide-react';
import { experience } from '../../data/experience';

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-base-100 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Experience Timeline"
          subtitle="A timeline of my professional experience and roles."
        />

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary/60 via-accent-secondary/30 to-transparent"
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot on line */}
                <div className="absolute -left-[2.15rem] md:-left-[3.15rem] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-primary shadow-[0_0_12px_#3B82F6,0_0_24px_rgba(59,130,246,0.4)] border-2 border-base" />

                <div className="glass gradient-border card-shine rounded-2xl p-6 md:p-8 flex flex-col gap-4
                  hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-400">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-inter text-xs font-bold tracking-[0.2em] text-accent-primary">{item.year}</span>
                  </div>
                  <div>
                    <h3 className="font-jakarta font-semibold text-2xl text-white leading-snug mb-1">{item.title}</h3>
                    <p className="font-inter text-sm font-bold tracking-[0.1em] text-accent-secondary uppercase">{item.company}</p>
                  </div>
                  <p className="font-inter text-sm text-white/55 leading-relaxed">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
             <MagneticButton className="btn-outline text-sm px-6 py-3 rounded-lg w-full md:w-auto flex items-center justify-center gap-2" strength={0.2}>
                  Browse All Work On Drive <ExternalLink size={16} />
             </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
