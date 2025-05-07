import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaCode, FaEnvelope } from 'react-icons/fa';
import './ProfilePage.css';

function ProfilePage({ setAnimationState, setIsAnimating, setExpandedProfile }) {
  const navigate = useNavigate();
  const particlesRef = useRef(null);
  const transitionOverlayRef = useRef(null);
  
  const [currentTransition, setCurrentTransition] = useState(null);
  
  const [pageAnimation, setPageAnimation] = useState({
    pageVisible: false,
    whiteProfileVisible: false,
    whiteProfileSlideIn: false,
    navButtonsVisible: false,
    contentVisible: false,
    skillsVisible: false,
    projectsVisible: false,
    footerVisible: false
  });
  
  useEffect(() => {
    return () => {
      setIsAnimating(false);
      setExpandedProfile(false);
    };
  }, [setIsAnimating, setExpandedProfile]);

  useEffect(() => {
    if (pageAnimation.pageVisible && particlesRef.current) {
      const particlesContainer = particlesRef.current;
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 10 + 8;
        const opacity = Math.random() * 0.4 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.bottom = '-20px';
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
      }
    }
  }, [pageAnimation.pageVisible]);

  useEffect(() => {
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, pageVisible: true }));
    }, 100);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, whiteProfileVisible: true }));
    }, 600);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, whiteProfileSlideIn: true }));
    }, 900);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, navButtonsVisible: true }));
    }, 1200);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, contentVisible: true }));
    }, 1500);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, skillsVisible: true }));
    }, 1800);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, projectsVisible: true }));
    }, 2100);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, footerVisible: true }));
    }, 2400);
  }, []);
  
  const handleBackClick = () => {
    setPageAnimation(prev => ({ ...prev, footerVisible: false }));
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, projectsVisible: false }));
    }, 150);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, skillsVisible: false }));
    }, 300);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, contentVisible: false }));
    }, 450);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, navButtonsVisible: false }));
    }, 550);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, whiteProfileSlideIn: false }));
    }, 650);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, whiteProfileVisible: false }));
    }, 800);
    
    setTimeout(() => {
      setPageAnimation(prev => ({ ...prev, pageVisible: false }));
    }, 1000);
    
    setTimeout(() => {
      navigate('/', {
        state: {
          resetAnimations: true
        }
      });
    }, 1200);
  };

  const handleNavigation = (route) => {
    setCurrentTransition(route);
    
    if (transitionOverlayRef.current) {
      transitionOverlayRef.current.classList.add('active');
    }
    
    setTimeout(() => {
      navigate(route);
    }, 1500); 
  };
  
  const skillsData = [
    { name: 'C/C++', level: 90 },
    { name: 'Java', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'JavaScript', level: 75 },
    { name: 'SQL', level: 70 },
    { name: 'PostgreSQL', level: 65 },
    { name: 'React', level: 60 }
  ];
  
  const projectsData = [
    {
      title: 'University Management System',
      description: 'A comprehensive system for managing university resources and student data.',
      tags: ['Java', 'PostgreSQL', 'Spring Boot'],
      image: '/api/placeholder/400/320'
    },
    {
      title: 'Interactive Learning Game',
      description: 'Educational game designed to teach programming concepts through interactive challenges.',
      tags: ['Python', 'PyGame', 'Educational'],
      image: '/api/placeholder/400/320'
    },
    {
      title: 'Personal Portfolio',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      tags: ['React', 'CSS', 'JavaScript'],
      image: '/api/placeholder/400/320'
    }
  ];
  
  return (
    <div className={`profile-page ${pageAnimation.pageVisible ? 'visible' : ''}`}>
      <div 
        ref={transitionOverlayRef} 
        className={`page-transition-overlay ${currentTransition ? 'ready' : ''}`}
      >
        <div className="transition-circle"></div>
      </div>
      
      <button
        className={`back-button ${pageAnimation.pageVisible ? 'visible' : ''}`}
        onClick={handleBackClick}
      >
        Go Back
      </button>
      
      <div className="background-particles" ref={particlesRef}></div>
      
      <div className="profile-container">
        <div className="profile-info-container">
          <div 
            className={`white-profile ${pageAnimation.whiteProfileVisible ? 'visible' : ''} ${
              pageAnimation.whiteProfileSlideIn ? 'slide-in' : ''
            }`}
          >
            <div className="profile-glow">
              <img
                src="/img.jpg"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>
          
          <div className={`profile-nav-buttons ${pageAnimation.navButtonsVisible ? 'visible' : ''}`}>
            <button 
              className="profile-nav-button" 
              onClick={() => handleNavigation('/education')}
            >
              Education
            </button>
            <button 
              className="profile-nav-button" 
              onClick={() => handleNavigation('/projects')}
            >
              Projects
            </button>
            <button 
              className="profile-nav-button" 
              onClick={() => handleNavigation('/certificates')}
            >
              Certificates
            </button>
            <button 
              className="profile-nav-button" 
              onClick={() => handleNavigation('/skills')}
            >
              Skills
            </button>
          </div>
        </div>
        
        <div className={`about-me ${pageAnimation.contentVisible ? 'visible' : ''}`}>
          <h1 className="about-me-title">About Me</h1>
          <p className="about-me-tagline">"Building code with purpose and passion."</p>
          
          <div className="about-me-content">
            <p>I'm a Computer Science student at KLH University, Hyderabad, driven by a passion for solving complex problems through innovative technology solutions. My academic journey has equipped me with strong foundations in algorithms, data structures, and software architecture.</p>
            
            <p>As a Student-Educator at ACM KLH, I lead workshops and organize tech events that bridge theory with practical applications. This role has sharpened my leadership abilities and strengthened my communication skills, allowing me to convey complex technical concepts in accessible ways.</p>
            
            <p>My technical expertise includes proficiency in C/C++, Java, Python, and database systems such as SQL and PostgreSQL. I enjoy applying these skills to develop efficient and elegant solutions to real-world challenges.</p>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/chpurnabhargav" className="social-link" title="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/bhargav-chowdary-a783b1292/" className="social-link" title="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="mailto:chpurnabhargav.com" className="social-link" title="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;