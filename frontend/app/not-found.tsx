import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundCard}>
        <h1 className={styles.statusCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist.
        </p>
        <Link href="/" className={styles.homeButton}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
