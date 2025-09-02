"use client";

import { useAuth } from "@/context/AuthContext";
import { getSubcategories } from "@/data/subcategories";

export default function ElectronicsBrandsPage() {
  const { user } = useAuth();

  if (!user || user.role !== "super_admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This page is only accessible to Super Admins.
          </p>
        </div>
      </div>
    );
  }

  const electronicsBrands = getSubcategories("ЦАХИЛГААН БАРАА");

  // Group brands into 3 columns as shown in the image
  const columns = [];
  const itemsPerColumn = Math.ceil(electronicsBrands.length / 3);
  
  for (let i = 0; i < 3; i++) {
    const startIndex = i * itemsPerColumn;
    const endIndex = Math.min(startIndex + itemsPerColumn, electronicsBrands.length);
    columns.push(electronicsBrands.slice(startIndex, endIndex));
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ЦАХИЛГААН БАРАА - ({electronicsBrands.length} дэд ангилал)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All electronics and home appliances subcategories and their product counts in the auction system.
        </p>
      </div>

      {/* Electronics Brands Grid - 3 columns as in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3">
            {column.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Electronics Icon */}
                <div className="flex-shrink-0 w-6 h-6 text-blue-500">
                  {brand.id === "television" ? (
                    // TV icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  ) : brand.id === "refrigerator" ? (
                    // Refrigerator icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="2" x2="12" y2="22"/>
                      <line x1="8" y1="6" x2="16" y2="6"/>
                      <line x1="8" y1="10" x2="16" y2="10"/>
                    </svg>
                  ) : brand.id === "washing_machine" ? (
                    // Washing machine icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2"/>
                      <circle cx="12" cy="12" r="3"/>
                      <line x1="12" y1="1" x2="12" y2="4"/>
                    </svg>
                  ) : brand.id === "air_conditioner" ? (
                    // Air conditioner icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20"/>
                      <path d="M2 12h20"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : brand.id === "microwave" ? (
                    // Microwave icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
                      <line x1="8" y1="8" x2="16" y2="8"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                      <line x1="8" y1="16" x2="16" y2="16"/>
                    </svg>
                  ) : brand.id === "coffee_machine" ? (
                    // Coffee machine icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                      <line x1="6" y1="1" x2="6" y2="4"/>
                      <line x1="10" y1="1" x2="10" y2="4"/>
                      <line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                  ) : (
                    // Default electronics icon
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  )}
                </div>
                
                {/* Brand Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {brand.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Subcategories
          </h3>
          <div className="text-3xl font-bold text-brand-500">{electronicsBrands.length}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Electronics & appliances
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Items
          </h3>
          <div className="text-3xl font-bold text-green-500">
            {electronicsBrands.reduce((sum, brand) => sum + brand.count, 0).toLocaleString()}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Across all subcategories
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Top Category
          </h3>
          <div className="text-lg font-bold text-blue-500">
            {electronicsBrands.reduce((top, brand) => brand.count > top.count ? brand : top, electronicsBrands[0])?.name}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {electronicsBrands.reduce((top, brand) => brand.count > top.count ? brand : top, electronicsBrands[0])?.count.toLocaleString()} items
          </p>
        </div>
      </div>

      {/* All Categories Table */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Electronics & Home Appliances Subcategories
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subcategory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {electronicsBrands
                .sort((a, b) => b.count - a.count)
                .map((brand, index) => {
                  const totalItems = electronicsBrands.reduce((sum, b) => sum + b.count, 0);
                  const percentage = ((brand.count / totalItems) * 100).toFixed(1);
                  
                  return (
                    <tr key={brand.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {brand.count.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
