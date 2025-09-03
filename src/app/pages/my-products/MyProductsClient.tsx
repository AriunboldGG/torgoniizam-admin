"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useMemo } from "react";
import Image from "next/image";
import AuctionDetailsModal from "@/components/modals/AuctionDetailsModal";

// Define the product type for my-products page
interface MyProduct {
  id: number;
  uniqID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  image: string;
  createdAt: string;
  bids: number;
  highestBid: number;
}

// Function to generate timestamp-based unique ID
const generateUniqID = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `AU-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 1,
    uniqID: generateUniqID(new Date('2024-01-15T10:30:45').getTime()),
    name: "Gold Ring",
    description: "Beautiful 18k gold ring with diamond",
    price: 2500000,
    category: "ҮНЭТ ЭДЛЭЛ",
    status: "active",
    image: "/images/product/prod1.jpg",
    createdAt: "2024-01-15T10:30:45",
    bids: 12,
    highestBid: 2800000,
  },
  {
    id: 2,
    uniqID: generateUniqID(new Date('2024-01-10T14:22:18').getTime()),
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 1500000,
    category: "ГАР УТАС & ТАБЛЕТ",
    status: "ended",
    image: "/images/product/prod2.png",
    createdAt: "2024-01-10T14:22:18",
    bids: 8,
    highestBid: 1800000,
  },
  {
    id: 3,
    uniqID: generateUniqID(new Date('2024-01-20T09:15:33').getTime()),
    name: "MacBook Pro",
    description: "High-performance laptop for professionals",
    price: 800000,
    category: "КОМПЬЮТЕР",
    status: "active",
    image: "/images/product/prod3.png",
    createdAt: "2024-01-20T09:15:33",
    bids: 5,
    highestBid: 950000,
  },
  {
    id: 4,
    uniqID: generateUniqID(new Date('2024-01-18T16:45:12').getTime()),
    name: "Samsung TV",
    description: "55-inch 4K Smart TV",
    price: 3200000,
    category: "ЦАХИЛГААН БАРАА",
    status: "pending",
    image: "/images/product/prod4.png",
    createdAt: "2024-01-18T16:45:12",
    bids: 0,
    highestBid: 0,
  },
];

export default function MyProductsClient() {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<MyProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleViewDetails = (product: MyProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "ended":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(sampleProducts.map(product => product.category))];
    return uniqueCategories;
  }, []);

  // Filter products based on search and filter criteria
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.uniqID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;

      // Category filter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Бүтээгдэхүүнүүд
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Бүтээгдэхүүн удирдах хуудас
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing: {filteredProducts.length} of {sampleProducts.length} products
          </div>
          <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
            Бүтээгдэхүүн нэмэх
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Products
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search by name, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
            {/* Product Image */}
            <div className="aspect-square relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                  {product.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                  {product.uniqID}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Your Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Highest Bid:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatPrice(product.highestBid)}
                  </span>
                </div>
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Created:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(product)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Дэлгэрэнгүй үзэх
                </button>
                {product.status === "pending" && (
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AuctionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}
