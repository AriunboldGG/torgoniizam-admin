"use client";

import { useAuth } from "@/context/AuthContext";
import { getSubcategories } from "@/data/subcategories";

export default function CarBrandsPage() {
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

  const carBrands = getSubcategories("АВТОМАШИН");

  // Group brands into 5 columns as shown in the image
  const columns = [];
  const itemsPerColumn = Math.ceil(carBrands.length / 5);
  
  for (let i = 0; i < 5; i++) {
    const startIndex = i * itemsPerColumn;
    const endIndex = Math.min(startIndex + itemsPerColumn, carBrands.length);
    columns.push(carBrands.slice(startIndex, endIndex));
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          АВТОМАШИН - ({carBrands.length} дэд ангилал)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All car brands and their product counts in the auction system.
        </p>
      </div>

      {/* Car Brands Grid - 5 columns as in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3">
            {column.map((brand) => (
                             <div
                 key={brand.id}
                 className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
               >
                 {/* Car Icon */}
                 <div className="flex-shrink-0 w-6 h-6 text-red-500">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0zM15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/>
                     <path d="M5 17H3v-3l1.5-4.5A2 2 0 0 1 6.5 8H17a2 2 0 0 1 2 2l1.5 4.5V17H19"/>
                     <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                   </svg>
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
            Total Brands
          </h3>
          <div className="text-3xl font-bold text-brand-500">{carBrands.length}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Car manufacturers
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Cars
          </h3>
          <div className="text-3xl font-bold text-green-500">
            {carBrands.reduce((sum, brand) => sum + brand.count, 0).toLocaleString()}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Across all brands
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Top Brand
          </h3>
          <div className="text-lg font-bold text-blue-500">
            {carBrands.reduce((top, brand) => brand.count > top.count ? brand : top, carBrands[0])?.name}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {carBrands.reduce((top, brand) => brand.count > top.count ? brand : top, carBrands[0])?.count.toLocaleString()} cars
          </p>
        </div>
      </div>

      {/* Top 10 Brands Table */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top 10 Car Brands
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
                  Brand
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
              {carBrands
                .sort((a, b) => b.count - a.count)
                .slice(0, 10)
                .map((brand, index) => {
                  const totalCars = carBrands.reduce((sum, b) => sum + b.count, 0);
                  const percentage = ((brand.count / totalCars) * 100).toFixed(1);
                  
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
