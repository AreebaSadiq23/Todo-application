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
              <div className="circle-node create">Create</div>
              <div className="circle-node add">Add</div>
              <div className="circle-node edit">Edit</div>
              <div className="circle-node update">Update</div>
              <div className="circle-node view">View</div>
              <div className="circle-node delete">Delete</div>
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
