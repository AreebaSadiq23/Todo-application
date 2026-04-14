"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-950 to-black">
      <div className="text-center p-10 rounded-2xl border border-green-500/30 bg-black/80 backdrop-blur-xl shadow-2xl max-w-md">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
          Oops!
        </h2>
        <p className="text-white/80 mb-6">Something went wrong</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-green-500/30 text-white font-semibold hover:bg-green-500/10 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
