
import React from 'react';
import './intro-animation.css';
import Logo from './logo';

const IntroAnimation = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="intro-logo">
           <Logo />
        </div>
        <div className="intro-subtitle">
          Awakening Intelligence...
        </div>
      </div>
      <div className="intro-glow"></div>
    </div>
  );
};

export default IntroAnimation;
