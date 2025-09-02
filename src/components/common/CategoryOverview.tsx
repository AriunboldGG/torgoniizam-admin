"use client";

import React from "react";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "automobile",
    name: "АВТОМАШИН",
    nameEn: "Car",
    count: 16,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0zM15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/>
        <path d="M5 17H3v-3l1.5-4.5A2 2 0 0 1 6.5 8H17a2 2 0 0 1 2 2l1.5 4.5V17H19"/>
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
  },
  {
    id: "mobile",
    name: "ГАР УТАС & ТАБЛЕТ",
    nameEn: "Mobile Phone & Tablet",
    count: 25,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    id: "computer",
    name: "КОМПЬЮТЕР",
    nameEn: "Computer",
    count: 34,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "jewelry",
    name: "ҮНЭТ ЭДЛЭЛ",
    nameEn: "Jewelry",
    count: 62,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6"/>
        <path d="M12 14v8"/>
        <path d="M8 18h8"/>
        <circle cx="12" cy="8" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "electronics",
    name: "ЦАХИЛГААН БАРАА",
    nameEn: "Electronics",
    count: 8,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M7 2v4"/>
        <path d="M17 2v4"/>
      </svg>
    ),
  },
];

interface CategoryOverviewProps {
  onCategorySelect?: (category: Category) => void;
  showCounts?: boolean;
  className?: string;
}

export default function CategoryOverview({ 
  onCategorySelect, 
  showCounts = true, 
  className = "" 
}: CategoryOverviewProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategorySelect?.(category)}
          className={`
            relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center cursor-pointer
            hover:shadow-lg hover:border-brand-500 dark:hover:border-brand-400 transition-all duration-200
            ${onCategorySelect ? 'hover:scale-105' : ''}
          `}
        >
          {/* Count Badge */}
          {showCounts && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 dark:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {category.count}
            </div>
          )}
          
          {/* Icon */}
          <div className="flex justify-center mb-4 text-gray-600 dark:text-gray-400">
            {category.icon}
          </div>
          
          {/* Category Name */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {category.nameEn}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Export categories for use in other components
export { categories };
export type { Category };
