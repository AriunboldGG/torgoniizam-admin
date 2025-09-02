"use client";

import { useAuth } from "@/context/AuthContext";
import { getSubcategories } from "@/data/subcategories";

export default function JewelryBrandsPage() {
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

  const jewelryBrands = getSubcategories("ҮНЭТ ЭДЛЭЛ");

  // Group brands into 3 columns as shown in the image
  const columns = [];
  const itemsPerColumn = Math.ceil(jewelryBrands.length / 3);
  
  for (let i = 0; i < 3; i++) {
    const startIndex = i * itemsPerColumn;
    const endIndex = Math.min(startIndex + itemsPerColumn, jewelryBrands.length);
    columns.push(jewelryBrands.slice(startIndex, endIndex));
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ҮНЭТ ЭДЛЭЛ - ({jewelryBrands.length} дэд ангилал)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All jewelry and precious items subcategories and their product counts in the auction system.
        </p>
      </div>

      {/* Jewelry Brands Grid - 3 columns as in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3">
            {column.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Jewelry Icon */}
                <div className="flex-shrink-0 w-6 h-6 text-purple-500">
                  {brand.id === "erdeniin_chuluu" ? (
                    // Diamond icon for gemstones
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
                      <path d="M11 3L8 9l4 13 4-13-3-6"/>
                      <path d="M2 9h20"/>
                    </svg>
                  ) : (
                    // Ring icon for other jewelry
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6"/>
                      <path d="M21 12h-6m-6 0H3"/>
                      <path d="M12 1a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z"/>
                      <path d="M12 17a3 3 0 0 1 3-3c0-1.5-1.5-3-3-3s-3 1.5-3 3a3 3 0 0 1 3 3z"/>
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
          <div className="text-3xl font-bold text-brand-500">{jewelryBrands.length}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Jewelry & precious items
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Items
          </h3>
          <div className="text-3xl font-bold text-green-500">
            {jewelryBrands.reduce((sum, brand) => sum + brand.count, 0).toLocaleString()}
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
            {jewelryBrands.reduce((top, brand) => brand.count > top.count ? brand : top, jewelryBrands[0])?.name}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {jewelryBrands.reduce((top, brand) => brand.count > top.count ? brand : top, jewelryBrands[0])?.count.toLocaleString()} items
          </p>
        </div>
      </div>

      {/* All Categories Table */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Jewelry & Precious Items Subcategories
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
              {jewelryBrands
                .sort((a, b) => b.count - a.count)
                .map((brand, index) => {
                  const totalItems = jewelryBrands.reduce((sum, b) => sum + b.count, 0);
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
