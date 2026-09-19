"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import './home.css';

const Home = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Master Your Daily Productivity</h1>
            <p className="hero-subtitle">
              The professional Todo application designed for clarity, focus, and getting things done.
            </p>
            <button className="button-get-started" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-visual">
            <div className="circular-layout">
              <svg className="snake-svg" viewBox="0 0 100 100">
                <circle className="snake-track" cx="50" cy="50" r="47" fill="none" />
                <circle className="snake-body" cx="50" cy="50" r="47" fill="none" />
              </svg>
              <div className="circle-node center-node">CRUD</div>
              <div className="circle-node create active-glow" style={{ animationDelay: '0s' }}>Create</div>
              <div className="circle-node add active-glow" style={{ animationDelay: '1s' }}>Add</div>
              <div className="circle-node edit active-glow" style={{ animationDelay: '2s' }}>Edit</div>
              <div className="circle-node update active-glow" style={{ animationDelay: '3s' }}>Update</div>
              <div className="circle-node view active-glow" style={{ animationDelay: '4s' }}>View</div>
              <div className="circle-node delete active-glow" style={{ animationDelay: '5s' }}>Delete</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Built for Performance</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Focus Mode</h3>
            <p>Prioritize what matters most with smart, intuitive task management.</p>
          </div>
          <div className="feature-card">
            <h3>Seamless Sync</h3>
            <p>Your tasks available instantly on all your devices, securely.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Lists</h3>
            <p>Organize effortlessly with auto-categorized, intelligent task lists.</p>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for productivity tips and updates.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
