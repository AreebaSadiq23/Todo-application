import Link from 'next/link';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Empowering Your Productivity, One Task at a Time</h1>
          <p>Discover a simpler way to manage your day and achieve your goals with TodoApp.</p>
          <Link href="/(main)/tasks" className="button-primary">Get Started</Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At TodoApp, we believe that effective task management should be effortless and intuitive.
            Our mission is to provide you with a powerful yet simple tool that helps you organize your thoughts,
            prioritize your tasks, and ultimately, conquer your day. We're dedicated to enhancing your productivity
            and bringing clarity to your busy life.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Simplicity</h3>
            <p>We strive for elegant solutions that are easy to understand and a joy to use.</p>
          </div>
          <div className="value-card">
            <h3>Efficiency</h3>
            <p>Our goal is to help you get more done in less time, without compromising on quality.</p>
          </div>
          <div className="value-card">
            <h3>Reliability</h3>
            <p>You can count on TodoApp to be there for you, consistently performing and securing your data.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action-bottom">
        <h2>Ready to Transform Your Productivity?</h2>
        <p>Join thousands of users who are simplifying their lives with TodoApp.</p>
        <Link href="/(main)/tasks" className="button-primary">Start Managing Tasks</Link>
      </section>
    </div>
  );
};

export default About;