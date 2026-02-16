import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content-left">
          <h1>Transform your tasks into accomplishments with AI</h1>
          <p>
            Supercharge your productivity with intelligent task management. Plan, organize, and achieve your goals
            with the help of advanced AI features designed to streamline your workflow.
          </p>
          <div className="email-signup-section">
            <input type="email" placeholder="Enter your email" className="email-input" />
            <button className="button-get-started">Get Started</button>
          </div>
<<<<<<< HEAD
        </AnimationWrapper>
        
        <AnimationWrapper animationClass={styles.fadeInRight} delay={0.4}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/public/images/3.jfif"
              alt="Task Management"
              width={600}
              height={600}
              className={styles.heroImage}
              priority
            />
=======
          <div className="features-highlight">
            <p className="feature-item-highlight"><span className="tick-icon">&#10003;</span> No credit card required</p>
            <p className="feature-item-highlight"><span className="tick-icon">&#10003;</span> 12 days free trial</p>
>>>>>>> recover-uiux
          </div>
        </div>
        <div className="hero-image-right">
          <img src="images/home.jpeg" alt="AI Productivity" />
        </div>
      </section>

      <section className="info-section">
        <h2>Why Choose Our AI-Powered Todo App?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Intelligent Prioritization</h3>
            <p>Focus on what matters most. Our system helps you prioritize tasks based on urgency and importance.</p>
          </div>
          <div className="info-card">
            <h3>Seamless Integration</h3>
            <p>Works effortlessly across all your devices, keeping your tasks in sync wherever you go.</p>
          </div>
          <div className="info-card">
            <h3>Boost Your Efficiency</h3>
            <p>Leverage AI insights to complete tasks faster and more effectively than ever before.</p>
          </div>
        </div>
      </section>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default Home;
>>>>>>> recover-uiux
