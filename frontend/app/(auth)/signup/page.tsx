"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

import styles from '../auth.module.css';

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post("/auth/register", { username, email, password });

      // After successful registration, log the user in
      const loginResponse = await api.post("/auth/login", new URLSearchParams({
        username: username,
        password: password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      login(loginResponse.data.access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Card className={styles.authCard}>
        <CardHeader>
          <CardTitle className={styles.authTitle}>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.formSpaceY}>
            <div className={styles.formGroup}>
              <Label htmlFor="username" className={styles.label}>Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <Label htmlFor="email" className={styles.label}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <Label htmlFor="password" className={styles.label}>Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            <Button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className={styles.linkText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
