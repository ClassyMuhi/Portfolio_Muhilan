import { Mail, ArrowUpRight, ArrowUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 24, style, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, style, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05080f] overflow-hidden pt-24 pb-10 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="font-jakarta font-black text-3xl tracking-[0.1em] text-white">
              MUHILAN<span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #818CF8)' }}>.</span>
            </span>
            <p className="font-inter text-white/50 text-sm leading-relaxed max-w-sm">
              Exploring artificial intelligence, research, and digital experiences through thoughtful design and engineering. Building the future, one pixel at a time.
            </p>
            <div className="flex items-center gap-3 mt-2 px-4 py-2 w-fit rounded-full glass border border-white/5 bg-white/[0.02]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">Available for New Opportunities</span>
            </div>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-5">
            <h4 className="font-jakarta font-bold text-white text-sm tracking-widest uppercase mb-2">Navigation</h4>
            {[
              { label: 'Work', href: '#work' },
              { label: 'Experience', href: '#experience' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="font-inter text-white/40 hover:text-white text-sm transition-colors w-fit relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#3B82F6] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Socials Col */}
          <div className="flex flex-col gap-5">
            <h4 className="font-jakarta font-bold text-white text-sm tracking-widest uppercase mb-2">Connect</h4>
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhilan-s-6a2120332/', icon: LinkedinIcon },
              { label: 'GitHub', href: 'https://github.com/ClassyMuhi', icon: GithubIcon },
              { label: 'Email', href: 'mailto:muhilan.s.2024.csd@rajalakshmi.edu.in', icon: Mail },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 font-inter text-white/40 hover:text-white text-sm transition-colors w-fit">
                <social.icon size={16} className="group-hover:text-[#3B82F6] transition-colors" />
                {social.label}
                <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#3B82F6]" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="glow-divider w-full mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/30 text-xs font-inter text-center md:text-left">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#3B82F6]" />
              <span>Chennai, India</span>
            </div>
            <span className="hidden md:inline text-white/10">|</span>
            <span>© {new Date().getFullYear()} Muhilan. All rights reserved.</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 rounded-full glass border border-white/10 hover:bg-white/5 hover:border-accent-primary/30 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="text-white/50 group-hover:text-accent-secondary transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
