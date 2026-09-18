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
        <div className="hero-content-left">
          <h1>Effortlessly organize your daily tasks</h1>
          <p>
            A professional approach to task management. Stay focused, 
            balanced, and productive with our clean and intuitive interface.
          </p>
          <button className="button-get-started" onClick={handleGetStarted}>Get Started</button>
        </div>
      </section>

      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>Intelligent Organization</h3>
            <p>Streamline your workflow with tools designed for clarity and focus.</p>
          </div>
          <div className="info-card">
            <h3>Reliable Syncing</h3>
            <p>Access your tasks from anywhere, ensuring you're always prepared.</p>
          </div>
          <div className="info-card">
            <h3>Professional Design</h3>
            <p>Experience a task manager built for productivity and aesthetic balance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
