"use client"

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading application...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary p-4 shadow-md flex justify-between items-center">
        <Link href="/tasks" className="text-2xl font-bold">
          Todo App
        </Link>
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </header>
      <main className="flex-grow container main-content-area">
        {children}
      </main>
    </div>
  );
}
