"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './Features.css';

// Feature Data
const features = [
  { id: 'brain', title: "Smart Task Management", description: "Intelligent task organization that adapts to your workflow. Create, categorize, and prioritize tasks effortlessly.", color: "purple" },
  { id: 'check', title: "Progress Tracking", description: "Monitor your productivity with visual insights. Track completed tasks and celebrate your achievements.", color: "green" },
  { id: 'sync', title: "Real-time Sync", description: "Access your tasks anywhere with automatic cloud synchronization. Stay productive across all devices.", color: "blue" },
  { id: 'dashboard', title: "Smart Dashboard", description: "Get a comprehensive view of your tasks with an organized dashboard showing pending and completed items.", color: "orange" },
  { id: 'layers', title: "Categories & Labels", description: "Organize tasks into custom categories and add labels for better filtering and quick access.", color: "pink" },
  { id: 'lock', title: "Secure Authentication", description: "Enterprise-grade security protects your data with encrypted storage and secure authentication.", color: "red" }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="features-page">
      <section className="interactive-workflow-section">
        <div className="showcase-side">
          <div className="feature-detail">
            <div className={`feature-badge feature-badge-${activeFeature.color}`}>
              {activeFeature.title.split(' ')[0]}
            </div>
            <h1>{activeFeature.title}</h1>
            <p>{activeFeature.description}</p>
            <div className="progress-bar">
                <div className={`progress-fill progress-${activeFeature.color}`} style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="workflow-side">
          <div className="circular-layout">
            <svg className="snake-svg" viewBox="0 0 100 100">
                <circle className="snake-track" cx="50" cy="50" r="47" fill="none" />
                <circle className="snake-body" cx="50" cy="50" r="47" fill="none" />
            </svg>
            <div className="center-node">Core</div>
            {features.map((feature, index) => {
              const angle = (index * 360) / features.length;
              const style = {
                transform: `rotate(${angle}deg) translate(130px) rotate(-${angle}deg)`
              };
              return (
                <div 
                  key={feature.id} 
                  className={`circle-node ${activeFeature.id === feature.id ? 'active' : ''}`} 
                  style={style}
                  onClick={() => setActiveFeature(feature)}
                >
                  {feature.title.split(' ')[0]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights (3 side-by-side) */}
      <section className="highlights-section">
        <h2 className="section-title">Why Choose TodoApp?</h2>
        <div className="highlights-row">
          <div className="highlight-card highlight-green">
            <h3>Intelligent Organization</h3>
            <p>Smart algorithms help you organize tasks automatically.</p>
          </div>
          <div className="highlight-card highlight-blue">
            <h3>Seamless Experience</h3>
            <p>Switch between devices effortlessly. Your tasks sync in real-time.</p>
          </div>
          <div className="highlight-card highlight-purple">
            <h3>Enterprise Security</h3>
            <p>Data protected with industry-standard encryption and backups.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <h2>Experience These Features Today</h2>
        <Link href="/dashboard" className="cta-button">
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}
