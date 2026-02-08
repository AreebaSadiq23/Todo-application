"use client";

import Link from "next/link";
import Image from "next/image";
import styles from './home.module.css'; // Import the CSS module
import AnimationWrapper from '../components/ui/AnimationWrapper'; // Import the AnimationWrapper

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <AnimationWrapper animationClass={styles.fadeInLeft} delay={0.2}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>TaskMaster</h1>
            <p className={styles.subtitle}>
              Organize your life, boost your productivity, and conquer your goals with our intuitive todo application. Seamlessly manage tasks, collaborate with others, and stay on top of your schedule with ease.
            </p>
            <div className={styles.freeSection}>
              <div className={styles.tickItem}>100% Free</div>
              <div className={styles.tickItem}>Free Tiers</div>
              <div className={styles.tickItem}>Free Forever</div>
            </div>
            <Link href="/signup" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </AnimationWrapper>
        <AnimationWrapper animationClass={styles.fadeInRight} delay={0.4}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/3.jfif"
              alt="Task Management"
              width={600}
              height={600}
              className={styles.heroImage}
              priority
            />
          </div>
        </AnimationWrapper>
      </div>
      <div className={styles.cardSection}>
        {[
          {
            title: "Interactive Dashboard",
            description: "Visualize your tasks and progress in a clean, modern dashboard.",
          },
          {
            title: "Seamless Collaboration",
            description: "Share your task lists with team members and collaborate in real-time.",
          },
          {
            title: "Smart Reminders",
            description: "Never miss a deadline with our intelligent reminder system.",
          },
          {
            title: "Cross-Platform Sync",
            description: "Access your tasks on any device, anytime, anywhere.",
          },
        ].map((card, index) => (
          <AnimationWrapper key={index} animationClass={styles.zoomIn} delay={index * 0.2}>
            <div className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </AnimationWrapper>
        ))}
      </div>
    </div>
  );
}