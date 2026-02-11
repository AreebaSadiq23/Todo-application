"use client";

import Image from "next/image";
import styles from './features.module.css';

export default function FeaturesPage() {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Powerful Features, Simple to Use</h1>
        <p className={styles.subtitle}>
          Discover how TaskMaster can help you stay organized and productive.
        </p>
      </div>

      <div className={styles.featureSection}>
        <div className={styles.featureContent}>
          <h2>Key Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <h3>Intuitive Task Management</h3>
              <p>Easily create, update, and organize your tasks with a user-friendly interface.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Secure Authentication</h3>
              <p>Your data is protected with robust and secure user authentication.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Cross-Device Access</h3>
              <p>Access your tasks from any device, anywhere, ensuring you're always in sync.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Customizable Workflows</h3>
              <p>Tailor your task management to fit your unique style and productivity needs.</p>
            </div>
          </div>
        </div>
        <div className={styles.featureImageContainer}>
          <Image
            src="/images/1.jfif"
            alt="Features Showcase"
            width={600}
            height={400}
            className={styles.featureImage}
          />
        </div>
      </div>

      <div className={styles.howToSection}>
        <h2>How to Get Started</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Sign Up or Log In</h3>
            <p>Create a new account or log in with your existing credentials.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Create Your First Task</h3>
            <p>Navigate to the dashboard and add your first todo item.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Manage Your Tasks</h3>
            <p>Mark tasks as complete, edit, or delete them to stay organized.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3>Stay Productive</h3>
            <p>Use TaskMaster daily to achieve your goals and stay on top of your responsibilities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
