import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3 className={styles.brandTitle}>TodoApp</h3>
          <p className={styles.brandDesc}>Master your daily productivity with clarity and focus.</p>
        </div>
        
        <div className={styles.links}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/features" className={styles.link}>Features</Link>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © {currentYear} TodoApp. All rights reserved.
      </div>
    </footer>
  );
}
