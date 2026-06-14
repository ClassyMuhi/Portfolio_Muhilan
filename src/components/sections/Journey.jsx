import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { journey } from '../../data/skills';

export default function Journey() {
  return (
    <section id="journey" className="section-padding bg-base relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="My Journey"
          title="The"
          highlight="Journey"
          subtitle="Education, experience, and milestones that shaped my path."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {journey.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 250 } }}
              className="glass gradient-border rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4"
            >
              {/* Colored left accent stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: item.color }} />

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-inter text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: item.color }}>
                    {item.type}
                  </span>
                  <span className="font-inter text-xs text-white/40">{item.year}</span>
                </div>
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <h3 className="font-jakarta font-semibold text-base text-white leading-snug">{item.title}</h3>
                <p className="font-inter text-xs text-white/45 tracking-wide">{item.subtitle}</p>
              </div>

              <p className="font-inter text-sm text-white/55 leading-relaxed">{item.description}</p>

              {/* Background glow decoration */}
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                style={{ background: item.color, filter: 'blur(30px)', transform: 'translate(30%, 30%)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
