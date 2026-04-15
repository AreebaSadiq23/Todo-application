"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitial = (user: User | null) => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '';
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link href="/" className={styles.logo}>
          Todo-app
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={`${styles.navLink} ${mounted && pathname === "/" ? styles.active : ""}`}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={`${styles.navLink} ${mounted && pathname === "/about" ? styles.active : ""}`}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/features" className={`${styles.navLink} ${mounted && pathname === "/features" ? styles.active : ""}`}>
              Features
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/dashboard" className={`${styles.navLink} ${mounted && pathname === "/dashboard" ? styles.active : ""}`}>
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Desktop Auth */}
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
            <Link href="/login" className={styles.loginTextLink}>
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Button */}
        <button 
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu - slides down from navbar */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          <li className={styles.mobileNavItem}>
            <Link href="/" className={`${styles.mobileNavLink} ${mounted && pathname === "/" ? styles.active : ""}`} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/about" className={`${styles.mobileNavLink} ${mounted && pathname === "/about" ? styles.active : ""}`} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/features" className={`${styles.mobileNavLink} ${mounted && pathname === "/features" ? styles.active : ""}`} onClick={closeMenu}>
              Features
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/dashboard" className={`${styles.mobileNavLink} ${mounted && pathname === "/dashboard" ? styles.active : ""}`} onClick={closeMenu}>
              Dashboard
            </Link>
          </li>
        </ul>
        <div className={styles.mobileAuth}>
          {isAuthenticated && user ? (
            <>
              <div className={styles.profileRow}>
                <div className={styles.profileIconMobile} title={user.username || user.email}>
                  {getInitial(user)}
                </div>
                <span className={styles.usernameText}>{user.username}</span>
              </div>
              <button onClick={() => { logout(); closeMenu(); }} className={styles.mobileLogoutButton}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.mobileLoginButton} onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </nav>
  );
}
