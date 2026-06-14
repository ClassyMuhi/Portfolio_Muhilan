import { motion } from 'framer-motion';

export default function SkillPill({ label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="inline-flex items-center px-5 py-2.5 rounded-full cursor-default select-none
        glass border border-white/10
        font-inter text-sm font-medium text-white/80
        hover:border-accent-primary/40 hover:text-accent-primary hover:shadow-glow-primary
        transition-colors duration-300"
    >
      {label}
    </motion.div>
  );
}
