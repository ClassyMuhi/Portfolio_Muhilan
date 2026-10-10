import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative flex items-center gap-2 p-2.5 rounded-full transition-all duration-300 theme-toggle-btn ${
        isDark
          ? 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]'
          : 'bg-black/[0.05] hover:bg-black/[0.08] border border-slate-300/80 text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center justify-center text-blue-400"
            >
              <Moon size={18} className="fill-blue-400/20" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center justify-center text-amber-500"
            >
              <Sun size={18} className="fill-amber-500/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="font-inter text-xs font-semibold tracking-wider uppercase select-none pr-1">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  );
}
