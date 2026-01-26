import React from "react";
import "./CodingProfiles.css";

function CodingProfiles() {
  const handleGoBack = () => {
    console.log("Go back clicked");
    window.history.back();
  };

  const profiles = [
    {
      id: 1,
      platform: "LeetCode",
      username: "chpurnabhargav",
      link: "https://leetcode.com/",
    },
    {
      id: 2,
      platform: "CodeChef",
      username: "purnabhargav",
      link: "https://www.codechef.com/users/",
    },
    {
      id: 3,
      platform: "Codeforces",
      username: "bhargav7666",
      link: "https://codeforces.com/profile/",
    },
    {
      id: 4,
      platform: "HackerRank",
      username: "chpurnabhargav",
      link: "https://www.hackerrank.com/profile/",
    },
    {
      id: 5,
      platform: "GitHub",
      username: "chpurnabhargav",
      link: "https://github.com/",
    },
  ];

  return (
    <div className="coding-wrapper">
      {/* ✅ Go Back Button */}
      <button className="go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>

      <div className="coding-container">
        <h1 className="coding-title">Coding Profiles</h1>
        <p className="coding-subtitle">
          My competitive programming and development profiles
        </p>

        <div className="coding-grid">
          {profiles.map((p) => (
            <div className="coding-card" key={p.id}>
              <div className="coding-top">
                <h2 className="coding-platform">{p.platform}</h2>
              </div>

              <p className="coding-username">
                Username: <span>{p.username}</span>
              </p>

              <a
                href={`${p.link}${p.username}`}
                target="_blank"
                rel="noreferrer"
                className="coding-btn"
              >
                Visit Profile →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CodingProfiles;
