import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, highlight, subtitle, center = false }) {
  const alignClass = center ? 'items-center text-center' : 'items-start';

  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col gap-4 ${alignClass} mb-16`}
    >
      {eyebrow && (
        <motion.span variants={item} className="eyebrow">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={item}
        className="font-jakarta font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
      >
        {renderTitle()}
      </motion.h2>
      {subtitle && (
        <motion.p variants={item} className="font-inter text-white/55 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
