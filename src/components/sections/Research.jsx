import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import { research } from '../../data/research';

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Research() {
  return (
    <section id="research" className="section-padding bg-base-100 relative overflow-hidden">
      <div className="absolute left-0 top-1/4 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Research & Exploration"
          title="Research &"
          highlight="Exploration"
          subtitle="Academic research, independent investigations, and collaborative studies."
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
            {research.map((item, i) => (
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
                <div className="absolute -left-[2.15rem] md:-left-[3.15rem] top-1.5 w-3 h-3 rounded-full bg-accent-primary shadow-glow-primary border-2 border-base" />

                <div className="glass gradient-border rounded-2xl p-6 md:p-8 flex flex-col gap-4
                  hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-inter text-xs font-bold tracking-[0.2em] text-accent-primary">{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Tag key={tag} color={tag === 'Ongoing' ? 'green' : tag === 'Published' ? 'cyan' : 'default'}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-jakarta font-semibold text-lg text-white leading-snug">{item.title}</h3>
                  <p className="font-inter text-sm text-white/55 leading-relaxed">{item.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
