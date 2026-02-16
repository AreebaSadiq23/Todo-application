import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <h1>Unlock Your Full Potential with Our Powerful <br/> Features</h1>
        <p>Discover how our AI-powered Todo App can revolutionize your productivity and help you achieve more.</p>
      </section>

      <section className="feature-list-section">
        <div className="feature-item-detail">
          <div className="feature-content">
            <h2>AI-Powered Smart Suggestions</h2>
            <p>Our intelligent algorithms learn your work patterns and suggest optimal task scheduling, prioritization, and grouping. Say goodbye to manual organizing and hello to effortless efficiency.</p>
          </div>
          <div className="feature-image">
            <img src="images/1.jfif" alt="AI Insights & Suggestions" />
          </div>
        </div>

        <div className="feature-item-detail reverse">
          <div className="feature-content">
            <h2>Intuitive Task Management</h2>
            <p>Easily add, categorize, and track your tasks with a clean, user-friendly interface. Enjoy quick access to your to-dos, set reminders, and break down complex projects into manageable steps.</p>
          </div>
          <div className="feature-image">
            <img src="images/2.jfif" alt="Streamlined Taskflow" />
          </div>
        </div>

        <div className="feature-item-detail">
          <div className="feature-content">
            <h2>Cross-Device Synchronization</h2>
            <p>Access your tasks from anywhere, on any device. Our seamless cloud synchronization ensures your productivity remains uninterrupted, whether you're on your desktop, tablet, or smartphone.</p>
          </div>
          <div className="feature-image">
            <img src="images/3.jfif" alt="Seamless Multi-Device Sync" />
          </div>
        </div>

        <div className="feature-item-detail reverse">
          <div className="feature-content">
            <h2>Detailed Progress Tracking</h2>
            <p>Visualize your achievements with comprehensive progress reports and analytics. Understand your productivity trends, identify areas for improvement, and celebrate your milestones.</p>
          </div>
          <div className="feature-image">
            <img src="images/4.jfif" alt="Advanced Progress Analytics" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;