import Link from 'next/link';
import './Features.css';

// Icon types
type IconType = 'brain' | 'check' | 'sync' | 'dashboard' | 'layers' | 'lock';

const features: Array<{ icon: IconType; title: string; description: string; color: string }> = [
  {
    icon: "brain",
    title: "Smart Task Management",
    description: "Intelligent task organization that adapts to your workflow. Create, categorize, and prioritize tasks effortlessly.",
    color: "purple"
  },
  {
    icon: "check",
    title: "Progress Tracking",
    description: "Monitor your productivity with visual insights. Track completed tasks and celebrate your achievements.",
    color: "green"
  },
  {
    icon: "sync",
    title: "Real-time Sync",
    description: "Access your tasks anywhere with automatic cloud synchronization. Stay productive across all devices.",
    color: "blue"
  },
  {
    icon: "dashboard",
    title: "Smart Dashboard",
    description: "Get a comprehensive view of your tasks with an organized dashboard showing pending and completed items.",
    color: "orange"
  },
  {
    icon: "layers",
    title: "Categories & Labels",
    description: "Organize tasks into custom categories and add labels for better filtering and quick access.",
    color: "pink"
  },
  {
    icon: "lock",
    title: "Secure Authentication",
    description: "Enterprise-grade security protects your data with encrypted storage and secure authentication.",
    color: "red"
  }
];

// Icon components
const IconComponent = ({ type, color }: { type: IconType; color: string }) => {
  const icons: Record<IconType, React.ReactNode> = {
    brain: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
      </svg>
    ),
    check: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    sync: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    ),
    dashboard: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    layers: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    lock: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  };
  
  return <div className={`feature-icon feature-icon-${color}`}>{icons[type]}</div>;
};

export default function Features() {
  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">Powerful Features</div>
            <h1>Everything You Need</h1>
            <p className="hero-description">
              Discover the tools that will revolutionize how you manage tasks, track progress, and achieve your goals.
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-icon-large">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid (3x2) */}
      <section className="features-grid-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card feature-card-${feature.color}`}>
              <IconComponent type={feature.icon} color={feature.color} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights (3 side-by-side) */}
      <section className="highlights-section">
        <h2 className="section-title">Why Choose TodoApp?</h2>
        <div className="highlights-row">
          <div className="highlight-card highlight-green">
            <h3>Intelligent Organization</h3>
            <p>Smart algorithms help you organize tasks automatically. Set priorities, deadlines, and categories with ease.</p>
          </div>
          <div className="highlight-card highlight-blue">
            <h3>Seamless Experience</h3>
            <p>Switch between devices effortlessly. Your tasks sync in real-time across all platforms.</p>
          </div>
          <div className="highlight-card highlight-purple">
            <h3>Enterprise Security</h3>
            <p>Your data is protected with industry-standard encryption, secure authentication, and regular backups.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Features</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Availability</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Secure</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">Free</div>
          <div className="stat-label">to Start</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <h2>Experience These Features Today</h2>
        <p>Start using all features right away. No credit card required, no complicated setup — just pure productivity.</p>
        <Link href="/dashboard" className="cta-button">
          Go to Dashboard
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </section>
    </div>
  );
}