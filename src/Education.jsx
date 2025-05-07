import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Education.css';

function Education() {
  const [activeSection, setActiveSection] = useState(0);

  const educationData = [
    {
      id: 0,
      institution: "Sri Chaitanya High School",
      degree: "Secondary Education",
      field: "General Sciences",
      years: "2018 - 2021",
      description: "Established a strong academic foundation with focus on mathematics and sciences. Participated in various coding competitions that sparked my interest in computer science.",
      grade: "CGPA: 10.0"
    },
    {
      id: 1,
      institution: "Sri Chaitanya Junior College",
      degree: "Higher Secondary Education",
      field: "Science & Mathematics",
      years: "2021 - 2023",
      description: "Completed with distinction in Physics, Chemistry, and Mathematics. Developed strong analytical thinking and problem-solving skills that formed the foundation for my computer science education.",
      grade: "CGPA: 8.8"
    },
    {
      id: 2,
      institution: "KLH University",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      years: "2023 - 2027",
      description: "Specialized in algorithms, data structures, and software architecture. Active member of ACM KLH chapter, organizing technical workshops and events that bridge theory with practical applications.",
      grade: "CGPA: 9.71"
    }
  ];

  const navigateTo = (index) => {
    if (index > activeSection && activeSection < educationData.length - 1) {
      setActiveSection(activeSection + 1);
    } else if (index < activeSection && activeSection > 0) {
      setActiveSection(activeSection - 1);
    } else if (index === activeSection) {
      return;
    } else {
      const newIndex = Math.max(0, Math.min(index, educationData.length - 1));
      setActiveSection(newIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        if (activeSection < educationData.length - 1) {
          setActiveSection(activeSection + 1);
        }
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault(); 
        if (activeSection > 0) {
          setActiveSection(activeSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, educationData.length]);

  useEffect(() => {
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; 
    
    const handleWheel = (event) => {
      event.preventDefault();
      
      const currentTime = new Date().getTime();
      
      if (isScrolling || (currentTime - lastScrollTime < scrollCooldown)) {
        return;
      }
      
      isScrolling = true;
      lastScrollTime = currentTime;
      
      if (event.deltaY > 0) {
        if (activeSection < educationData.length - 1) {
          setActiveSection(prevSection => prevSection + 1);
        }
      } else {
        if (activeSection > 0) {
          setActiveSection(prevSection => prevSection - 1);
        }
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    };
    
    const container = document.querySelector('.education-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [activeSection, educationData.length]);
  
  useEffect(() => {
    const scrollPercentage = (activeSection / (educationData.length - 1)) * 100;
    document.documentElement.style.setProperty('--scroll-percentage', `${scrollPercentage}%`);
    
    const dots = document.querySelectorAll('.education-nav-dot');
    dots.forEach((dot, index) => {
      const light = dot.querySelector('.dot-light');
      if (light) {
        light.style.animation = 'none';
        light.offsetHeight; 
        if (index === activeSection) {
          light.style.animation = 'light-pass 1.2s ease forwards';
        }
      }
    });
  }, [activeSection, educationData.length]);

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div className="education-container">
      <Link to="/profile" className="go-back-btn">
        Go Back
      </Link>

      <div className="education-header">
        <h1 className="education-title">Education</h1>
      </div>

      <div className="education-content-area">
        <div className="education-content-wrapper">
          {educationData.map((item, index) => (
            <div 
              key={item.id}
              className={`education-section ${index === activeSection ? 'active' : ''}`}
            >
              <div className="education-year">
                <span className="education-year-text">{item.years}</span>
              </div>
              
              <h2 className="education-institution">{item.institution}</h2>
              <h3 className="education-degree">{item.degree}</h3>
              <h4 className="education-field">{item.field}</h4>
              
              <div className="education-grade-container">
                <span className="education-grade">{item.grade}</span>
              </div>
              
              <p className="education-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="education-navigation education-navigation-left">
        {educationData.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateTo(index)}
            className={`education-nav-dot ${index === activeSection ? 'active' : ''} ${index < activeSection ? 'visited' : ''}`}
            aria-label={`View education ${index + 1}`}
          >
            <span className="dot-light"></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Education;