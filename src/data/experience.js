/**
 * Experience and Leadership Data
 * Primary source of truth for Longshore Labs: Longshore_report.pdf
 * Strictly adheres to verified internship documentation without exaggerated claims.
 */

export const featuredInternships = [
  {
    id: 'longshore',
    company: 'Longshore Labs',
    role: 'Technology Intern',
    period: 'June – July 2026',
    programmeDuration: '4-Week Intensive Programme',
    location: 'Chennai · Cayman Islands',
    locationDetails:
      'In-office at Chennai development centre, collaborating directly with teams in the Cayman Islands',
    badge: 'Compliance Data Initiative',
    summary:
      'Joined a live compliance data initiative involving a 2.1 million record dataset, helping structure fragmented public information through collection, classification, standardisation, validation, and deduplication.',
    datasetScale: {
      number: '2.1M',
      unit: 'Records',
      label: 'Live Dataset Scale',
      clarification:
        'Scale of the live compliance data initiative worked on by the cross-border team (Chennai & Cayman Islands) — not an individual throughput metric.',
    },
    tags: [
      'MongoDB',
      'Data Quality',
      'Data Validation',
      'Deduplication',
      'Compliance Data',
      'AI Research Tools',
    ],
    reportPdf: '/documents/longshore-internship-report.pdf',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.22)',
    projectTitle: 'Compliance Information & Data Quality Initiative',

    // Overview Section
    overview: {
      problem:
        'Relevant public compliance, legal, and regulatory information is often scattered across diverse sources, published in inconsistent formats, and difficult to search, compare, or evaluate.',
      objective:
        'Help transform fragmented public information into a structured, reliable, and reusable compliance dataset — supporting institutions in identifying compliance, legal, sanctions, and reputational risk more efficiently.',
      quote:
        '"The long-term vision is a reliable, reusable information service — helping institutions identify compliance, legal, sanctions, and reputational risk more efficiently." — Longshore Labs',
    },

    // My Internship Section
    internshipDetails: {
      programme:
        'A full-time, four-week intensive in-office internship at Longshore Labs\' Chennai office, working alongside fellow intern Dhanesh (Rajalakshmi Engineering College) with cross-border collaboration connecting Chennai to the Cayman Islands.',
      evaluation:
        'Approached problems from both technical and practical angles. Quickly grasped the broader compliance and governance context, and communicated progress clearly across teams.',
    },

    // Data Workflow Section
    dataWorkflow: [
      {
        step: '01',
        name: 'Collection',
        type: 'completed',
        summary: 'Aggregating fragmented public records scattered across diverse sources and public registries.',
        isFuture: false,
      },
      {
        step: '02',
        name: 'Classification',
        type: 'completed',
        summary: 'Categorizing records by regulatory jurisdiction, domain, and entity taxonomy.',
        isFuture: false,
      },
      {
        step: '03',
        name: 'Standardisation',
        type: 'completed',
        summary: 'Normalizing inconsistent naming conventions, dates, and schema formats into a unified structure.',
        isFuture: false,
      },
      {
        step: '04',
        name: 'Validation',
        type: 'completed',
        summary: 'Verifying data completeness, attribute integrity, and consistency rules across collections.',
        isFuture: false,
      },
      {
        step: '05',
        name: 'Deduplication',
        type: 'completed',
        summary: 'Identifying and removing duplicate entities and redundant records across datasets.',
        isFuture: false,
      },
      {
        step: '06',
        name: 'Search & Screening',
        type: 'future',
        summary: 'Strengthening automated search, screening capabilities, and developing a reusable compliance information service.',
        isFuture: true,
      },
    ],

    // Technical Learning
    technicalLearning: [
      {
        topic: 'MongoDB',
        category: 'Database Technology',
        detail:
          'Hands-on experience structuring document collections, indexing, querying, and managing operations on large-scale datasets.',
      },
      {
        topic: 'Large-Volume Datasets',
        category: 'Data Engineering',
        detail:
          'Working with a live 2.1M record dataset, understanding scalability considerations, data loading, and pipeline reliability.',
      },
      {
        topic: 'Data Quality & Deduplication',
        category: 'Information Integrity',
        detail:
          'Applying practical data quality practices to identify, cleanse, and eliminate redundant records from inconsistent sources.',
      },
      {
        topic: 'Data Validation',
        category: 'Integrity Verification',
        detail:
          'Enforcing consistency rules and attribute verification to ensure information reliability before downstream usage.',
      },
      {
        topic: 'Technical Documentation',
        category: 'Engineering Standards',
        detail:
          'Turning project specifications and business requirements into clear, structured, and maintainable documentation.',
      },
      {
        topic: 'AI Research Tools',
        category: 'Research Acceleration',
        detail:
          'Utilizing modern AI tools to accelerate data research, classification analysis, and workflow structuring.',
      },
      {
        topic: 'Compliance Context',
        category: 'Domain Knowledge',
        detail:
          'Gaining an understanding of regulatory governance, sanctions lists, legal risk, and reputational risk management.',
      },
    ],

    // What I Learned
    whatILearned: [
      {
        title: 'More Than Code',
        description:
          'Successful technology solutions need more than software — they demand a clear understanding of the problem, reliable data, and responsible information management.',
      },
      {
        title: 'Real-World Data Quality',
        description:
          'Public information is inherently messy and fragmented; systematic standardisation, validation, and deduplication are essential to make raw data usable.',
      },
      {
        title: 'Reliable Information Management',
        description:
          'Learned how data discrepancies and errors carry high costs in regulatory contexts, reinforcing the need for strict quality benchmarks.',
      },
      {
        title: 'Cross-Location Collaboration',
        description:
          'Coordinated between the Chennai development centre and the Cayman Islands product leadership, communicating progress and technical updates smoothly.',
      },
      {
        title: 'Translating Business Requirements',
        description:
          'Grasped how engineering tasks tie directly into Longshore\'s broader strategic objective of creating a reusable commercial compliance information service.',
      },
    ],

    // Next Chapter / Long-term Direction
    nextChapter: [
      'Enriching and validating the collected information',
      'Improving data quality, accuracy, and consistency',
      'Identifying and removing duplicate records',
      'Strengthening search and screening capabilities',
      'Developing the dataset into a reusable compliance information service',
    ],
  },
  {
    id: 'kaavian',
    company: 'Kaavian Systems',
    role: 'Software Development Intern',
    period: 'December 2025 – January 2026',
    location: 'Chennai',
    badge: 'SAP Development Platform',
    summary:
      'Contributed to HireX, an intelligent SAP development and candidate evaluation platform designed to streamline hiring workflows, candidate screening, and recruiter dashboard interfaces.',
    tags: [
      'React',
      'JavaScript',
      'UI/UX Design',
      'Dashboard Architecture',
      'Figma',
      'Candidate Screening',
    ],
    projectSlug: 'hirex',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.22)',
    projectTitle: 'HireX — Candidate Evaluation Platform',
    overview:
      'HireX is an intelligent recruitment and candidate evaluation platform developed to replace fragmented hiring spreadsheets with an integrated candidate screening, skill matching, and stage-tracking workflow.',
    roleContribution:
      'Worked as a Software Development Intern on the HireX SAP development platform, translating product specifications and design system standards into modular UI components, implementing recruiter-facing layouts, and supporting front-end workflow logic.',
    tracks: [
      {
        id: 'recruiter-dashboard',
        title: 'Recruiter Dashboard & Evaluation Screens',
        subtitle: 'Information Density & Stage Progression',
        badge: 'Platform Engineering',
        description:
          'Structured recruiter-facing interfaces enabling hiring teams to review applicant profiles, compare candidate skills against requisition criteria, and track status throughout the shortlisting lifecycle.',
        keyPoints: [
          'Modular recruiter dashboard displaying active job openings, applicant counts, and stage breakdowns.',
          'Candidate evaluation view organizing assessment results, experience records, and profile details.',
          'Rule-informed shortlisting workflow helping recruiters filter applicants based on defined job requirements.',
        ],
        workflowSteps: [
          {
            step: '01',
            title: 'Job Requirement Setup',
            detail: 'Definition of candidate competencies, required qualifications, and screening criteria.',
          },
          {
            step: '02',
            title: 'Candidate Evaluation',
            detail: 'Review of candidate profiles against job requirements in a structured assessment interface.',
          },
          {
            step: '03',
            title: 'Status & Shortlisting',
            detail: 'Transition of candidates across evaluation stages with real-time status tracking.',
          },
        ],
      },
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'JavaScript', category: 'Core Language' },
      { name: 'Figma', category: 'UI/UX Specs' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Dashboard Design', category: 'Interface Architecture' },
      { name: 'Workflow Logic', category: 'State & Process' },
    ],
    engineeringConsiderations: [
      {
        title: 'Managing Information Density',
        desc: 'Organizing complex candidate data, skill badges, and multi-stage statuses into clean visual cards that prevent recruiter fatigue.',
      },
      {
        title: 'Design System Consistency',
        desc: 'Maintaining coherent typography, spacing, and micro-interactions across dashboard overviews, candidate profiles, and evaluation modals.',
      },
      {
        title: 'Workflow Predictability',
        desc: 'Ensuring state transitions between screening, evaluation, and shortlisting are intuitive and responsive for non-technical hiring managers.',
      },
    ],
  },
];

export const leadershipExperience = [
  {
    id: 1,
    year: '2024 – Present',
    title: 'Research Lead',
    company: 'Blockchain Innovation Club (BIC)',
    roleType: 'Technical Research & Mentorship',
    description:
      'Leading technical research and innovation initiatives in blockchain and emerging technologies while mentoring student researchers, organizing knowledge-sharing activities, and fostering a culture of experimentation and continuous learning.',
    tags: ['RESEARCH', 'BLOCKCHAIN', 'INNOVATION', 'MENTORSHIP'],
  },
  {
    id: 2,
    year: '2024 – 2025',
    title: 'Joint Secretary',
    company: 'Designix — Design & Creative Club',
    roleType: 'Design Operations & Leadership',
    description:
      'Led and coordinated the core design team across multiple events, workshops, and creative initiatives. Managed team operations, task allocation, and project execution while ensuring design consistency and quality. Collaborated with organizers and stakeholders to deliver branding, promotional materials, and digital assets. Mentored junior designers and supported creative strategy for club activities.',
    tags: ['TEAM LEADERSHIP', 'DESIGN STRATEGY', 'BRANDING', 'OPERATIONS'],
  },
  {
    id: 3,
    year: '2023 – 2024',
    title: 'Project Team Associate',
    company: 'Students for the Exploration and Development of Space (SEDS)',
    roleType: 'Aerospace Engineering & Research',
    description:
      'Contributed to multidisciplinary engineering and research projects related to space technology and innovation. Collaborated with team members on project planning, technical development, and documentation. Participated in problem-solving, prototyping, and technology exploration activities. Supported project execution through research, design, and technical implementation efforts.',
    tags: ['RESEARCH', 'PROTOTYPING', 'SPACE TECH', 'ENGINEERING'],
  },
];

// Preserved for backward compatibility
export const experience = leadershipExperience;
