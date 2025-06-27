import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const modalRef = useRef(null);
  
  const handleGoBack = () => {
    window.history.back();
  };
  
  const MY_PROJECTS = [
    {
      id: "proj-001",
      title: "Fill Your Code",
      description: "Introducing Fill Your Code - The Ultimate Coding Platform! I’m thrilled to share Fill Your Code, a powerful full-stack project designed to enhance productivity, collaboration, and provide AI-powered coding assistance!  What is Fill Your Code?It’s a real-time AI coding assistant built using Node.js, Express, and React (Next.js). Students can learn or ask about any code seamlessly with AI-assisted suggestions via the Gemini API!",
      tech: ["Node.js", "Express", "React ", "Render", "Tailwind CSS"],
      repoLink: "https://github.com/chpurnabhargav/Fill-Your-Code",
      demoLink: "https://fill-your-code.onrender.com/",
      category: "web"
    },
    {
      id: "proj-002",
      title: "Think Check",
      description: " Introducing ThinkCheck – Your AI Learning Partner  Hey everyone!  I’m thrilled to introduce ThinkCheck, an AI-driven adaptive learning platform that helps students and professionals sharpen their skills through quizzes, written assessments, roadmaps, and downloadable notes – all in one place!  What is ThinkCheck? ThinkCheck is your personal study buddy powered by Gemini AI, offering: Dynamic MCQs with difficulty selection  AI-evaluated written answers  Smart, customized roadmaps  Downloadable notes for revisionWhether you're prepping for interviews, exams, or just brushing up – ThinkCheck has your back.",
      tech: ["React.js ", "Tailwind CSS", "Node.js", "Express.js", "Gemini API","Render"],
      repoLink: "https://github.com/chpurnabhargav/ThinkCheck/",
      category: "web"
    },
    {
      id: "proj-003",
      title: "Detecting-Adrenocortical-carcinoma",
      description: "This is a practice of identifying cancer using the TP53 gene, focusing on gene sequencing related to adrenocortical carcinoma and TP53 mutations.",
      tech: ["Python", "Sequencing"],
      repoLink: "https://github.com/chpurnabhargav/Detecting-Adrenocortical-carcinoma",
      category: "python"
    },
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectList(MY_PROJECTS);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        setActiveProject(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setActiveProject(null);
      }
    };
    
    if (activeProject) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeProject]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    }
  };
  
  if (loading) {
    return (
      <div className="project-wrapper">
        
        <motion.div 
          className="loader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10"/>
            </svg>
          </div>
          <h2>Loading  projects...</h2>
        </motion.div>
      </div>
    );
  }

const ProjectCard = ({ project, index }) => (
  <motion.div 
    className="project"
    variants={itemVariants}
    onClick={() => setActiveProject(project)}
    whileHover={{ 
      y: -10,
      boxShadow: "0 25px 35px -8px rgba(0,0,0,0.4)",
      transition: { duration: 0.3 }
    }}
  >
    <>
      <div className="project-icon">
        {project.category === 'web' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        )}
        {project.category === 'mobile' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
        {project.category === 'data' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )}
        {project.category === 'iot' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )}
        {project.category === 'python' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 2h6a2 2 0 012 2v4H8a2 2 0 00-2 2v4h10a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2v-4h6a2 2 0 002-2V8H8a2 2 0 01-2-2V4a2 2 0 012-2z" />
          </svg>
        )}
      </div>

      <h3>{project.title}</h3>
      <div className="tech-tags">
        {project.tech.slice(0, 3).map((item, i) => (
          <span key={i} className="tech-tag">{item}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="tech-tag">+{project.tech.length - 3}</span>
        )}
      </div>
      <span className="view-more">
        View details
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </>
  </motion.div>
);

  const ProjectModal = ({ project }) => {
    if (!project) return null;
    
    return (
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="modal" 
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25
            }
          }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button className="close-btn" onClick={() => setActiveProject(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h2>
          
          <motion.div 
            className="category-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.category}
          </motion.div>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            className="tech-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Tech Stack</h3>
            <div className="tech-list-items">
              {project.tech.map((item, i) => (
                <motion.span 
                  key={i} 
                  className="tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.05) }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href={project.repoLink} 
              className="btn btn-github" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              GitHub Repo
            </a>
            
            {project.demoLink && (
              <a 
                href={project.demoLink} 
                className="btn btn-demo" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="project-wrapper">
    <button 
      className="go-back-btn" 
      onClick={handleGoBack}
    >
      Go Back
    </button>
      
      <motion.div 
        className="header"
        variants={headerVariants}
        initial="hidden"
        animate="show"
      >
        <h1>Projects</h1>
        <p>Some stuff I've built over the time</p>
      </motion.div>
      
      <motion.div 
        className="projects"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {projectList.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
      
      {activeProject && <ProjectModal project={activeProject} />}
    </div>
  );
};

export default Projects;