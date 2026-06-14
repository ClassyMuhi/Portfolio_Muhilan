import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = false, gradient = false }) {
  const base = 'rounded-2xl glass';
  const gradientClass = gradient ? 'gradient-border' : '';
  const hoverClass = hover
    ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1'
    : '';

  return (
    <motion.div className={`${base} ${gradientClass} ${hoverClass} ${className}`}>
      {children}
    </motion.div>
  );
}
