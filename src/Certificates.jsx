import React from "react";
import "./certificates.css";

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
      date: "2025",
      credential: "Badge",
      link: "https://www.credly.com/earner/earned/badge/939500e7-e110-4129-9482-3c8c40eb05e0",
      skills: [
        "Ethernet",
        "IP Services",
        "Switching",
        "Routing",
        "Security",
        "Network Fundamentals",
      ],
    },
    {
      id: 2,
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      date: "2024",
      credential: "Badge",
      link: "https://www.credly.com/earner/earned/badge/fc08f388-efb0-4523-850a-17d0510fad96",
      skills: [
        "AWS",
        "Cloud Infrastructure",
        "Serverless",
        "AWS Services",
        "AWS Support",
      ],
    },
    {
      id: 3,
      title: "MongoDb Associate Developer",
      issuer: "MongoDb",
      date: "2025",
      credential: "Certificate",
      link: "https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/f0e64f0c-7684-4fd9-9627-b9708b03ab01-chpurna-bhargav-chowdary-50d1bf28-8096-4fe9-a7d0-9067b5585315-certificate.pdf",
      skills: [
        "MongoDB Basics",
        "CRUD Operations",
        "Schema Design",
        "Aggregation Framework",
        "Indexes",
      ],
    },
    {
      id: 4,
      title: "Amazon Web Services Cloud Practitioner",
      issuer: "AWS",
      date: "2026",
      credential: "Certificate",
      link: "https://cp.certmetrics.com/amazon/en/credentials/status/3745241",
      skills: ["AWS Basics", "Cloud Concepts", "Security", "Pricing", "Core Services"],
    },
    {
      id: 5,
      title: "Automation Anywhere RPA (RPC)",
      issuer: "Automation Anywhere",
      date: "2025",
      credential: "Certificate",
      link: "https://certificates.automationanywhere.com/60888733-bbea-4aa9-a7fc-31ce475bc54b#acc.OXkEw0VF",
      skills: ["RPA", "Automation Anywhere", "Bots", "Workflow Automation", "Automation"],
    },
  ];

  return (
    <div className="certificates-wrapper">
      <button className="go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>

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
                    <span className="skill-tag" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* ✅ View Certificate Link Button */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-link-btn"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certificates;
