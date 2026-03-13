import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const playlist = ["/1.mp4", "/2.mp4"];

const Landing: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoIndex = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      currentVideoIndex.current = (currentVideoIndex.current + 1) % playlist.length;
      video.src = playlist[currentVideoIndex.current];
      video.play().catch(error => {
        console.log("Autoplay prevented on next video:", error);
      });
    };

    video.addEventListener('ended', handleEnded);

    // Initial play promise handling
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="landing-container">
      {/* Fallback background image if video fails to load or while loading */}
      <div className="landing-fallback-bg"></div>

      {/* Video Background Container */}
      <div className="landing-video-container">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline 
          id="bg-video"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        >
          <source src={playlist[0]} type="video/mp4" />
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
