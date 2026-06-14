import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import SkillPill from '../ui/SkillPill';
import { skills } from '../../data/skills';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const pill = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

export default function Skills() {
  // Split into rows of varying sizes for organic feel
  const row1 = skills.slice(0, 6);
  const row2 = skills.slice(6, 12);
  const row3 = skills.slice(12, 18);
  const row4 = skills.slice(18, 24);
  const row5 = skills.slice(24);

  return (
    <section id="skills" className="section-padding bg-base-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(rgba(59,130,246,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-5xl mx-auto text-center">
        <SectionHeading
          eyebrow="Expertise"
          title="Skills &"
          highlight="Capabilities"
          center
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center gap-4"
        >
          {[row1, row2, row3, row4, row5].map((row, ri) => (
            <div key={ri} className={`flex flex-wrap justify-center gap-3 ${ri % 2 !== 0 ? 'translate-x-4 md:translate-x-8' : '-translate-x-4 md:-translate-x-8'}`}>
              {row.map((skill) => (
                <motion.div key={skill.id} variants={pill}>
                  <SkillPill label={skill.label} />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
