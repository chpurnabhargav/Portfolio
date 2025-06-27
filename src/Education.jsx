import React from 'react';
import './education.css';

function Education() {
  const handleGoBack = () => {
    console.log("Go back clicked");
    window.history.back();
  };

  const educationList = [
    {
      id: 1,
      institution: "Sri Chaitanya High School",
      degree: "Secondary Education",
      field: "General Sciences",
      years: "2018 - 2021",
      description: "Established a strong academic foundation with focus on mathematics and sciences.",
      grade: "CGPA: 10.0",
      type: "school"
    },
    {
      id: 2,
      institution: "Sri Chaitanya Junior College",
      degree: "Higher Secondary Education",
      field: "Science & Mathematics",
      years: "2021 - 2023",
      description: "Completed with distinction in Physics, Chemistry, and Mathematics. Developed strong analytical thinking and problem-solving skills that formed the foundation for my computer science education.",
      grade: "CGPA: 8.8",
      type: "college"
    },
    {
      id: 3,
      institution: "KLH University",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      years: "2023 - 2027",
      description: "Specialized in algorithms, data structures, and software architecture. Active member of ACM KLH chapter, organizing technical workshops and events that bridge theory with practical applications.",
      grade: "CGPA: 9.75",
      type: "university"
    }
  ];

  return (
    <div className="education-wrapper">
      <button className="go-back-btn" onClick={handleGoBack}>Go Back</button>
      
      <div className="education-container">
        <h1 className="section-title">Education</h1>
        <p className="section-subtitle">Academic journey and qualifications</p>
        
        <div className="education-grid">
          {educationList.map((edu) => (
            <div className="education-card" key={edu.id}>
              <div className={`education-icon education-icon-${edu.type}`}></div>
              <div className="education-content">
                <h3>{edu.institution}</h3>
                <div className="education-meta">
                  <span className="education-years">{edu.years}</span>
                  <span className="education-grade">{edu.grade}</span>
                </div>
                <div className="education-degree">
                  <span className="degree-title">{edu.degree}</span>
                  <span className="degree-field">{edu.field}</span>
                </div>
                <p className="education-description">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;