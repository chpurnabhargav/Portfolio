import React from 'react';
import './Certificates.css';

function Certificates() {
  const handleGoBack = () => {
    console.log("Go back clicked");
    window.history.back();
  };
  
  const certificatesList = [
    {
      id: 1,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      date: "April 2025",
      credential: "Badge",
      skills: ["Ethernet", " IP services", "Switcing", "Routing", "Security","Network Fudamentals"]
    },
    {
      id: 2,
      title: "C Essentials 1",
      issuer: "Cisco",
      date:"Feb 2023",
      credential: "Badge",
      skills: ["C", "Functions", "Variables", "Sorting","Strings","Arrays","Structures","Pointers"]
    },
    {
      id: 3,
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      date: "October 2024",
      credential: "Badge",
      skills: ["AWS", "Cloud Infrastructure", "Serverless","AWS Services","AWS Support"]
    },
     {
      id: 4,
      title: "React Basics",
      issuer: "Meta",
      date: "Jan 2025",
      credential: "1Q2O9V87THWP",
      skills: ["React", "front-End Web Development", "Web Application", "Application development"]
    },
    {
      id: 5,
      title: "Developing Front-End Apps with React",
      issuer: "IBM",
      date: "April 2025",
      credential: "5ZFQ2UK8C2HS",
      skills: ["React (Web Framework)", "Web Development", "JavaScript","User Interface"]
    },
    {
      id: 6,
      title: "Introduction to Operating Systems",
      issuer: "Codio",
      date: "Jan 2025",
      credential: "0XABTXYXQ8NM",
      skills: ["virtualization", "Operating Systems", "C Dynamic Memory Allocation", "C Programming","Concurrency"]
    },
    {
      id: 7,
      title: "Hands-on Introduction to Linux Commands and Shell Scripting",
      issuer: "IBM",
      date: "April 2025",
      credential: "13BCNLZIWX1WH",
      skills: ["Bash (Unix Shell)", "Shell Script", "Linux", "Linux Commands"]
    }
  ];
  
  return (
    <div className="certificates-wrapper">
      <button className="go-back-btn" onClick={handleGoBack}>Go Back</button>
      
      <div className="certificates-container">
        <h1 className="section-title">Certificates</h1>
        <p className="section-subtitle">Professional qualifications and achievements</p>
        
        <div className="certificates-grid">
          {certificatesList.map((cert) => (
            <div className="certificate-card" key={cert.id}>
              <div className="certificate-content">
                <h3>{cert.title}</h3>
                <div className="certificate-meta">
                  <span className="certificate-issuer">{cert.issuer}</span>
                  <span className="certificate-date">{cert.date}</span>
                </div>
                <div className="certificate-credential">
                  <span>Credential ID: {cert.credential}</span>
                </div>
                <div className="certificate-skills">
                  {cert.skills.map((skill, index) => (
                    <span className="skill-tag" key={index}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certificates;