import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Video Background Container */}
      <div className="landing-video-container">
        <video 
          autoPlay 
          muted 
          loop
          playsInline 
          id="bg-video"
        >
          <source src="/Research-Project-Portfolio/blockchain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay Layer for readability */}
      <div className="landing-overlay"></div>

      {/* Decorative Glowing Elements */}
      <div className="decor-circle decor-1"></div>
      <div className="decor-circle decor-2"></div>

      {/* Main Content centered */}
      <main className="landing-content">
        <div className="landing-badge">
          <span className="flag-emoji">🇱🇰</span> Blockchain for Sri Lanka
        </div>

        <h1>Securing Sri Lanka's <br /> Land Registry Future</h1>

        <p>A comprehensive, transparent, and immutable blockchain-based land deed verification system designed to modernise Sri Lanka's land registration process.</p>

        <Link to="/home" className="landing-btn-enter" aria-label="Enter Home Page">
          Enter Platform <i className="fas fa-arrow-right"></i>
        </Link>
      </main>
    </div>
  );
};

export default Landing;
