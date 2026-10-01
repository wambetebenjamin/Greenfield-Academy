export const site = {
  name: 'Greenfield Academy',
  shortName: 'Greenfield',
  motto: 'Knowledge, Character, Service',
  tagline: 'Nurturing Tomorrow\u2019s Leaders Today',
  description:
    'Greenfield Academy is a private primary and secondary school in Nairobi, Kenya offering CBC and IGCSE pathways from Grade 1 to Grade 12, with a 100% KCSE pass rate and 30 years of academic excellence.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://greenfieldacademy.co.ke',
  phoneDisplay: '+254 112 272 061',
  phone: '+254112272061',
  whatsapp: '254112272061',
  whatsappMessage:
    'Hello! I want to enquire about admissions at Greenfield Academy',
  email: 'info@greenfieldacademy.co.ke',
  admissionsEmail: 'admissions@greenfieldacademy.co.ke',
  address: {
    street: 'Greenfield Lane, Off Ngong Road',
    locality: 'Karen, Nairobi',
    region: 'Nairobi County',
    postalCode: '00502',
    country: 'Kenya',
  },
  openingHours: 'Mon to Fri, 7:00am to 5:00pm | Sat, 8:00am to 1:00pm',
  founded: 1995,
  socials: [
    { label: 'Facebook', icon: 'fa-facebook', href: 'https://facebook.com/' },
    { label: 'X', icon: 'fa-twitter', href: 'https://x.com/' },
    { label: 'Instagram', icon: 'fa-instagram', href: 'https://instagram.com/' },
    { label: 'YouTube', icon: 'fa-youtube-play', href: 'https://youtube.com/' },
    { label: 'LinkedIn', icon: 'fa-linkedin', href: 'https://linkedin.com/' },
  ],
  mapEmbed:
    'https://maps.google.com/maps?q=Karen%2C%20Nairobi%2C%20Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed',
};

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'News & Events', href: '#news' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Staff Portal', href: '/staff/login' },
  { label: 'Contact', href: '#contact' },
];

export const heroSlides = [
  {
    id: 'slide-1',
    image: '/assets/images/main-slider-01.jpg',
    eyebrow: 'Welcome to Greenfield Academy, Nairobi',
    title: 'Nurturing Tomorrow\u2019s Leaders Today',
    text: 'A warm, disciplined and future ready learning home for boys and girls from Grade 1 to Grade 12, set on a leafy ten acre campus in Karen, Nairobi.',
    cta: { label: 'Explore School', href: '#about' },
    secondary: { label: 'Book a Tour', href: '#contact' },
  },
  {
    id: 'slide-2',
    image: '/assets/images/main-slider-02.jpg',
    eyebrow: 'Class of 2024 Results',
    title: '100% KCSE Pass Rate 2024',
    text: 'Every single candidate qualified for university placement, with 41 students scoring A and A minus in the 2024 national examinations.',
    cta: { label: 'View Results', href: '#stats' },
    secondary: { label: 'Meet Our Teachers', href: '#staff' },
  },
  {
    id: 'slide-3',
    image: '/assets/images/main-slider-03.jpg',
    eyebrow: 'Limited Places Remaining',
    title: 'Admissions Open for 2025',
    text: 'Applications are now open for Grade 1 to Grade 12, day and boarding. Apply online in under five minutes and we will call you back the same day.',
    cta: { label: 'Apply Now', href: '#admissions' },
    secondary: { label: 'Fee Structure', href: '#admissions' },
  },
];

export const stats = [
  { value: 1200, suffix: '+', label: 'Students', icon: 'fa-users' },
  { value: 85, suffix: '', label: 'Teachers', icon: 'fa-graduation-cap' },
  { value: 30, suffix: '', label: 'Years of Excellence', icon: 'fa-trophy' },
  { value: 98, suffix: '%', label: 'University Entry Rate', icon: 'fa-university' },
];

export const coreValues = [
  {
    icon: 'fa-lightbulb-o',
    title: 'Curiosity',
    text: 'We teach children to ask better questions, investigate boldly and love learning for its own sake.',
  },
  {
    icon: 'fa-balance-scale',
    title: 'Integrity',
    text: 'Honesty, fairness and personal responsibility sit at the centre of every Greenfield classroom.',
  },
  {
    icon: 'fa-heart',
    title: 'Compassion',
    text: 'Our learners serve their community, respect difference and look out for one another daily.',
  },
  {
    icon: 'fa-flag-checkered',
    title: 'Excellence',
    text: 'We set a high bar in academics, sport and the arts, then give every child the support to clear it.',
  },
];

export type AcademicLevel = {
  id: string;
  label: string;
  grades: string;
  headline: string;
  overview: string;
  image: string;
  curriculum: string[];
  subjects: string[];
  pathways: string[];
  activities: string[];
};

export const academics: AcademicLevel[] = [
  {
    id: 'primary',
    label: 'Primary School',
    grades: 'Grade 1 to Grade 8',
    headline: 'Strong foundations, happy learners',
    overview:
      'Our primary school follows the Competency Based Curriculum with a literacy and numeracy core, taught in small classes of no more than 24 learners. Children learn through projects, play and structured practice, supported by a reading programme that gets every child fluent before Grade 4.',
    image: '/assets/images/choose-us-image-01.png',
    curriculum: [
      'Competency Based Curriculum, fully aligned to KICD',
      'Cambridge Primary available as a parallel pathway',
      'Daily guided reading and mental mathematics',
      'Termly project based learning showcase for parents',
    ],
    subjects: [
      'English & Literature',
      'Kiswahili',
      'Mathematics',
      'Integrated Science',
      'Social Studies',
      'Creative Arts',
      'Religious Education',
      'Physical Education',
      'Digital Literacy',
    ],
    pathways: ['CBC (KICD)', 'Cambridge Primary'],
    activities: [
      'Swimming and athletics',
      'Music, recorder and choir',
      'Scouts and Brownies',
      'Chess and Scrabble club',
      'Young farmers and environment club',
    ],
  },
  {
    id: 'junior',
    label: 'Junior Secondary',
    grades: 'Grade 9 to Grade 10',
    headline: 'Exploring strengths, choosing pathways',
    overview:
      'Junior secondary is where learners sample the full academic menu before specialising. Subject specialists take every lesson, learners get a personal academic mentor, and termly career labs help each family choose the right senior school pathway with confidence.',
    image: '/assets/images/choose-us-image-02.png',
    curriculum: [
      'CBC junior secondary learning areas, nine core subjects',
      'IGCSE foundation stream for the Cambridge pathway',
      'Guided research skills and digital citizenship',
      'One to one academic mentoring every fortnight',
    ],
    subjects: [
      'English',
      'Kiswahili',
      'Mathematics',
      'Integrated Science',
      'Pre-Technical Studies',
      'Social Studies',
      'Business Studies',
      'Agriculture',
      'Computer Science',
      'French or German',
    ],
    pathways: ['CBC Junior Secondary', 'IGCSE Foundation'],
    activities: [
      'Debate and public speaking',
      'Robotics and coding club',
      'Rugby, basketball and netball',
      'Drama and film club',
      'Community service Saturdays',
    ],
  },
  {
    id: 'senior',
    label: 'Senior Secondary',
    grades: 'Grade 11 to Grade 12',
    headline: 'University ready, world ready',
    overview:
      'Senior school learners specialise in one of three pathways, with KCSE and IGCSE or A Level options running side by side. A dedicated university placement office supports applications to Kenyan, South African, UK and North American institutions.',
    image: '/assets/images/choose-us-image-03.png',
    curriculum: [
      'STEM, Social Sciences and Arts & Sports Science pathways',
      'KCSE preparation with weekly timed practice',
      'IGCSE and AS Level options for international applicants',
      'University and career placement office, Grade 11 onwards',
    ],
    subjects: [
      'Mathematics (Core & Advanced)',
      'Physics',
      'Chemistry',
      'Biology',
      'Geography',
      'History & Government',
      'Business Studies',
      'Computer Studies',
      'Literature in English',
      'Fasihi ya Kiswahili',
    ],
    pathways: ['KCSE', 'IGCSE', 'AS & A Level'],
    activities: [
      'Model United Nations',
      'Entrepreneurship incubator',
      'Science and engineering fair',
      'Athletics, swimming and rugby squads',
      'Peer mentorship and prefect leadership',
    ],
  },
];

export const departments = [
  {
    icon: 'fa-flask',
    title: 'Sciences',
    hod: 'Mr. Daniel Otieno',
    text: 'Three fully equipped laboratories, a science fair every August and a steady record of national STEM awards.',
    accent: 'forest',
  },
  {
    icon: 'fa-globe',
    title: 'Humanities',
    hod: 'Mrs. Lucy Wairimu',
    text: 'History, Geography, CRE and Business Studies taught through fieldwork, debate and real Kenyan case studies.',
    accent: 'sky',
  },
  {
    icon: 'fa-language',
    title: 'Languages',
    hod: 'Madame Agnes Mutiso',
    text: 'English, Kiswahili, French and German, with an annual language week and exchange partnerships abroad.',
    accent: 'gold',
  },
  {
    icon: 'fa-music',
    title: 'Arts & Music',
    hod: 'Mr. Brian Kiprotich',
    text: 'Choir, brass band, traditional dance and a well lit art studio that feeds our termly exhibition.',
    accent: 'sky',
  },
  {
    icon: 'fa-laptop',
    title: 'Technology & ICT',
    hod: 'Ms. Faith Njeri',
    text: 'Two computer labs, a robotics bench, coding from Grade 1 and a girls in tech mentorship programme.',
    accent: 'forest',
  },
  {
    icon: 'fa-futbol-o',
    title: 'Sports',
    hod: 'Coach Samuel Mwangi',
    text: 'Rugby, football, netball, basketball, swimming and athletics on a full size pitch and 25 metre pool.',
    accent: 'gold',
  },
];

export const admissionRequirements = [
  'Completed online application form',
  'Copy of the learner birth certificate or passport',
  'Two recent passport size photographs',
  'Report forms for the last two academic terms',
  'Leaving certificate from the previous school, where applicable',
  'Copy of parent or guardian national ID or passport',
  'Up to date immunisation record for Grade 1 to Grade 3 entry',
];

export const admissionSteps = [
  {
    title: 'Submit your application',
    text: 'Complete the online form below. It takes about five minutes and you receive an instant confirmation email.',
  },
  {
    title: 'Campus visit and interview',
    text: 'We invite the family for a guided campus tour and a relaxed conversation with the Head of Section.',
  },
  {
    title: 'Placement assessment',
    text: 'Learners sit a short assessment in English, Mathematics and reasoning so we place them in the right class.',
  },
  {
    title: 'Offer of admission',
    text: 'Successful families receive an offer letter, fee structure and joining instructions within five working days.',
  },
  {
    title: 'Enrolment and orientation',
    text: 'Pay the admission fee, collect uniform and join our orientation morning before the term begins.',
  },
];

export const gradeOptions = [
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

export const enquiryTypes = [
  'Admissions',
  'Fees and Payments',
  'Academics',
  'Transport',
  'Boarding',
  'Careers at Greenfield',
  'Other',
];

export const galleryCategories = [
  { id: 'sports', label: 'Sports' },
  { id: 'academics', label: 'Academics' },
  { id: 'arts', label: 'Arts' },
  { id: 'events', label: 'Events' },
];

export type GalleryItem = {
  src: string;
  title: string;
  caption: string;
  category: 'sports' | 'academics' | 'arts' | 'events';
  span: 'tall' | 'normal' | 'wide';
};

export const galleryItems: GalleryItem[] = [
  {
    src: '/assets/images/courses-04.jpg',
    title: 'Cross Country at Dawn',
    caption: 'Senior squad training on the Ngong hills route',
    category: 'sports',
    span: 'tall',
  },
  {
    src: '/assets/images/video-thumb-02.jpg',
    title: 'Inter House Finals',
    caption: 'Supporters at the Term Two inter house finals',
    category: 'sports',
    span: 'wide',
  },
  {
    src: '/assets/images/main-thumb.png',
    title: 'Athletics Prize Giving',
    caption: 'Celebrating our county level athletics champions',
    category: 'sports',
    span: 'normal',
  },
  {
    src: '/assets/images/courses-01.jpg',
    title: 'Chemistry Practical',
    caption: 'Grade 11 titration practical in Laboratory Two',
    category: 'academics',
    span: 'normal',
  },
  {
    src: '/assets/images/courses-03.jpg',
    title: 'Group Research',
    caption: 'Junior secondary learners on a CBC research project',
    category: 'academics',
    span: 'tall',
  },
  {
    src: '/assets/images/courses-05.jpg',
    title: 'Innovation Bench',
    caption: 'Robotics club prototyping a solar powered lamp',
    category: 'academics',
    span: 'normal',
  },
  {
    src: '/assets/images/courses-02.jpg',
    title: 'Design Studio',
    caption: 'Portfolio work from the senior art and design class',
    category: 'arts',
    span: 'wide',
  },
  {
    src: '/assets/images/choose-us-image-03.png',
    title: 'Drama Rehearsal',
    caption: 'Rehearsing for the Kenya Schools Drama Festival',
    category: 'arts',
    span: 'normal',
  },
  {
    src: '/assets/images/video-bg.jpg',
    title: 'Library Reading Hour',
    caption: 'Quiet hour in the Greenfield resource centre',
    category: 'arts',
    span: 'tall',
  },
  {
    src: '/assets/images/video-thumb-01.jpg',
    title: 'Graduation Day',
    caption: 'Class of 2024 celebrating on the main lawn',
    category: 'events',
    span: 'wide',
  },
  {
    src: '/assets/images/choose-us-image-01.png',
    title: 'Parents Open Day',
    caption: 'Families touring classrooms during open day',
    category: 'events',
    span: 'normal',
  },
  {
    src: '/assets/images/choose-us-image-02.png',
    title: 'Career Fair',
    caption: 'Alumni mentors at the annual career fair',
    category: 'events',
    span: 'normal',
  },
];

export const staffDirectory = [
  { name: 'Dr. Margaret Wanjiku', role: 'Principal', subject: 'School Leadership', email: 'principal@greenfieldacademy.co.ke', initials: 'MW', accent: 'forest' },
  { name: 'Mr. Peter Kamau', role: 'Deputy Principal', subject: 'Mathematics', email: 'p.kamau@greenfieldacademy.co.ke', initials: 'PK', accent: 'sky' },
  { name: 'Mrs. Lucy Wairimu', role: 'Head of Humanities', subject: 'History & Government', email: 'l.wairimu@greenfieldacademy.co.ke', initials: 'LW', accent: 'gold' },
  { name: 'Mr. Daniel Otieno', role: 'Head of Sciences', subject: 'Chemistry', email: 'd.otieno@greenfieldacademy.co.ke', initials: 'DO', accent: 'forest' },
  { name: 'Madame Agnes Mutiso', role: 'Head of Languages', subject: 'French & Kiswahili', email: 'a.mutiso@greenfieldacademy.co.ke', initials: 'AM', accent: 'sky' },
  { name: 'Ms. Faith Njeri', role: 'Head of ICT', subject: 'Computer Science', email: 'f.njeri@greenfieldacademy.co.ke', initials: 'FN', accent: 'gold' },
  { name: 'Mr. Brian Kiprotich', role: 'Head of Arts & Music', subject: 'Music & Performing Arts', email: 'b.kiprotich@greenfieldacademy.co.ke', initials: 'BK', accent: 'forest' },
  { name: 'Coach Samuel Mwangi', role: 'Director of Sport', subject: 'Physical Education', email: 's.mwangi@greenfieldacademy.co.ke', initials: 'SM', accent: 'sky' },
  { name: 'Mrs. Esther Achieng', role: 'Head of Primary', subject: 'Early Years Literacy', email: 'e.achieng@greenfieldacademy.co.ke', initials: 'EA', accent: 'gold' },
  { name: 'Mr. Joseph Barasa', role: 'Head of Junior Secondary', subject: 'Integrated Science', email: 'j.barasa@greenfieldacademy.co.ke', initials: 'JB', accent: 'forest' },
  { name: 'Ms. Caroline Chebet', role: 'School Counsellor', subject: 'Guidance & Counselling', email: 'c.chebet@greenfieldacademy.co.ke', initials: 'CC', accent: 'sky' },
  { name: 'Mr. Victor Omondi', role: 'Admissions Registrar', subject: 'Business Studies', email: 'admissions@greenfieldacademy.co.ke', initials: 'VO', accent: 'gold' },
];

export const testimonials = [
  {
    name: 'Grace Mutheu',
    role: 'Parent, Grade 6 and Grade 10',
    avatar: '/assets/images/author-04.png',
    rating: 5,
    quote:
      'Both of my children moved to Greenfield three years ago and the change was immediate. The teachers know each child personally and call me before small problems become big ones.',
  },
  {
    name: 'Brian Kiptoo',
    role: 'Alumnus, Class of 2023',
    avatar: '/assets/images/author-01.png',
    rating: 5,
    quote:
      'I arrived shy and left as head boy. The debate club and the university placement office prepared me for my engineering course at the University of Nairobi.',
  },
  {
    name: 'Dr. Sarah Njoki',
    role: 'Parent, Grade 3',
    avatar: '/assets/images/author-02.png',
    rating: 5,
    quote:
      'The reading programme is outstanding. My daughter went from struggling with sentences to finishing a chapter book every fortnight within two terms.',
  },
  {
    name: 'Mr. James Ochieng',
    role: 'Parent, Grade 12',
    avatar: '/assets/images/author-05.png',
    rating: 5,
    quote:
      'Transparent fees, clear communication on WhatsApp and real results. My son sat his KCSE confident and well prepared, and he earned an A minus.',
  },
  {
    name: 'Amina Hassan',
    role: 'Student, Grade 11',
    avatar: '/assets/images/author-03.png',
    rating: 5,
    quote:
      'The science labs and the robotics club are my favourite part of school. Our team built a water monitoring sensor that won at the county science fair.',
  },
];

export const quickLinks = [
  {
    heading: 'School',
    links: [
      { label: 'About Greenfield', href: '#about' },
      { label: 'Our Departments', href: '#departments' },
      { label: 'Staff Directory', href: '#staff' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    heading: 'Academics',
    links: [
      { label: 'Primary School', href: '#academics' },
      { label: 'Junior Secondary', href: '#academics' },
      { label: 'Senior Secondary', href: '#academics' },
      { label: 'Co-curricular Life', href: '#academics' },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'Requirements', href: '#admissions' },
      { label: 'Application Steps', href: '#admissions' },
      { label: 'Apply Online', href: '#apply' },
      { label: 'Book a Campus Tour', href: '#contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'News & Events', href: '#news' },
      { label: 'Photo Gallery', href: '#gallery' },
      { label: 'Staff Portal', href: '/staff/login' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
];
