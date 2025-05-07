import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LandingPage.css';

function LandingPage({ animationState, setAnimationState, setIsAnimating, setExpandedProfile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = '/img.jpg';
    img.onload = () => setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (!isLoaded) return;
    
    if (location.state && location.state.resetAnimations) {
      setAnimationState({
        backgroundActive: false,
        borderVisible: false,
        profileVisible: false,
        firstText: false,
        secondText: false,
        ctaVisible: false,
        profileExpanding: false
      });
      
      setIsAnimating(false);
      setExpandedProfile(false);
      
      setTimeout(() => {
        initializeAnimations();
      }, 100);
    } else {
      initializeAnimations();
    }
    
    return () => {
      clearAllTimeouts();
    };
  }, [location.state, setAnimationState, isLoaded]);
  
  const initializeAnimations = () => {
    clearAllTimeouts();
    
    setAnimationState(prev => ({ ...prev, backgroundActive: true }));
    
    const timeouts = [];
    
    timeouts.push(setTimeout(() => {
      setAnimationState(prev => ({ ...prev, borderVisible: true }));
    }, 500));
    
    timeouts.push(setTimeout(() => {
      setAnimationState(prev => ({ ...prev, profileVisible: true }));
    }, 1200));
    
    timeouts.push(setTimeout(() => {
      setAnimationState(prev => ({ ...prev, firstText: true }));
    }, 2000));
    
    timeouts.push(setTimeout(() => {
      setAnimationState(prev => ({ ...prev, secondText: true }));
    }, 2400));

    timeouts.push(setTimeout(() => {
      setAnimationState(prev => ({ ...prev, ctaVisible: true }));
    }, 3000));
    
    const loopAnimation = () => {
      setAnimationState(prev => ({
        ...prev,
        firstText: false,
        secondText: false
      }));
      
      timeouts.push(setTimeout(() => {
        setAnimationState(prev => ({ ...prev, firstText: true }));
        
        timeouts.push(setTimeout(() => {
          setAnimationState(prev => ({ ...prev, secondText: true }));
        }, 500));
      }, 600));
    };

    const loopTimer = setInterval(loopAnimation, 10000);
    window.loopTimerId = loopTimer;
  };
  
  const clearAllTimeouts = () => {
    if (window.loopTimerId) {
      clearInterval(window.loopTimerId);
    }
  };

  const handleProfileClick = () => {
    setIsAnimating(true);
    setExpandedProfile(true);
    setAnimationState(prev => ({ ...prev, profileExpanding: true }));

    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleProfileClick();
    }
  };

  return (
    <div className={`LandingPage ${animationState.backgroundActive ? 'bg-active' : ''}`}>
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      <div className={`content-container ${animationState.borderVisible ? 'visible' : ''}`}>
        <div className={`border border1 ${animationState.borderVisible ? 'visible' : ''}`}>
          <div className={`textContainer fromRightToLeft ${animationState.firstText ? 'animated' : ''}`}>
            <h1 className="nameText">Bhargav</h1>
          </div>
        </div>
        
        <div className={`border border2 ${animationState.borderVisible ? 'visible' : ''}`}>
          <div className={`textContainer fromLeftToRight ${animationState.secondText ? 'animated' : ''}`}>
            <h1 className="nameText">CH</h1>
          </div>
        </div>
        
        <div 
          className={`profile ${animationState.profileVisible ? 'visible' : ''} ${animationState.profileExpanding ? 'expanding' : ''}`}
          onClick={handleProfileClick}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          role="button"
          aria-label="View Portfolio"
        >
          <div className="profile-inner">
            <img 
              src="/img.jpg" 
              alt="Bhargav CH - Profile" 
              className="profile-image" 
            />
          </div>
        </div>
        
        <div className={`cta-text ${animationState.ctaVisible ? 'visible' : ''}`}>
          View My Portfolio
        </div>
      </div>
    </div>
  );
}

export default LandingPage;