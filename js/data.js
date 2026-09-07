/* ------------------------------------------------------------------
   Sample data — no backend, no persistence, no real enrollment.
   Every card and every chip on the page is rendered from this file.
------------------------------------------------------------------ */

/* ---------------- Exam tracks (the front-page chooser) ---------------- */
window.LP_TRACKS = [
  {
    id: 'gate',
    name: 'GATE',
    full: 'Graduate Aptitude Test in Engineering',
    tagline: 'Concept-first engineering lectures',
    blurb: 'Core subject depth, previous-year drills and full-length mocks for CS, EC and ME aspirants.',
    heroTitle: 'Engineer Your <em>GATE</em> Rank',
    heroSub: 'Subject-wise lectures built around the official syllabus — theory, solved PYQs and timed practice, in the order you should actually study them.',
    nowPlaying: { title: 'Operating Systems: Deadlocks', meta: 'Lecture 07 · Banker’s algorithm', progress: '62%' },
    stats: { lectures: '92', faculty: '14', rating: '4.8' },
    subjects: ['All', 'CS & IT', 'Electronics', 'Mechanical', 'Mathematics'],
    art: { from: '#c9d8ff', to: '#eef2ff', ink: '#2f3d80', motif: 'nodes' }
  },
  {
    id: 'upsc',
    name: 'UPSC',
    full: 'Civil Services Examination',
    tagline: 'General Studies, Prelims to Mains',
    blurb: 'GS I–IV, CSAT and current affairs — structured for a full cycle, with answer-writing built in.',
    heroTitle: 'Prepare for <em>UPSC</em>, Properly',
    heroSub: 'A complete General Studies foundation — Polity, History, Geography, Economy, Environment and Ethics — paired with answer writing and monthly current affairs.',
    nowPlaying: { title: 'Indian Polity: Fundamental Rights', meta: 'Lecture 12 · Articles 19–22', progress: '48%' },
    stats: { lectures: '128', faculty: '22', rating: '4.9' },
    subjects: ['All', 'GS Paper I', 'GS Paper II', 'GS Paper III', 'GS Paper IV', 'CSAT'],
    art: { from: '#ffe0c7', to: '#fff6ee', ink: '#8a4a1d', motif: 'window' }
  },
  {
    id: 'optional',
    name: 'Optional Subjects',
    full: 'UPSC Mains optional papers',
    tagline: 'Paper I & II, taught end to end',
    blurb: 'Full optional coverage with thinkers, case studies and past-paper answer frameworks.',
    heroTitle: 'Master Your <em>Optional</em>',
    heroSub: 'Complete Paper I and Paper II coverage for the most-chosen optionals, with thinker-wise notes, diagrams and model answers for a decade of past papers.',
    nowPlaying: { title: 'Sociology: Durkheim on Suicide', meta: 'Lecture 05 · Types & social integration', progress: '71%' },
    stats: { lectures: '86', faculty: '11', rating: '4.8' },
    subjects: ['All', 'Humanities', 'Social Sciences', 'Science'],
    art: { from: '#d8f0e4', to: '#f1fbf6', ink: '#1f5c45', motif: 'grid' }
  }
];

/* ---------------- Lectures ---------------- */
window.LP_COURSES = [
  /* ===== GATE ===== */
  {
    track: 'gate', subject: 'CS & IT', title: 'Data Structures & Algorithms',
    instructor: 'Prof. Aravind Menon', price: 2499, oldPrice: 3999,
    rating: 4.9, reviews: 4120, hours: 46, lessons: 128, level: 'Core subject',
    badge: 'Best Seller', art: { from: '#c9d8ff', to: '#eef2ff', ink: '#2f3d80', motif: 'nodes' }
  },
  {
    track: 'gate', subject: 'CS & IT', title: 'Operating Systems',
    instructor: 'Dr. Neha Kulkarni', price: 1999, oldPrice: 2999,
    rating: 4.8, reviews: 3180, hours: 32, lessons: 94, level: 'Core subject',
    badge: '', art: { from: '#cfe9f5', to: '#eef8fd', ink: '#1d5570', motif: 'layers' }
  },
  {
    track: 'gate', subject: 'CS & IT', title: 'Theory of Computation',
    instructor: 'Prof. Ritwik Bose', price: 1799, oldPrice: 2799,
    rating: 4.7, reviews: 1960, hours: 26, lessons: 72, level: 'Advanced',
    badge: '', art: { from: '#e6ddff', to: '#f6f2ff', ink: '#4a3183', motif: 'letter' }
  },
  {
    track: 'gate', subject: 'CS & IT', title: 'Computer Networks',
    instructor: 'Dr. Sana Qureshi', price: 1899, oldPrice: 2899,
    rating: 4.7, reviews: 2240, hours: 28, lessons: 81, level: 'Core subject',
    badge: 'Popular', art: { from: '#d5dbe6', to: '#f2f4f8', ink: '#33405a', motif: 'wave' }
  },
  {
    track: 'gate', subject: 'Electronics', title: 'Signals & Systems',
    instructor: 'Prof. Devang Shah', price: 2199, oldPrice: 3299,
    rating: 4.8, reviews: 1580, hours: 34, lessons: 96, level: 'Core subject',
    badge: 'Trending', art: { from: '#fdeec2', to: '#fffaea', ink: '#7a5a12', motif: 'wave' }
  },
  {
    track: 'gate', subject: 'Electronics', title: 'Digital Logic & Microprocessors',
    instructor: 'Dr. Meera Iyer', price: 1699, oldPrice: 2599,
    rating: 4.6, reviews: 1140, hours: 24, lessons: 68, level: 'Beginner friendly',
    badge: '', art: { from: '#d8f0e4', to: '#f1fbf6', ink: '#1f5c45', motif: 'grid' }
  },
  {
    track: 'gate', subject: 'Mechanical', title: 'Thermodynamics & Fluid Mechanics',
    instructor: 'Prof. Harish Nambiar', price: 2299, oldPrice: 3499,
    rating: 4.7, reviews: 1320, hours: 38, lessons: 104, level: 'Core subject',
    badge: 'New', art: { from: '#ffd9df', to: '#fff2f4', ink: '#8c2f45', motif: 'chart' }
  },
  {
    track: 'gate', subject: 'Mathematics', title: 'Engineering Mathematics',
    instructor: 'Dr. Latha Srinivasan', price: 1499, oldPrice: 2499,
    rating: 4.9, reviews: 5240, hours: 30, lessons: 88, level: 'All branches',
    badge: 'Featured', art: { from: '#dfe7f7', to: '#f6f1ea', ink: '#2f3d80', motif: 'spark' }
  },

  /* ===== UPSC ===== */
  {
    track: 'upsc', subject: 'GS Paper II', title: 'Indian Polity & Constitution',
    instructor: 'Rajeev Kaushik', price: 2999, oldPrice: 4499,
    rating: 4.9, reviews: 8640, hours: 52, lessons: 142, level: 'Prelims + Mains',
    badge: 'Best Seller', art: { from: '#ffe0c7', to: '#fff6ee', ink: '#8a4a1d', motif: 'window' }
  },
  {
    track: 'upsc', subject: 'GS Paper I', title: 'Modern Indian History',
    instructor: 'Dr. Ananya Ghosh', price: 2499, oldPrice: 3799,
    rating: 4.8, reviews: 6210, hours: 44, lessons: 118, level: 'Prelims + Mains',
    badge: '', art: { from: '#fdeec2', to: '#fffaea', ink: '#7a5a12', motif: 'letter' }
  },
  {
    track: 'upsc', subject: 'GS Paper I', title: 'Geography: Physical & Human',
    instructor: 'Prof. Vikram Rathore', price: 2299, oldPrice: 3499,
    rating: 4.7, reviews: 4380, hours: 40, lessons: 110, level: 'Prelims + Mains',
    badge: 'Popular', art: { from: '#d8f0e4', to: '#f1fbf6', ink: '#1f5c45', motif: 'layers' }
  },
  {
    track: 'upsc', subject: 'GS Paper III', title: 'Indian Economy',
    instructor: 'Dr. Suhail Ahmed', price: 2699, oldPrice: 3999,
    rating: 4.8, reviews: 5120, hours: 46, lessons: 124, level: 'Prelims + Mains',
    badge: 'Trending', art: { from: '#ffd9df', to: '#fff2f4', ink: '#8c2f45', motif: 'chart' }
  },
  {
    track: 'upsc', subject: 'GS Paper III', title: 'Environment & Ecology',
    instructor: 'Sneha Balan', price: 1799, oldPrice: 2699,
    rating: 4.7, reviews: 3040, hours: 26, lessons: 74, level: 'Prelims focus',
    badge: '', art: { from: '#cfe9f5', to: '#eef8fd', ink: '#1d5570', motif: 'nodes' }
  },
  {
    track: 'upsc', subject: 'GS Paper IV', title: 'Ethics, Integrity & Aptitude',
    instructor: 'Prof. Nandini Rao', price: 1999, oldPrice: 2999,
    rating: 4.9, reviews: 3960, hours: 28, lessons: 76, level: 'Mains only',
    badge: 'Featured', art: { from: '#e6ddff', to: '#f6f2ff', ink: '#4a3183', motif: 'spark' }
  },
  {
    track: 'upsc', subject: 'CSAT', title: 'CSAT: Aptitude & Comprehension',
    instructor: 'Imran Sheikh', price: 1299, oldPrice: 1999,
    rating: 4.6, reviews: 2180, hours: 22, lessons: 64, level: 'Qualifying paper',
    badge: '', art: { from: '#d5dbe6', to: '#f2f4f8', ink: '#33405a', motif: 'grid' }
  },
  {
    track: 'upsc', subject: 'GS Paper II', title: 'Governance & International Relations',
    instructor: 'Dr. Kavya Menon', price: 2199, oldPrice: 3299,
    rating: 4.7, reviews: 2740, hours: 32, lessons: 89, level: 'Mains focus',
    badge: 'New', art: { from: '#c9d8ff', to: '#eef2ff', ink: '#2f3d80', motif: 'window' }
  },

  /* ===== OPTIONAL SUBJECTS ===== */
  {
    track: 'optional', subject: 'Social Sciences', title: 'Sociology Optional — Paper I & II',
    instructor: 'Dr. Pallavi Deshmukh', price: 3499, oldPrice: 4999,
    rating: 4.9, reviews: 3120, hours: 58, lessons: 148, level: 'Full optional',
    badge: 'Best Seller', art: { from: '#d8f0e4', to: '#f1fbf6', ink: '#1f5c45', motif: 'nodes' }
  },
  {
    track: 'optional', subject: 'Social Sciences', title: 'PSIR — Political Science & IR',
    instructor: 'Prof. Aditya Varma', price: 3699, oldPrice: 5299,
    rating: 4.8, reviews: 2860, hours: 62, lessons: 156, level: 'Full optional',
    badge: 'Trending', art: { from: '#c9d8ff', to: '#eef2ff', ink: '#2f3d80', motif: 'window' }
  },
  {
    track: 'optional', subject: 'Humanities', title: 'Anthropology Optional',
    instructor: 'Dr. Rekha Baruah', price: 3299, oldPrice: 4699,
    rating: 4.8, reviews: 2240, hours: 54, lessons: 138, level: 'Full optional',
    badge: 'Popular', art: { from: '#fdeec2', to: '#fffaea', ink: '#7a5a12', motif: 'spark' }
  },
  {
    track: 'optional', subject: 'Humanities', title: 'History Optional',
    instructor: 'Prof. Sameer Chaudhary', price: 3399, oldPrice: 4899,
    rating: 4.7, reviews: 1780, hours: 60, lessons: 152, level: 'Full optional',
    badge: '', art: { from: '#ffe0c7', to: '#fff6ee', ink: '#8a4a1d', motif: 'letter' }
  },
  {
    track: 'optional', subject: 'Science', title: 'Geography Optional',
    instructor: 'Dr. Vinita Sharma', price: 3299, oldPrice: 4799,
    rating: 4.8, reviews: 2560, hours: 56, lessons: 144, level: 'Full optional',
    badge: 'New', art: { from: '#cfe9f5', to: '#eef8fd', ink: '#1d5570', motif: 'layers' }
  },
  {
    track: 'optional', subject: 'Social Sciences', title: 'Public Administration Optional',
    instructor: 'Rohit Kalra', price: 2999, oldPrice: 4299,
    rating: 4.6, reviews: 1420, hours: 48, lessons: 126, level: 'Full optional',
    badge: '', art: { from: '#d5dbe6', to: '#f2f4f8', ink: '#33405a', motif: 'grid' }
  },
  {
    track: 'optional', subject: 'Humanities', title: 'Philosophy Optional',
    instructor: 'Dr. Farhan Siddiqui', price: 2799, oldPrice: 3999,
    rating: 4.7, reviews: 1180, hours: 44, lessons: 118, level: 'Full optional',
    badge: '', art: { from: '#e6ddff', to: '#f6f2ff', ink: '#4a3183', motif: 'spark' }
  },
  {
    track: 'optional', subject: 'Science', title: 'Mathematics Optional',
    instructor: 'Prof. Girish Pillai', price: 3599, oldPrice: 5199,
    rating: 4.9, reviews: 960, hours: 66, lessons: 168, level: 'Full optional',
    badge: 'Featured', art: { from: '#ffd9df', to: '#fff2f4', ink: '#8c2f45', motif: 'chart' }
  }
];
