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
        <h1 className="hero-title">Master Your Daily Productivity</h1>
        <p className="hero-subtitle">
          The professional Todo application designed for clarity, focus, and getting things done.
        </p>
        <button className="button-get-started" onClick={handleGetStarted}>
          Get Started
        </button>
        <div className="hero-visual">
          {/* Subtle productivity visual placeholder */}
          <div className="visual-placeholder">✓</div>
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

      <section className="cta-section">
        <h2>Ready to get organized?</h2>
        <button className="button-cta" onClick={handleGetStarted}>
          Launch My Dashboard
        </button>
      </section>
    </div>
  );
};

export default Home;
