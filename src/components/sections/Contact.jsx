import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, FileText, Folder, CheckCircle, AlertCircle } from 'lucide-react';
import resumeFile from '../../assets/Resume_Muhilan.pdf';

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

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "New Contact from Portfolio",
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#03060a] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(110,231,183,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-jakarta font-black text-4xl md:text-5xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              Let us build a visual<br />world that feels<br />unforgettable.
            </h2>
            <p className="font-inter text-white/50 leading-relaxed text-sm max-w-md mb-2">
              For internships, freelance design work, UI/UX concepts, event visuals, or motion edits, this portal is open for collaboration.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { icon: LinkedinIcon, label: 'LINKEDIN', value: 'muhilan-s-6a2120332', href: 'https://www.linkedin.com/in/muhilan-s-6a2120332/', color: '#0A66C2' },
                { icon: GithubIcon, label: 'GITHUB', value: 'ClassyMuhi', href: 'https://github.com/ClassyMuhi', color: '#ffffff' },
                { icon: Mail, label: 'EMAIL', value: 'muhilan.s.2024.csd@rajalakshmi.edu.in', href: 'mailto:muhilan.s.2024.csd@rajalakshmi.edu.in', color: '#06B6D4' },
                { icon: Phone, label: 'PHONE', value: '+91 8072151665', href: 'tel:+918072151665', color: '#10B981' },
                { icon: FileText, label: 'RESUME', value: 'View / Download', href: resumeFile, color: '#F59E0B' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 glass border border-white/5 hover:border-white/20 transition-all duration-300 rounded-lg bg-[#0a0f16]">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={16} style={{ color: color }} />
                  </div>
                  <div>
                    <span className="font-jakarta font-bold text-white text-sm mr-2">{label}</span>
                    <span className="font-inter text-white/40 text-sm group-hover:text-white/70 transition-colors">{value}</span>
                  </div>
                </a>
              ))}
            </div>

            <a href="https://drive.google.com/drive/folders/1Rev8HTHu8CfbS0vM29R18WNpMbBSZI5P?usp=drive_link" target="_blank" rel="noopener noreferrer" className="mt-2 w-full flex items-center justify-center gap-3 p-4 border border-[#3B82F6]/30 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 transition-colors rounded-lg font-jakarta font-bold text-sm text-[#3B82F6] uppercase tracking-widest">
              <Folder size={16} /> VIEW FULL PORTFOLIO ON DRIVE
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg mx-auto lg:ml-auto"
          >
            <div className="relative p-8 md:p-10 rounded-xl border border-white/5 bg-[#05080f] overflow-hidden shadow-2xl">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#6EE7B7] rounded-tl-xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#6EE7B7] tracking-widest uppercase font-bold">PLAYER NAME</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-[#0a0f16] border border-white/5 p-4 rounded-lg text-white font-inter text-sm outline-none focus:border-[#6EE7B7]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#6EE7B7] tracking-widest uppercase font-bold">CHANNEL</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-[#0a0f16] border border-white/5 p-4 rounded-lg text-white font-inter text-sm outline-none focus:border-[#6EE7B7]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#6EE7B7] tracking-widest uppercase font-bold">MESSAGE PACKET</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the project"
                    required
                    rows={4}
                    className="w-full bg-[#0a0f16] border border-white/5 p-4 rounded-lg text-white font-inter text-sm outline-none focus:border-[#6EE7B7]/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="mt-2 w-full py-4 text-[#03060a] font-jakarta font-black text-[13px] tracking-[0.15em] uppercase rounded hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-80"
                  style={{ background: 'linear-gradient(90deg, #6EE7B7 0%, #34D399 100%)' }}
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : status === 'success' ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle size={16} /> TRANSMISSION COMPLETE
                    </span>
                  ) : (
                    <>SEND MESSAGE</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
