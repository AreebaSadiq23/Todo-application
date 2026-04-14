"use client";

import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { setupAxiosInterceptors } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthInterceptor>{children}</AuthInterceptor>
    </AuthProvider>
  );
}

function AuthInterceptor({ children }: { children: React.ReactNode }) {
  const { logout, isAuthenticated, user } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, [logout]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} user={user} logout={logout} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
