import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { designs } from '../../data/research';
import { graphicDesigns } from '../../data/graphicDesigns';
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function DesignShowcase({ setActiveProject }) {
  const [selectedDesign, setSelectedDesign] = useState(null);

  // Map of project id → overlay key
  const PROJECT_OVERLAYS = { 1: 'deepfake', 4: 'polypharmacy', 5: 'edumate', 6: 'astra', 7: 'hirex', 8: 'smartsms' };

  // Split into two columns for masonry
  const col1 = designs.filter((_, i) => i % 2 === 0);
  const col2 = designs.filter((_, i) => i % 2 !== 0);

  // Close modal with ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDesign(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const DesignCard = ({ item, i }) => (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      whileHover="hover"
      onClick={() => {
        const overlay = PROJECT_OVERLAYS[item.id];
        if (overlay && setActiveProject) setActiveProject(overlay);
      }}
      className={`relative ${item.height} rounded-2xl overflow-hidden glass border border-white/8 group cursor-pointer mb-5`}
    >
      {/* Background Image or Gradient */}
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
      )}
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a]/90 via-[#070b0a]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent opacity-60" />

      {/* Category pill */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[10px] font-inter font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/80">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10">
        <h3 className="font-jakarta font-bold text-xl text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {item.title}
        </h3>
        
        {/* View Project button (appears on hover) */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <span className="inline-flex items-center gap-2 mt-2 font-inter text-xs font-semibold text-blue-400">
            View Case Study 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </span>
        </div>
      </div>
    </motion.div>
  );

  const GraphicDesignCard = ({ design, i }) => (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      whileHover="hover"
      onClick={() => setSelectedDesign(design)}
      className="relative rounded-2xl overflow-hidden glass border border-white/8 group cursor-pointer mb-6 break-inside-avoid"
    >
      {design.type === 'image' ? (
        <img 
          src={design.image} 
          alt={design.title} 
          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
        />
      ) : (
        <div className="w-full aspect-[3/4] relative overflow-hidden bg-white/5 transform transition-transform duration-700 group-hover:scale-105">
          <iframe 
            src={`${design.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
            className="absolute inset-0 w-full h-full pointer-events-none border-none"
            title={design.title}
          />
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-[#070b0a]/90 via-[#070b0a]/40 to-transparent flex flex-col justify-end p-6"
      >
        <motion.div
          variants={{ hover: { y: 0, opacity: 1 } }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-[10px] font-inter font-bold tracking-[0.2em] uppercase text-blue-400 mb-2 block">
            {design.category}
          </span>
          <h3 className="font-jakarta font-bold text-lg text-white">{design.title}</h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="designs" className="section-padding bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Design Showcase"
          title="Design"
          highlight="Showcase"
          subtitle="Visual explorations, UI concepts, and product design work."
        />

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {col1.map((item, i) => <DesignCard key={item.id} item={item} i={i * 2} />)}
          </div>
          <div className="md:mt-10">
            {col2.map((item, i) => <DesignCard key={item.id} item={item} i={i * 2 + 1} />)}
          </div>
        </div>

        {/* Graphic Design Showcase */}
        <div className="mt-32">
          <SectionHeading
            eyebrow="GRAPHIC DESIGN SHOWCASE"
            title="Graphic"
            highlight="Design"
            subtitle="A collection of posters, visual explorations, branding concepts, and digital design work."
          />

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {graphicDesigns.map((design, i) => (
              <GraphicDesignCard key={design.id} design={design} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b0a]/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center cursor-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDesign(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {selectedDesign.type === 'image' ? (
                <img 
                  src={selectedDesign.image} 
                  alt={selectedDesign.title} 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-blue-500/10" 
                />
              ) : (
                <object 
                  data={selectedDesign.image} 
                  type="application/pdf" 
                  className="w-full h-[80vh] rounded-lg shadow-2xl shadow-blue-500/10 bg-white"
                >
                  <p className="p-4">Unable to display PDF file. <a href={selectedDesign.image} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Download</a> instead.</p>
                </object>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
