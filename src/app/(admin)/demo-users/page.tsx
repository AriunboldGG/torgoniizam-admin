"use client";

import { useAuth } from "@/context/AuthContext";

export default function DemoUsersPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Demo Users & Login Credentials
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use these credentials to test different user roles and their respective menu access.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Super Admin */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SA</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Super Admin
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full system access
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email:
              </label>
              <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                admin@auction.com
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password:
              </label>
              <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                password123
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Features:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Dashboard with all auction products</li>
              <li>• User Management (All Users, Pawnshop Owners)</li>
              <li>• Reports (Sales Report, User Activity)</li>
              <li>• Analytics (Dashboard & Revenue Analytics)</li>
              <li>• Authentication management</li>
            </ul>
          </div>
        </div>

        {/* Pawnshop Owner */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">PO</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pawnshop Owner
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Limited access for business owners
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email:
              </label>
              <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                pawnshop@auction.com
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password:
              </label>
              <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                password123
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Features:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Dashboard with own products only</li>
              <li>• My Sales (Active Auctions, Sold Items)</li>
              <li>• Profile Management (My Profile, Settings)</li>
              <li>• Add/Manage own products</li>
              <li>• Authentication access</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Current User:
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          You are currently logged in as <strong>{user.name}</strong> ({user.role === "super_admin" ? "Super Admin" : "Pawnshop Owner"})
        </p>
      </div>
    </div>
  );
}
