"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is authenticated, redirect to admin dashboard
        router.push("/pages/auction-products");
      } else {
        // User is not authenticated, redirect to sign-in page
        router.push("/signin");
      }
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          {isLoading ? "Checking authentication..." : user ? "Redirecting to dashboard..." : "Redirecting to sign in..."}
        </p>
      </div>
    </div>
  );
}
