import { motion } from 'framer-motion';

export default function SkillPill({ label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      className="skill-pill"
    >
      {label}
    </motion.div>
  );
}
