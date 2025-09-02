"use client";

import React, { useState } from "react";
import { getSubcategories, Subcategory } from "@/data/subcategories";

interface SubcategorySelectorProps {
  categoryId: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SubcategorySelector({
  categoryId,
  value,
  onChange,
  className = "",
  placeholder = "Select subcategory",
}: SubcategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const subcategories = getSubcategories(categoryId);
  
  const filteredSubcategories = subcategories.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSubcategory = subcategories.find(sub => sub.id === value);

  const handleSelect = (subcategory: Subcategory) => {
    onChange(subcategory.id);
    setIsOpen(false);
    setSearchTerm("");
  };

  if (subcategories.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full h-11 px-4 py-2.5 text-sm text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
          focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none
          ${isOpen ? 'border-brand-500 ring-1 ring-brand-500' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedSubcategory ? "text-gray-900 dark:text-white" : "text-gray-400"}>
            {selectedSubcategory ? selectedSubcategory.name : placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* Subcategories List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((subcategory) => (
                                 <button
                   key={subcategory.id}
                   type="button"
                   onClick={() => handleSelect(subcategory)}
                   className={`
                     w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     ${value === subcategory.id ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'}
                   `}
                 >
                   <span className="font-medium">{subcategory.name}</span>
                 </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No brands found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
