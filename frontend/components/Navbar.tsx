"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './navbar.module.css';

interface User {
  id: number;
  username: string;
  email: string;
}

interface NavbarProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

export default function Navbar({ isAuthenticated, user, logout }: NavbarProps) {
  const pathname = usePathname();

  const getInitial = (user: User | null) => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '';
  };

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
        <li className={styles.navItem}>
          <Link href="/dashboard" className={`${styles.navLink} ${pathname === "/dashboard" ? styles.active : ""}`}>
            Dashboard
          </Link>
        </li>

      </ul>
      <div className={styles.authLinks}>
        {isAuthenticated && user ? (
          <>
            <div className={styles.profileIcon} title={user.username || user.email}>
              {getInitial(user)}
            </div>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
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
