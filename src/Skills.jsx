import "./skills.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Skills() {
  const navigate = useNavigate();
  const animatedElementsRef = useRef([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".dev-skills-animate-on-scroll").forEach((el) => {
      animationObserver.observe(el);
      animatedElementsRef.current.push(el);
    });

    return () => {
      animationObserver.disconnect();
    };
  }, []);

  const skillsData = {
    programming: [
      { name: "C", level: "Advanced" },
      { name: "C++", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "Java", level: "Intermediate" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Data Structures", level: "Advanced" },
      { name: "Algorithms", level: "Advanced" },
    ],
    frontend: [
      { name: "React", level: "Advanced" },
      { name: "HTML5", level: "Expert" },
      { name: "CSS3", level: "Advanced" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "Front-End Dev", level: "Advanced" },
    ],
    backend: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "REST API", level: "Advanced" },
      { name: "SQL", level: "Intermediate" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "MySQL", level: "Intermediate" },
    ],
    ai: [
      { name: "OpenAI API", level: "Intermediate" },
      { name: "Gemini API", level: "Intermediate" },
      { name: "Grok API", level: "Intermediate" },
      { name: "ML Frameworks", level: "Beginner" },
      { name: "ChatGPT", level: "Advanced" },
      { name: "Claude", level: "Advanced" },
    ],
    tools: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced" },
      { name: "VS Code", level: "Expert" },
      { name: "AWS", level: "Intermediate" },
      { name: "FreeCAD", level: "Intermediate" },
      { name: "3D Printing", level: "Intermediate" },
      { name: "Networking", level: "Intermediate" },
      { name: "No-Code Platforms", level: "Advanced" },
    ],
    other: [
      { name: "Operating Systems", level: "Advanced" },
      { name: "IoT", level: "Intermediate" },
      { name: "Content Editing", level: "Advanced" },
      { name: "Magazine Articles", level: "Intermediate" },
    ],
  };

  const experienceList = [
    // {
    //   id:1,
    //   role:"Summer Intern at VISA'26 ",
    //   company:"VISA INC.",
    //   duration:"May 26 - July 26",
    // },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Hackathon / Personal Projects",
      duration: "2024 - Present",
      description:
        "Built full-stack applications using React, Node.js, MongoDB, and Supabase. Worked on authentication, dashboards, API integration, and deployment.",
      skills: ["React", "Node.js", "MongoDB", "Supabase", "REST API"],
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Portfolio & UI Projects",
      duration: "2023 - Present",
      description:
        "Developed responsive UI components and modern layouts with smooth animations and clean UX.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js","Express/.js"],
    },
    {
      id: 3,
      role: "Competitive Programmer",
      company: "LeetCode / CodeChef / Codeforces",
      duration: "2023 - Present",
      description:
        "Solved coding problems focusing on DSA, improving speed, logic, and problem-solving approach.",
      skills: ["DSA", "Algorithms", "Problem Solving", "C++", "Java"],
    },
  ];

  return (
    <div className="dev-skills-page">
      <button className="dev-skills-return-btn" onClick={handleGoBack}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Go Back
      </button>

      <div className="dev-skills-title-area">
        <h1 className="dev-skills-main-heading">Skills</h1>
        <p className="dev-skills-tagline">Technologies I've worked and work with</p>
      </div>

      <div className="dev-skills-categories-grid">
        {/* Programming */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M8 12H16M8 16H16"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Programming
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.programming.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Frontend */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18.5V19.5M12 18.5C9.07003 18.5 6.5 16.4701 6.5 13C6.5 9.52979 9.07003 7.5 12 7.5M12 18.5H15.5M12 7.5C14.7899 7.5 17 9.01005 17 11.5C17 12.8799 16.2298 14.0732 15 14.8444M12 7.5V6.5M12 7.5H8.5M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Frontend
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.frontend.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12.5C5 11.3954 5.89543 10.5 7 10.5C8.10457 10.5 9 11.3954 9 12.5C9 13.6046 8.10457 14.5 7 14.5H5M5 12.5C5 16.6421 8.35786 20 12.5 20C16.6421 20 20 16.6421 20 12.5C20 8.35786 16.6421 4.99998 12.5 4.99998C8.35786 4.99998 5 8.35786 5 12.5ZM14 9.99998L19 12.5L14 15V9.99998Z"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Backend
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.backend.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* AI & ML */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3.5V2M5.06066 5.06066L4 4M5.06066 13L4 14.0607M13 5.06066L14.0607 4M3.5 9H2M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9ZM14.5 14.5L22 22"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            AI & ML
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.ai.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5.5L8 7.5M8 7.5L10 9.5M8 7.5H13C13.9319 7.5 14.3978 7.5 14.7654 7.6022C15.8394 7.85798 16.642 8.66058 16.8978 9.73463C17 10.1022 17 10.5681 17 11.5M14 14.5L16 16.5M16 16.5L14 18.5M16 16.5H11C10.0681 16.5 9.60217 16.5 9.23463 16.3978C8.16058 16.142 7.35798 15.3394 7.10222 14.2654C7 13.8978 7 13.4319 7 12.5"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tools & Development
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.tools.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Other */}
        <div className="dev-skills-category-card">
          <h2 className="dev-skills-category-heading">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5Z"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9H15M9 12H15M9 15H12"
                stroke="#0a84ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Other Skills
          </h2>
          <div className="dev-skills-tag-collection">
            {skillsData.other.map((skill, index) => (
              <span
                key={index}
                className="dev-skills-tech-tag"
                data-level={skill.level}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Professional Experience Section */}
      <div className="dev-skills-proficiency-section">
        <h2 className="dev-skills-proficiency-heading">Professional Experience</h2>

        <div className="dev-exp-grid">
          {experienceList.map((exp) => (
            <div className="dev-exp-card" key={exp.id}>
              <h3 className="dev-exp-role">{exp.role}</h3>
              <p className="dev-exp-company">
                {exp.company} • <span>{exp.duration}</span>
              </p>
              <p className="dev-exp-desc">{exp.description}</p>

              <div className="dev-exp-skills">
                {exp.skills.map((s, idx) => (
                  <span className="dev-exp-tag" key={idx}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
