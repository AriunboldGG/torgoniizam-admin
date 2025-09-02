"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";

// Sample auction products with unique IDs
const auctionProducts = [
  {
    id: 1,
    uniqID: "AU-2024-001",
    name: "Gold Ring",
    description: "Beautiful 18k gold ring with diamond",
    startingPrice: 2500000,
    currentBid: 2800000,
    category: "ҮНЭТ ЭДЛЭЛ",
    status: "active",
    image: "/images/product/prod1.jpg",
    createdAt: "2024-01-15",
    bids: 12,
    auctionEndDate: "2024-02-15T18:00:00",
    seller: "Алтан Шармал Дэлгүүр",
    winner: null,
  },
  {
    id: 2,
    uniqID: "AU-2024-002",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    startingPrice: 1500000,
    currentBid: 1800000,
    category: "ГАР УТАС & ТАБЛЕТ",
    status: "sold",
    image: "/images/product/prod2.png",
    createdAt: "2024-01-10",
    bids: 8,
    auctionEndDate: "2024-02-10T18:00:00",
    seller: "Технологийн Дэлгүүр",
    winner: "Батбаяр",
  },
  {
    id: 3,
    uniqID: "AU-2024-003",
    name: "MacBook Pro",
    description: "High-performance laptop for professionals",
    startingPrice: 800000,
    currentBid: 950000,
    category: "КОМПЬЮТЕР",
    status: "active",
    image: "/images/product/prod3.png",
    createdAt: "2024-01-20",
    bids: 5,
    auctionEndDate: "2024-02-20T18:00:00",
    seller: "Компьютер Дэлгүүр",
    winner: null,
  },
  {
    id: 4,
    uniqID: "AU-2024-004",
    name: "Samsung TV",
    description: "55-inch 4K Smart TV",
    startingPrice: 3200000,
    currentBid: 3200000,
    category: "ЦАХИЛГААН БАРАА",
    status: "pending",
    image: "/images/product/prod4.png",
    createdAt: "2024-01-18",
    bids: 0,
    auctionEndDate: "2024-02-18T18:00:00",
    seller: "Электроник Дэлгүүр",
    winner: null,
  },
  {
    id: 5,
    uniqID: "AU-2024-005",
    name: "Toyota Land Cruiser",
    description: "2018 Toyota Land Cruiser Prado",
    startingPrice: 45000000,
    currentBid: 52000000,
    category: "АВТОМАШИН",
    status: "active",
    image: "/images/product/prod1.jpg",
    createdAt: "2024-01-22",
    bids: 15,
    auctionEndDate: "2024-02-22T18:00:00",
    seller: "Авто Дэлгүүр",
    winner: null,
  },
  {
    id: 6,
    uniqID: "AU-2024-006",
    name: "Rolex Watch",
    description: "Vintage Rolex Submariner",
    startingPrice: 12000000,
    currentBid: 15000000,
    category: "ҮНЭТ ЭДЛЭЛ",
    status: "sold",
    image: "/images/product/prod2.png",
    createdAt: "2024-01-12",
    bids: 22,
    auctionEndDate: "2024-02-12T18:00:00",
    seller: "Цаг Дэлгүүр",
    winner: "Сайханбаяр",
  },
];

export default function AuctionProductsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (!user) return null;

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
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const filteredProducts = auctionProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.uniqID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.winner && product.winner.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(auctionProducts.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Auction Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track all auction products with unique IDs for winner identification.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, ID, seller, or winner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
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
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                  {product.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                  {product.uniqID}
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
                  <span className="text-gray-500 dark:text-gray-400">Starting Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(product.startingPrice)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Current Bid:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatPrice(product.currentBid)}
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
                  <span className="text-gray-500 dark:text-gray-400">Seller:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.seller}
                  </span>
                </div>
                
                {product.winner && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Winner:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {product.winner}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Ends:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(product.auctionEndDate)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Products
          </h3>
          <div className="text-3xl font-bold text-brand-500">{auctionProducts.length}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Active Auctions
          </h3>
          <div className="text-3xl font-bold text-green-500">
            {auctionProducts.filter(p => p.status === "active").length}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Sold Items
          </h3>
          <div className="text-3xl font-bold text-blue-500">
            {auctionProducts.filter(p => p.status === "sold").length}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Revenue
          </h3>
          <div className="text-3xl font-bold text-purple-500">
            {formatPrice(auctionProducts
              .filter(p => p.status === "sold")
              .reduce((sum, p) => sum + p.currentBid, 0)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
