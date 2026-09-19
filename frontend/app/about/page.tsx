import Link from 'next/link';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-badge">About Our Mission</div>
        <h1>TodoApp</h1>
        <div className="hero-visual-container">
          <div className="hero-productivity-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
              <line x1="9" y1="17" x2="15" y2="17"></line>
            </svg>
          </div>
        </div>
        <p className="hero-description">
          We believe great productivity starts with simple, intuitive tools that help you focus on what truly matters — achieving your goals.
        </p>
        <div className="hero-tags">
          <div className="tag-item">
            <div className="tag-dot"></div>
            <span>Task Management</span>
          </div>
          <div className="tag-item">
            <div className="tag-dot"></div>
            <span>Progress Tracking</span>
          </div>
          <div className="tag-item">
            <div className="tag-dot"></div>
            <span>Team Collaboration</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <h2>Our Mission</h2>
          <div className="mission-line"></div>
          <p className="mission-text">
            At TodoApp, we're on a mission to eliminate complexity from task management. We've built a platform 
            that combines simplicity with powerful features, helping individuals and teams stay organized and 
            productive. Whether you're planning your daily tasks, managing long-term projects, or collaborating 
            with others, TodoApp provides the clarity and focus you need to succeed.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2 className="section-title">What Drives Us</h2>
        <p className="section-subtitle">The core values that shape every decision we make</p>
        
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3>Simplicity</h3>
            <p>We design for clarity and ease of use. Every feature is carefully crafted to be intuitive and helpful, never overwhelming.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3>Efficiency</h3>
            <p>Time is precious. We help you maximize productivity by streamlining workflows and eliminating unnecessary complexity.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Reliability</h3>
            <p>Your data is safe with us. We prioritize security and uptime so you can focus on your tasks without worry.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.8★</div>
          <div className="stat-label">User Rating</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <h2>Ready to Transform Your Productivity?</h2>
        <p>Join thousands of users who have simplified their task management and achieved more every day.</p>
        <Link href="/dashboard" className="cta-button">
          Get Started Free
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </section>
    </div>
  );
}