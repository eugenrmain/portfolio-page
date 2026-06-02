const experience = [
  {
    role: "Mathematics Tutor",
    org: "Studybuddy AB",
    when: "2023 - Present",
    where: "Stockholm, Sweden",
    desc: "Teaching and guiding high school students in mathematics across levels. Adapting pedagogy to individual needs and explaining complex concepts clearly.",
  },
  {
    role: "Market & Financial Analyst",
    org: "Molinos DD",
    when: "July 2022",
    where: "Zamora, Spain",
    desc: "Analyzed market trends, competitors, and three years of financial data for a Spanish food company to improve sales and reduce expenses.",
  },
  {
    role: "Software Development & Design Intern",
    org: "Scania AB",
    when: "April 2019",
    where: "Södertälje, Sweden",
    desc: "Practical insight into the design and programming of online features and websites at Scania. Conducted a market analysis of competitors' digital presence.",
  },
];

const education = [
  {
    school: "KTH Royal Institute of Technology",
    program: "M.Sc. Computer Science and Engineering (300 ECTS)",
    when: "Aug 2024 - 2029",
    where: "Stockholm, Sweden",
    detail:
      "Coursework: Computer Organization & Components, Database Technology, Algorithms & Data Structures, Logic for Computer Scientists, Software Engineering in Project Form, Programming Paradigms.",
  },
  {
    school: "Anna Whitlock High School",
    program: "High School Diploma - Natural Sciences",
    when: "Aug 2021 - Jun 2024",
    where: "Stockholm, Sweden",
    detail: "Graduated with excellent results.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-5 sm:px-8 py-32 bg-surface/40">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          04 — Experience & Education
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="reveal font-display font-semibold text-3xl tracking-tight sm:text-4xl">Experience</h3>
            <ol className="mt-8 space-y-8 border-l border-border pl-6">
              {experience.map((e, i) => (
                <li key={e.role + e.org} className="reveal-up relative" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]" />
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {e.when} · {e.where}
                  </div>
                  <h4 className="mt-1 font-display text-xl font-semibold">
                    {e.role} <span className="text-primary">@ {e.org}</span>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="reveal font-display font-semibold text-3xl tracking-tight sm:text-4xl">Education</h3>
            <ol className="mt-8 space-y-8 border-l border-border pl-6">
              {education.map((e, i) => (
                <li key={e.school} className="reveal-up relative" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]" />
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {e.when} · {e.where}
                  </div>
                  <h4 className="mt-1 font-display text-xl font-semibold">{e.school}</h4>
                  <p className="mt-1 text-sm text-primary">{e.program}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
