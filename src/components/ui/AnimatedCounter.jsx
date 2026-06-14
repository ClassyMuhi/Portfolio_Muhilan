import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.round(v) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration, suffix, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}
