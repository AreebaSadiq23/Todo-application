"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from './error.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className={styles.errorPage}>
          <div className={styles.errorCard}>
            <h2 className={styles.errorTitle}>
              Oops!
            </h2>
            <p className={styles.errorMessage}>Something went wrong</p>
            <div className={styles.buttonGroup}>
              <Button onClick={() => reset()} variant="primary">
                Try Again
              </Button>
              <Link href="/" className={styles.homeButton}>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
