"use client";

import Link from "next/link";
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <Link href="/" className={styles.logo}>
            Todo-app
          </Link>
          <p className={styles.description}>
            The ultimate solution for organizing your life and boosting your productivity.
          </p>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.navList}>
            <li><Link href="/about" className={styles.navLink}>About</Link></li>
            <li><Link href="/features" className={styles.navLink}>Features</Link></li>
            <li><Link href="/tasks" className={styles.navLink}>Dashboard</Link></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Legal</h3>
          <ul className={styles.navList}>
            <li><a href="#" className={styles.navLink}>Privacy Policy</a></li>
            <li><a href="#" className={styles.navLink}>Terms of Service</a></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Follow Us</h3>
          <div className={styles.socials}>
            {/* Replace with actual social media links and icons */}
            <a href="#" className={styles.socialLink}>Twitter</a>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
            <a href="#" className={styles.socialLink}>GitHub</a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Todo-app. All rights reserved.
      </div>
    </footer>
  );
}
