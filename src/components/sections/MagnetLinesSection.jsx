import React from 'react';
import { motion } from 'framer-motion';
import { MagnetLines } from '../ui/magnet-lines';
import MagneticButton from '../ui/MagneticButton';

export default function MagnetLinesSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#070b0a] overflow-hidden pt-20 pb-0">
      
      {/* Background Magnet Lines with Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_60%)]" />
        <MagnetLines 
          rows={12} 
          columns={12} 
          containerSize="100vmin" 
          lineColor="rgba(59,130,246,0.5)" 
          lineWidth="2px"
          lineHeight="4vmin"
          style={{ width: "1024px", maxWidth: "100vw" }}
        />
      </div>

      {/* Top and Bottom Fades for smooth transitions */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#070b0a] to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/80 to-transparent z-10 pointer-events-none" />

      {/* Glass blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none z-0" />

      {/* Animated Particles (CSS based subtle animation) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#60A5FA] uppercase bg-[#60A5FA]/10 px-5 py-2.5 rounded-full border border-[#60A5FA]/20 backdrop-blur-md shadow-[0_0_15px_rgba(96,165,250,0.15)] inline-block">
            The Journey Continues
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-jakarta mb-6 leading-tight text-white drop-shadow-2xl"
        >
          LET'S BUILD THE FUTURE TOGETHER<span className="text-[#3B82F6]">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-inter font-light leading-relaxed"
        >
          Exploring artificial intelligence, research, and digital experiences through thoughtful design and engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold tracking-wide transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </MagneticButton>
          
          <MagneticButton 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold tracking-wide transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-105 active:scale-95"
            onClick={() => {
              // Assuming there is a featured work or projects section to scroll to
              const workSection = document.getElementById('featured') || document.getElementById('projects');
              if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
