import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/portfolio/navigation";
import { Reveal, HoverLink, ScrollFade } from "@/components/portfolio/motion";
import { CopyEmail } from "@/components/portfolio/copy-email";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { HeroMonitor } from "@/components/portfolio/hero-monitor";
import { Spotlight } from "@/components/portfolio/space-field";
import { Button } from "@/components/ui/button";
import { profile, experience, skills, coursework, mediaPath } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="hero site-container" id="home" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="hero-eyebrow">Computer Science & Engineering / KTH</p>
            <div className="hero-title">
              <h1 id="hero-heading">Eugen Ranow</h1>
              <p className="hero-focus">AI, software & games.</p>
            </div>
            <div className="hero-bottom">
              <div>
                <p className="hero-intro">
                  Third-year Computer Science and Engineering student at KTH. I build AI tools,
                  software, and games.
                </p>
                <div className="hero-actions">
                  <Button asChild>
                    <a href="#work">
                      Explore my work <ArrowDownIcon weight="light" />
                    </a>
                  </Button>
                  <HoverLink href={profile.github} external className="text-link">
                    GitHub <ArrowUpRightIcon weight="light" />
                  </HoverLink>
                </div>
              </div>
            </div>
          </div>
          <HeroMonitor />
        </section>
        <section id="work" className="work-section site-container" aria-labelledby="work-heading">
          <Reveal className="section-intro">
            <h2 id="work-heading">Selected work</h2>
            <a className="work-github" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRightIcon weight="light" />
            </a>
          </Reveal>
          <ProjectGallery />
        </section>
        <section
          className="skills-section site-container"
          id="skills"
          aria-labelledby="skills-heading"
        >
          <Reveal className="lower-section-heading">
            <span className="panel-kicker">01 / Toolkit</span>
            <h2 id="skills-heading">What I work with</h2>
          </Reveal>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <Reveal key={skill.name} delay={index * 0.07}>
                <Spotlight className="skill-panel glass-panel">
                  <span className="panel-index">0{index + 1}</span>
                  <span className="panel-kicker">Capabilities</span>
                  <h3>{skill.name}</h3>
                  <ul className="technology-list" aria-label={`${skill.name} skills`}>
                    {skill.tools.split(", ").map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                  <p>{skill.context}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>
        <section
          className="background-section site-container"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <Reveal className="lower-section-heading">
            <span className="panel-kicker">02 / Trajectory</span>
            <h2 id="experience-heading">Background</h2>
          </Reveal>
          <div className="background-grid">
            <Reveal>
              <Spotlight className="timeline-panel glass-panel">
                <div className="panel-heading">
                  <h3>Experience</h3>
                  <span className="panel-kicker">Field experience</span>
                </div>
                <ol className="career-timeline">
                  {experience.map((item) => (
                    <li key={item.company} className="timeline-item" tabIndex={0}>
                      <div className="experience-meta">
                        <span>{item.company}</span>
                        <span>{item.date}</span>
                      </div>
                      <h4>{item.role}</h4>
                      <p>{item.description}</p>
                      <span className="location">{item.location}</span>
                    </li>
                  ))}
                </ol>
              </Spotlight>
            </Reveal>
            <Reveal delay={0.08}>
              <Spotlight className="timeline-panel glass-panel">
                <div className="panel-heading">
                  <h3>Education</h3>
                  <span className="panel-kicker">Academic path</span>
                </div>
                <ol className="career-timeline">
                  <li className="timeline-item" tabIndex={0}>
                    <div className="experience-meta">
                      <span>2024–2029</span>
                      <span>Stockholm / 300 ECTS</span>
                    </div>
                    <h4>KTH Royal Institute of Technology</h4>
                    <p>M.Sc. Computer Science and Engineering</p>
                    <p className="education-specialization">
                      Intended Specialization: Machine Learning
                    </p>
                    <div className="coursework">
                      {coursework.map((group) => (
                        <div className="coursework-group" key={group.name}>
                          <h5>{group.name}</h5>
                          <ul className="technology-list" aria-label={`${group.name} coursework`}>
                            {group.courses.map((course) => (
                              <li key={course}>{course}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                  <li className="timeline-item" tabIndex={0}>
                    <div className="experience-meta">
                      <span>2021–2024</span>
                    </div>
                    <h4>Anna Whitlock High School</h4>
                    <p>Natural Sciences</p>
                  </li>
                </ol>
              </Spotlight>
            </Reveal>
          </div>
        </section>
        <section className="mission-section site-container" aria-label="About and contact">
          <Reveal>
            <Spotlight className="mission-control glass-panel">
              <div className="mission-header">
                <span>
                  <i className="live-light" /> Mission control
                </span>
                <span>Stockholm, Sweden</span>
              </div>
              <div className="mission-grid">
                <div id="about" className="mission-about">
                  <span className="panel-kicker">The person behind the projects</span>
                  <h2 id="about-heading">A bit about me.</h2>
                  <p>
                    I’m Eugen, a Computer Science and Engineering student at KTH, with an intended
                    specialization in Machine Learning. I build AI pipelines, native Windows tools,
                    and a commercial multiplayer game targeting Steam in 2027.
                  </p>
                  <p>
                    Based in Stockholm, I’m looking for internship and part-time opportunities in
                    software development. Alongside my projects, I tutor mathematics and science,
                    and contribute fixes and tools to open source.
                  </p>
                  <p className="languages-readout">
                    LANGUAGES // SWEDISH (NATIVE) · ENGLISH (FLUENT) · SPANISH (BASIC)
                  </p>
                </div>
                <div id="contact" className="mission-contact">
                  <span className="panel-kicker">Open a channel</span>
                  <h2 id="contact-heading">Let’s talk.</h2>
                  <p>
                    Have a project in mind or an opportunity to share? I’d like to hear about it.
                  </p>
                  <div className="email-actions">
                    <a href={"mailto:" + profile.email}>{profile.email}</a>
                    <CopyEmail email={profile.email} />
                  </div>
                  <a className="mission-phone" href={profile.phoneHref}>
                    {profile.phone}
                  </a>
                  <div className="mission-links">
                    <a
                      className="glass-action"
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub <ArrowUpRightIcon />
                    </a>
                    <a
                      className="glass-action"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn <ArrowUpRightIcon />
                    </a>
                    <a
                      className="glass-action"
                      href={mediaPath("/Eugen_Ranow_CV.pdf")}
                      download="Eugen_Ranow_CV.pdf"
                    >
                      Download CV <ArrowDownIcon />
                    </a>
                  </div>
                </div>
              </div>
              <footer className="mission-footer">
                <a href="#home">Eugen Ranow © {new Date().getFullYear()}</a>
                <a href="#work">Back to selected work ↑</a>
              </footer>
            </Spotlight>
          </Reveal>
        </section>
      </main>
      <ScrollFade />
    </>
  );
}
