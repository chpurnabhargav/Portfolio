import { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always scroll to top on load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    // Optionally clear hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  // Handle smooth scrolling and hash clearing for nav links
  const handleNavClick = (e, sectionId) => {
    if (sectionId === 'resume.pdf') return; // Don't intercept resume link
    
    e.preventDefault();
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Clear hash from URL immediately (so refresh goes to top)
      window.history.replaceState(null, null, window.location.pathname);
    }
  };

  const projects = [
    {
      id: "proj-001",
      title: "Fill Your Code",
      impact: "AI-powered coding platform with real-time assistance for 1000+ students",
      description: "A real-time AI coding assistant built using Node.js, Express, and React. Students can learn or ask about any code seamlessly with AI-assisted suggestions via the Gemini API. Enables seamless code collaboration and learning.",
      tech: ["Node.js", "Express", "React", "Render", "Tailwind CSS"],
      github: "https://github.com/chpurnabhargav/Fill-Your-Code",
      demo: "https://fill-your-code.onrender.com/"
    },
    {
      id: "proj-002",
      title: "Think Check",
      impact: "Adaptive learning platform with AI evaluation reducing study time by 40%",
      description: "An AI-driven adaptive learning platform that helps students and professionals sharpen their skills through dynamic MCQs, written assessments, smart roadmaps, and downloadable notes. Your personal study buddy powered by Gemini AI.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Gemini API", "Render"],
      github: "https://github.com/chpurnabhargav/ThinkCheck/",
      demo: null
    },
    {
      id: "proj-003",
      title: "Inter-Block Outpass System (IOS)",
      impact: "Automated approval workflow reducing manual processing time by 80%",
      description: "Full-stack web application for automated student outpass approvals. Implemented MySQL database with role-based access control for Students, Faculty, Admins, and VO Officers.",
      tech: ["Node.js", "Express", "React", "Render", "Tailwind CSS", "MySQL"],
      github: "https://github.com/chpurnabhargav/Inter-Block-OutPass-System",
      demo: null
    },
    {
      id: "proj-004",
      title: "Detecting Adrenocortical Carcinoma",
      impact: "Gene sequencing analysis for cancer identification using TP53 mutations",
      description: "A bioinformatics project focusing on identifying adrenocortical carcinoma using TP53 gene sequencing. Demonstrates application of programming in genomic analysis.",
      tech: ["Python", "Sequencing", "Bioinformatics"],
      github: "https://github.com/chpurnabhargav/Detecting-Adrenocortical-carcinoma",
      demo: null
    }
  ];

  const skills = {
    "Programming": ["C", "C++", "Python", "Java", "JavaScript", "Data Structures", "Algorithms"],
    "Frontend": ["React", "HTML5", "CSS3", "Tailwind CSS", "Front-End Dev"],
    "Backend": ["Node.js", "Express", "MongoDB", "REST API", "SQL", "PostgreSQL", "MySQL"],
    "AI & ML": ["OpenAI API", "Gemini API", "Grok API", "ML Frameworks", "ChatGPT", "Claude"],
    "Tools & DevOps": ["Git", "GitHub", "VS Code", "AWS", "FreeCAD", "3D Printing", "Networking", "No-Code Platforms"],
    "Other": ["Operating Systems", "IoT", "Content Editing", "Magazine Articles"]
  };

  const experience = [
    {
      title: "Full Stack Developer",
      org: "Hackathon / Personal Projects",
      period: "2024 - Present",
      highlight: "Built full-stack applications using React, Node.js, MongoDB, and Supabase. Worked on authentication, dashboards, API integration, and deployment."
    },
    {
      title: "Frontend Developer",
      org: "Portfolio & UI Projects",
      period: "2023 - Present",
      highlight: "Developed responsive UI components and modern layouts with smooth animations and clean UX."
    },
    {
      title: "Competitive Programmer",
      org: "LeetCode / CodeChef / Codeforces",
      period: "2023 - Present",
      highlight: "Solved coding problems focusing on DSA, improving speed, logic, and problem-solving approach."
    }
  ];

  const education = [
    {
      degree: "B.Tech Computer Science",
      school: "KLH University",
      year: "2023 - 2027",
      gpa: "CGPA: 9.7"
    },
    {
      degree: "Higher Secondary Education",
      school: "Sri Chaitanya Junior College",
      year: "2021 - 2023",
      gpa: "CGPA: 8.8"
    }
  ];

  const codingProfiles = [
    {
      platform: "LeetCode",
      username: "chpurnabhargav",
      url: "https://leetcode.com/chpurnabhargav",
      stats: "300+ Problems Solved"
    },
    {
      platform: "CodeChef",
      username: "purnabhargav",
      url: "https://www.codechef.com/users/purnabhargav",
      stats: "Competitive Coder"
    },
    {
      platform: "Codeforces",
      username: "bhargav7666",
      url: "https://codeforces.com/profile/bhargav7666",
      stats: "Active Competitor"
    },
    {
      platform: "HackerRank",
      username: "chpurnabhargav",
      url: "https://www.hackerrank.com/chpurnabhargav",
      stats: "Problem Solving"
    },
    {
      platform: "GitHub",
      username: "chpurnabhargav",
      url: "https://github.com/chpurnabhargav",
      stats: "20+ Repositories"
    }
  ];

  const certifications = [
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      year: "2025",
      credentialUrl: "https://www.credly.com/earner/earned/badge/939500e7-e110-4129-9482-3c8c40eb05e0"
    },
    {
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      year: "2024",
      credentialUrl: "https://www.credly.com/earner/earned/badge/fc08f388-efb0-4523-850a-17d0510fad96"
    },
    {
      title: "MongoDB Associate Developer",
      issuer: "MongoDB",
      year: "2025",
      credentialUrl: "https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/f0e64f0c-7684-4fd9-9627-b9708b03ab01-chpurna-bhargav-chowdary-50d1bf28-8096-4fe9-a7d0-9067b5585315-certificate.pdf"
    },
    {
      title: "Amazon Web Services Cloud Practitioner",
      issuer: "AWS",
      year: "2026",
      credentialUrl: "https://cp.certmetrics.com/amazon/en/credentials/status/3745241"
    },
    {
      title: "Automation Anywhere RPA (RPC)",
      issuer: "Automation Anywhere",
      year: "2025",
      credentialUrl: "https://certificates.automationanywhere.com/60888733-bbea-4aa9-a7fc-31ce475bc54b#acc.OXkEw0VF"
    }
  ];

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Purn Bhargav</div>
          <div className="nav-links">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="nav-link">Skills</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="nav-link">Projects</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="nav-link">Experience</a>
            <a href="#coding-profiles" onClick={(e) => handleNavClick(e, 'coding-profiles')} className="nav-link">Profiles</a>
            <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className="nav-link">Certifications</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">Contact</a>
            <a href="/resume.pdf" download className="nav-link nav-link-cta"> Resume</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img src="/img.jpg" alt="Bhargav CH" />
          </div>
          <div className="hero-text">
            <h1 className="hero-name">Purna Bhargav</h1>
            <p className="hero-role">Full Stack Developer & Data Scientist</p>
            <p className="hero-statement">
              Building intelligent, user-centric applications that solve real problems and scale
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={(e) => handleNavClick(e, 'projects')}>
                View My Work
              </button>
              <a href="/resume.pdf" download="Bhargav_Resume.pdf" className="btn btn-secondary">
                    Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <p className="about-text">
            I'm a second-year Computer Science student with a passion for building full-stack applications that make an impact. 
            Experienced in React, Node.js, and cloud technologies. Strong problem-solver who thrives in collaborative environments 
            and is constantly learning new technologies to stay ahead in the fast-paced tech industry.
          </p>
          <div className="quick-stats">
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Full-Stack Apps</div>
            </div>
            <div className="stat">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years Coding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-tags">
                  {items.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Selected work showcasing full-stack capabilities</p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card ${activeProjectIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveProjectIndex(index)}
                onMouseLeave={() => setActiveProjectIndex(null)}
              >
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-impact">{project.impact}</p>
                </div>

                {activeProjectIndex === index && (
                  <div className="project-expanded">
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        GitHub
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience" id="experience">
        <div className="container">
          <h2 className="section-title">Experience & Achievements</h2>
          <div className="experience-list">
            {experience.map((item, index) => (
              <div key={index} className="experience-item">
                <div className="experience-marker"></div>
                <div className="experience-content">
                  <h3 className="experience-title">{item.title}</h3>
                  <p className="experience-org">{item.org}</p>
                  <p className="experience-period">{item.period}</p>
                  <p className="experience-highlight">{item.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section className="coding-profiles" id="coding-profiles">
        <div className="container">
          <h2 className="section-title">Coding Profiles</h2>
          <p className="section-subtitle">Active on competitive coding and developer platforms</p>
          
          <div className="profiles-grid">
            {codingProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-card"
              >
                <div className="profile-content">
                  <h3 className="profile-platform">{profile.platform}</h3>
                  <p className="profile-username">{profile.username}</p>
                  <p className="profile-stats">{profile.stats}</p>
                </div>
                <div className="profile-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-list">
            {education.map((item, index) => (
              <div key={index} className="education-item">
                <div className="education-content">
                  <h3 className="education-degree">{item.degree}</h3>
                  <p className="education-school">{item.school}</p>
                  <div className="education-meta">
                    <span>{item.year}</span>
                    <span className="education-gpa">{item.gpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications" id="certifications">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Professional development and specialized training</p>
          
          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-item"
              >
                <div className="certification-header">
                  <h3 className="certification-title">{cert.title}</h3>
                  <span className="certification-badge">View</span>
                </div>
                <div className="certification-meta">
                  <span className="certification-issuer">{cert.issuer}</span>
                  <span className="certification-year">{cert.year}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Open to opportunities, collaborations, and conversations</p>
          
          <div className="contact-content">
            <a href="mailto:chpurnabhargav@gmail.com" className="contact-method">
              <span className="contact-icon">Email</span>
              <span className="contact-value">chpurnabhargav@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/purna-bhargav-challagundla-a783b1292/" target="_blank" rel="noopener noreferrer" className="contact-method">
              <span className="contact-icon">LinkedIn</span>
              <span className="contact-value">https://www.linkedin.com/in/purna-bhargav-challagundla-a783b1292/</span>
            </a>
            <a href="https://github.com/chpurnabhargav" target="_blank" rel="noopener noreferrer" className="contact-method">
              <span className="contact-icon">GitHub</span>
              <span className="contact-value">github.com/chpurnabhargav</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">Designed & Built by Bhargav CH</p>
          <p className="footer-year">{new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
