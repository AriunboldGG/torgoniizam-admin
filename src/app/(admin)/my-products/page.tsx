"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 1,
    uniqID: "AU-2024-001",
    name: "Gold Ring",
    description: "Beautiful 18k gold ring with diamond",
    price: 2500000,
    category: "ҮНЭТ ЭДЛЭЛ",
    status: "active",
    image: "/images/product/prod1.jpg",
    createdAt: "2024-01-15",
    bids: 12,
    highestBid: 2800000,
  },
  {
    id: 2,
    uniqID: "AU-2024-002",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 1500000,
    category: "ГАР УТАС & ТАБЛЕТ",
    status: "sold",
    image: "/images/product/prod2.png",
    createdAt: "2024-01-10",
    bids: 8,
    highestBid: 1800000,
  },
  {
    id: 3,
    uniqID: "AU-2024-003",
    name: "MacBook Pro",
    description: "High-performance laptop for professionals",
    price: 800000,
    category: "КОМПЬЮТЕР",
    status: "active",
    image: "/images/product/prod3.png",
    createdAt: "2024-01-20",
    bids: 5,
    highestBid: 950000,
  },
  {
    id: 4,
    uniqID: "AU-2024-004",
    name: "Samsung TV",
    description: "55-inch 4K Smart TV",
    price: 3200000,
    category: "ЦАХИЛГААН БАРАА",
    status: "pending",
    image: "/images/product/prod4.png",
    createdAt: "2024-01-18",
    bids: 0,
    highestBid: 0,
  },
];

export default function MyProductsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "active" | "sold" | "pending">("all");

  if (!user || user.role !== "pawnshop_owner") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This page is only accessible to Pawnshop Owners.
          </p>
        </div>
      </div>
    );
  }

  const filteredProducts = sampleProducts.filter(product => {
    if (filter === "all") return true;
    return product.status === filter;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "sold":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your auction products and track their performance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { key: "all", label: "All Products", count: sampleProducts.length },
            { key: "active", label: "Active", count: sampleProducts.filter(p => p.status === "active").length },
            { key: "sold", label: "Sold", count: sampleProducts.filter(p => p.status === "sold").length },
            { key: "pending", label: "Pending", count: sampleProducts.filter(p => p.status === "pending").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === tab.key
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                  {product.uniqID}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    product.status
                  )}`}
                >
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Unique ID:</span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    {product.uniqID}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Starting Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                </div>
                
                {product.status === "active" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Highest Bid:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatPrice(product.highestBid)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Bids:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.bids}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Category:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-md transition-colors">
                  View Details
                </button>
                {product.status === "active" && (
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filter === "all" 
              ? "You haven't added any products yet." 
              : `No products with status "${filter}" found.`
            }
          </p>
          <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-md transition-colors">
            Add Your First Product
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sampleProducts.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {sampleProducts.filter(p => p.status === "active").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Auctions</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {sampleProducts.filter(p => p.status === "sold").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sold Items</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(sampleProducts.reduce((sum, p) => sum + p.highestBid, 0))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
        </div>
      </div>
    </div>
  );
}
