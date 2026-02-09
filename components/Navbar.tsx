"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from './navbar.module.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        TaskMaster
      </Link>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}>
            About
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/features" className={`${styles.navLink} ${pathname === "/features" ? styles.active : ""}`}>
            Features
          </Link>
        </li>
        {isAuthenticated && (
          <li className={styles.navItem}>
            <Link href="/tasks" className={`${styles.navLink} ${pathname === "/tasks" ? styles.active : ""}`}>
              Dashboard
            </Link>
          </li>
        )}
      </ul>
      <div className={styles.authLinks}>
        {isAuthenticated ? (
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className={styles.authButton}>
              Login
            </Link>
            <Link href="/signup" className={styles.authButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
