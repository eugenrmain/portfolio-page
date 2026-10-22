export const profile = {
  name: "Eugen Ranow",
  email: "eugen.ranow2005@gmail.com",
  phone: "+46 72 152 58 58",
  phoneHref: "tel:+46721525858",
  github: "https://github.com/eugenrmain",
  linkedin: "https://www.linkedin.com/in/eugen-ranow-a093a6324",
};

export function mediaPath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}

export const coursework = [
  {
    name: "Computer science",
    courses: [
      "Algorithms",
      "Data Structures & Complexity",
      "Operating Systems",
      "Database Technology",
      "Computer Organization",
      "Programming Paradigms",
      "Logic for CS",
    ],
  },
  {
    name: "Mathematics for ML",
    courses: [
      "Linear Algebra",
      "Probability & Statistics for ML",
      "Multivariable Calculus",
      "Numerical Methods",
      "Discrete Mathematics",
    ],
  },
];

export const projects = [
  {
    id: "unity",
    title: "Unity 3D games",
    category: "Game development",
    year: "2023–present",
    role: "Commercial indie 3D game · Steam launch 2027",
    stack: ["C#", "Unity", "Netcode for GameObjects"],
    description:
      "A commercial 3D multiplayer game targeting a Steam launch in 2027. I develop movement mechanics, physics interactions, animation, and multiplayer networking with Unity Netcode for GameObjects.",
    detail:
      "A space to experiment with how games feel and how players interact. The work spans both gameplay code and the systems that keep a multiplayer session in sync.",
  },
  {
    id: "apex",
    title: "Apex Desktop — Windows utility",
    category: "Native Windows software",
    year: "2026–present",
    role: "Native systems & telemetry",
    stack: ["C#", ".NET", "WinUI 3", "Win32 APIs"],
    description:
      "An open-source Windows app for system tools, local media compression, and live hardware monitoring. It idles in the background at under 0.1% CPU.",
    detail:
      "A WinUI 3 frontend connects to native Windows services through P/Invoke and Win32 APIs, alongside asynchronous media compression and hardware monitoring.",
  },
  {
    id: "fitness",
    title: "Collaborative fitness app",
    category: "Software development",
    year: "2024",
    role: "API and database lead",
    stack: ["Python", "OpenAI API", "SQL"],
    description:
      "A team-built fitness application. I integrated OpenAI models for personalized workout recommendations and implemented the SQL database layer for user activity records.",
    detail:
      "My part connected the application to external services and stored its data. The project gave me experience working across API boundaries and coordinating implementation with a team.",
  },
  {
    id: "opensource",
    title: "Open source tools & bots",
    category: "Open source",
    year: "2024–present",
    role: "Contributor",
    stack: ["Python", "Go", "Git"],
    description:
      "Contributions, bug fixes, and personal tools built from open source projects, including a Google Maps web scraper and a crypto trading bot.",
    detail:
      "I use GitHub to explore existing code, report issues, and contribute changes. These projects are a way to learn unfamiliar systems by making something useful with them.",
  },
] as const;

export const experience = [
  {
    role: "Mathematics & STEM tutor",
    company: "Studybuddy AB",
    date: "2023–present",
    location: "Stockholm",
    description:
      "Tutoring secondary students in mathematics and science, using structured learning plans to explain complex concepts and develop problem-solving skills.",
  },
  {
    role: "Market & financial analyst intern",
    company: "Molinos DD",
    date: "July 2022",
    location: "Zamora, Spain",
    description:
      "Analyzed three years of financial data and market trends to support cost reduction and operational planning at a Spanish food company.",
  },
  {
    role: "Software development & design intern",
    company: "Scania AB",
    date: "April 2019",
    location: "Södertälje",
    description:
      "Contributed to front-end development workflows and analyzed competing digital platforms.",
  },
];

export const skills = [
  {
    name: "AI & data",
    tools: "Python, LLMs, OpenAI API, SQLite",
    context:
      "Financial document indexing, tiered LLM integration, context filtering, and relational data storage.",
  },
  {
    name: "Games & systems",
    tools: "C#, Unity, C, Go, .NET, WinUI 3",
    context:
      "Native Windows utilities, asynchronous processing, game physics, and multiplayer networking.",
  },
  {
    name: "Software fundamentals",
    tools: "Java, SQL, Git, Docker, Linux",
    context:
      "Algorithms, data structures, database architecture, REST APIs, and collaborative development.",
  },
];
