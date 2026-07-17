export const profile = {
  name: "UJJWAL KUMAR",
  title: "FRONTEND ENGINEER // BENGALURU",
  location: "Bengaluru, India",
  email: "ujjwal.kumar579.work@gmail.com",
  phone: "+91-9155227703",
  linkedin: "https://www.linkedin.com/in/ujjwal-k-991135129/",
  github: "https://github.com/ulkumar579",
  instagram: "https://www.instagram.com/stick_tocode/",
  youtube: "https://www.youtube.com/@sticktocode",
  summary:
    "Frontend Engineer with 4 years of professional experience building scalable enterprise web applications using React.js, Next.js, JavaScript, and TypeScript.",
};

export const techStack = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
];

export const stats = [
  { value: 4, suffix: "+", label: "YEARS\nEXPERIENCE" },
  { value: 10, suffix: "+", label: "PROJECTS\nDELIVERED" },
  { value: 20, suffix: "+", label: "TECHNOLOGIES\nMASTERED" },
  { value: 20, suffix: "%", label: "AVG PERF\nGAINS" },
];

export const experience = [
  {
    id: "netlink",
    role: "Software Engineer",
    company: "Netlink Software Pvt. Ltd.",
    period: "Nov 2022 – Jan 2026",
    bullets: [
      "Developed enterprise-grade React.js applications using JavaScript, TypeScript, HTML5 and CSS3.",
      "Built AppHub, a schema-driven no-code platform enabling drag-and-drop application development.",
      "Designed reusable UI components, improving development efficiency and UI consistency.",
      "Optimized frontend performance via lazy loading, memoization and code splitting (~20% faster).",
      "Integrated REST APIs, WebSockets, and Node-RED workflows for real-time enterprise apps.",
      "Shipped through Docker + Azure DevOps CI/CD pipelines in Agile/Scrum environments.",
    ],
  },
  {
    id: "Newton",
    role: "Trainee",
    company: "Newton School",
    period: "jan 2022 – Nov 2022",
    bullets: [
      "Acquired hands-on experience in React.js, JavaScript (ES6+), Node.js, HTML5, CSS3, and Bootstrap, with a strong focus on frontend development and UI implementation.",
      "Integrated REST APIs and improved cross-browser compatibility.",
      "Collaborated with senior engineers to deliver production-ready features.",
    ],
  },
  {
    id: "ComputerED",
    role: "Frontend Web Developer",
    company: "ComputerED Pvt. Ltd.",
    period: "nov 2021 – jan 2022",
    bullets: [],
  },
  {
    id: "indev",
    role: "Frontend Developer Intern",
    company: "Indev Consultancy Pvt. Ltd.",
    period: "May 2021 – Nov 2021",
    bullets: [
      "Developed responsive React.js interfaces and reusable UI components.",
      "Integrated REST APIs and improved cross-browser compatibility.",
      "Collaborated with senior engineers to deliver production-ready features.",
    ],
  },
];

export const projects = [
  {
    id: "ai-agent",
    code: "PRJ_001",
    name: "Real-Time AI Agent Assist",
    tagline: "Live speech-to-text, sentiment & AI summaries",
    description:
      "An AI-powered platform providing live speech-to-text, sentiment analysis, and AI-generated conversation summaries with real-time dashboards.",
    bullets: [
      "WebSocket-based audio streaming with Deepgram Nova-3 integration.",
      "Real-time dashboards with React.js and Ant Design.",
      "MediaRecorder API + Audio Worklet pipeline for low-latency capture.",
    ],
    tech: ["React.js", "WebSockets", "Deepgram", "Ant Design", "Audio Worklet"],
  },
  {
    id: "apphub",
    code: "PRJ_002",
    name: "AppHub — No-Code Platform",
    tagline: "Schema-driven drag-and-drop enterprise builder",
    description:
      "Drag-and-drop enterprise application builder using a schema-driven architecture with automated Node-RED workflows.",
    bullets: [
      "Schema-driven runtime rendering reusable React components.",
      "Node-RED workflow automation for backend orchestration.",
      "Reduced application delivery time by ~25%.",
    ],
    tech: ["React.js", "TypeScript", "Redux", "PostgreSQL", "Node-RED"],
  },
  {
    id: "pokemon",
    code: "PRJ_003",
    name: "Pokemon Explorer",
    tagline: "Responsive REST-powered gallery",
    description:
      "Responsive React application consuming public REST APIs with optimized loading and caching.",
    bullets: [
      "Optimized API loading performance by ~20%.",
      "Responsive layout with lazy-loaded assets.",
    ],
    tech: ["React.js", "REST", "CSS3"],
  },
];

export const skills = {
  Frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 88 },
    { name: "JavaScript", level: 95 },
    { name: "Redux", level: 85 },
    { name: "Tailwind", level: 92 },
    { name: "SCSS", level: 88 },
    { name: "Ant Design", level: 90 },
  ],
  Backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 82 },
    { name: "REST", level: 92 },
    { name: "GraphQL", level: 72 },
    { name: "WebSockets", level: 88 },
    { name: "JWT", level: 80 },
    { name: "OAuth 2.0", level: 75 },
  ],
  Databases: [
    { name: "PostgreSQL", level: 82 },
    { name: "MongoDB", level: 78 },
    { name: "SQL", level: 85 },
  ],
  "Tools & DevOps": [
    { name: "Git", level: 92 },
    { name: "Docker", level: 80 },
    { name: "Azure DevOps", level: 82 },
    { name: "CI/CD", level: 80 },
    { name: "Webpack", level: 78 },
    { name: "Vite", level: 88 },
  ],
  Concepts: [
    { name: "Lazy Loading", level: 92 },
    { name: "Memoization", level: 90 },
    { name: "Code Splitting", level: 88 },
    { name: "Agile", level: 88 },
    { name: "Scrum", level: 85 },
  ],
};

export const certifications = [
  {
    name: "Programming with JavaScript",
    issuer: "Meta",
    year: "2023",
    color: "#1877F2",
    link: "https://www.coursera.org/learn/programming-with-javascript",
  },
  {
    name: "HTML, CSS & JS for Web Developers",
    issuer: "Johns Hopkins University",
    year: "2022",
    color: "#002D72",
    link: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
  },
  {
    name: "Bootstrap 4 Frameworks",
    issuer: "HKUST",
    year: "2022",
    color: "#563D7C",
    link: "https://www.coursera.org/learn/bootstrap-4",
  },
  {
    name: "Introduction to Software Engineering",
    issuer: "IBM",
    year: "2023",
    color: "#0F62FE",
    link: "https://www.coursera.org/learn/introduction-to-software-engineering",
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM",
    year: "2023",
    color: "#0530AD",
    link: "https://www.coursera.org/learn/python-for-applied-data-science-ai",
  },
];
