"use client";

import Image from "next/image";
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Story</h1>
        <p className={styles.subtitle}>
          We are a passionate team of developers, designers, and product enthusiasts dedicated to creating exceptional software that makes a difference.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.contentBlock}>
          <h2>Our Mission</h2>
          <p>
            To empower individuals and teams to achieve their goals by providing a simple, intuitive, and powerful task management solution. We believe that effective organization is the key to unlocking productivity and reducing stress.
          </p>
        </div>
        <div className={styles.contentBlock}>
          <h2>Our Vision</h2>
          <p>
            We envision a world where everyone can easily manage their tasks, collaborate seamlessly, and focus on what truly matters. We are constantly striving to innovate and improve our platform to meet the evolving needs of our users.
          </p>
        </div>
        <div className={styles.contentBlock}>
          <h2>Our Values</h2>
          <p>
            We value creativity, collaboration, and a user-centric approach in everything we do. We believe in building software that is not only functional but also a joy to use.
          </p>
        </div>
      </div>
    </div>
  );
}
