import deepfakeImg from '../assets/Screenshot (406).png';
import hirexImg from '../assets/HireX - UI/Desktop.png';

export const projects = [
  {
    id: 4,
    title: 'Polypharmacy Engine',
    description: 'Clinical decision-support system that combines OCR, drug-drug interaction analysis, and polypharmacy risk scoring to automate medication safety review.',
    tags: ['Healthcare AI', 'Gemini API', 'OCR'],
    gradient: 'from-emerald-500/30 to-teal-500/10',
    category: 'Healthcare AI',
    iconName: 'Activity',
  },
  {
    id: 8,
    title: 'Smart SMS — Communication Platform',
    description: 'A modular Django-based SMS management system for secure messaging, contact organization, delivery tracking, and user authentication via REST APIs.',
    tags: ['Django', 'REST API', 'Backend'],
    gradient: 'from-blue-500/30 to-indigo-500/10',
    category: 'Backend System',
    iconName: 'MessageSquare',
  },
  {
    id: 1,
    title: 'Multimodal Deepfake Detector',
    description: 'Detecting AI-generated synthetic media through the fusion of biological signals (EAR, MAR) and forensic texture analysis powered by YOLOv8 and MediaPipe.',
    tags: ['Computer Vision', 'YOLOv8', 'MediaPipe'],
    gradient: 'from-accent-primary/30 to-accent-secondary/10',
    category: 'AI / Research',
    image: deepfakeImg,
  },
];

export const featuredWork = [
  {
    id: 1,
    category: 'AI Project',
    title: 'Multimodal Deepfake Detector',
    description: 'Detecting AI-generated synthetic media through the fusion of biological signals (EAR, MAR) and forensic texture analysis powered by YOLOv8 and MediaPipe.',
    tags: ['Computer Vision', 'YOLOv8', 'MediaPipe', 'Research'],
    gradient: 'from-accent-primary/30 via-accent-secondary/20 to-transparent',
    accentColor: '#3B82F6',
    image: deepfakeImg,
  },
  {
    id: 7,
    category: 'UI/UX Case Study',
    title: 'HireX — Recruitment Platform',
    description: 'A modern recruitment platform designed to streamline candidate screening, automate evaluation workflows, and improve hiring efficiency.',
    tags: ['UI/UX Design', 'Dashboard Design', 'Figma', 'Product Design'],
    gradient: 'from-blue-500/30 via-cyan-500/15 to-transparent',
    accentColor: '#3B82F6',
    image: hirexImg,
  },
  {
    id: 6,
    category: 'Research Project',
    title: 'Project Astra — Radio Telescope',
    description: 'Designing a low-cost radio telescope system under ₹6,000 using SDR technology for wide-band RF monitoring, automated anomaly detection, and spectrum analysis.',
    tags: ['SDR', 'Radio Astronomy', 'GNU Radio', 'Signal Processing'],
    gradient: 'from-cyan-500/30 via-blue-500/15 to-transparent',
    accentColor: '#06B6D4',
    iconName: 'Radio',
  },
];
