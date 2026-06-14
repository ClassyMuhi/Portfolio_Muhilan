import edumateImg from '../assets/Edumate_UI_1.png';
import hirexImg from '../assets/HireX - UI/Desktop.png';

export const research = [
  {
    id: 1,
    year: '2026',
    title: 'Emergent Reasoning in Large Vision-Language Models',
    summary: 'Investigating how multimodal transformers develop chain-of-thought reasoning capabilities when exposed to interleaved image-text data at scale.',
    tags: ['VLMs', 'Reasoning', 'Multimodal', 'Ongoing'],
  },
  {
    id: 2,
    year: '2025',
    title: 'Efficient Attention for Real-Time Computer Vision',
    summary: 'Proposed a linear-complexity attention approximation enabling transformer-based object detectors to run at 60 FPS on edge hardware.',
    tags: ['Attention', 'Edge AI', 'Computer Vision', 'Efficiency'],
  },
  {
    id: 3,
    year: '2025',
    title: 'Human-AI Co-Creation in Design Tools',
    summary: 'User study examining how generative AI tools reshape designer workflows, creativity, and decision-making patterns.',
    tags: ['HCI', 'Generative AI', 'UX Research', 'Published'],
  },
  {
    id: 4,
    year: '2024',
    title: 'Bias Detection in Facial Recognition Pipelines',
    summary: 'Systematic audit of commercial facial recognition APIs across demographic groups; proposed fairness-aware retraining strategies.',
    tags: ['Fairness', 'Computer Vision', 'Ethics', 'Published'],
  },
];

export const designs = [
  { 
    id: 5, 
    title: 'EduMate — Campus Companion', 
    category: 'UI/UX Case Study', 
    gradient: 'from-blue-500/30 to-indigo-500/20', 
    height: 'h-64',
    image: edumateImg
  },
  { 
    id: 7, 
    title: 'HireX — Recruitment Platform', 
    category: 'UI/UX Case Study', 
    gradient: 'from-blue-500/30 to-cyan-500/20', 
    height: 'h-48',
    image: hirexImg
  },

];
