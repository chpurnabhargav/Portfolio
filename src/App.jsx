import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';
import Education from './Education'; 
import { useEffect, useState } from 'react';
import Certficates from './Certificates';
import Projects from './Projects';
import Skills from './Skills';
function App() {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);
  
  const [animationState, setAnimationState] = useState({
    firstText: false,
    secondText: false,
    profileVisible: false,
    borderVisible: false,
    backgroundActive: false,
    clickbaitVisible: false,
    profileExpanding: false
  });
  
  useEffect(() => {
    if (location.pathname === '/' && expandedProfile) {
      setExpandedProfile(false);
    }
  }, [location.pathname, expandedProfile]);

  return (
    <div className="app-container">
      {isAnimating && <div className="page-transition-overlay"></div>}
      
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              animationState={animationState}
              setAnimationState={setAnimationState}
              setIsAnimating={setIsAnimating}
              setExpandedProfile={setExpandedProfile}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              setAnimationState={setAnimationState}
              setIsAnimating={setIsAnimating}
              setExpandedProfile={setExpandedProfile}
            />
          }
        />
        <Route
          path="/education" 
          element={<Education />}
        />
        <Route
          path="/projects"
          element={<Projects />}
        />
        <Route
          path="/certificates"
          element={<Certficates />}
        />
        <Route
          path="/skills"
          element={<Skills />}
        />
      </Routes>
    </div>
  );
}

export default App;