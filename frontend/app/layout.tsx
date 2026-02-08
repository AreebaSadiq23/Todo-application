"use client"

import { useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { setupAxiosInterceptors } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Metadata is not allowed in client components in Next.js 13+ app router.
// export const metadata: Metadata = {
//   title: "Todo App",
//   description: "A full-stack todo application",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthInterceptor>{children}</AuthInterceptor>
        </AuthProvider>
      </body>
    </html>
  );
}

function AuthInterceptor({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, [logout]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
