import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © {currentYear} TodoApp. All rights reserved.
      </div>
    </footer>
  );
}
