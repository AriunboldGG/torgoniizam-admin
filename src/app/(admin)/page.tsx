"use client";

import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useState } from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Ecommerce() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Sample auction products data with timestamp-based unique IDs
  const auctionProducts = [
    {
      id: 1,
      uniqID: generateUniqID(new Date('2024-01-15T10:30:45').getTime()),
      name: "Gold Ring",
      description: "Beautiful 18k gold ring with diamond",
      startingPrice: 2500000,
      currentBid: 2800000,
      category: "ҮНЭТ ЭДЛЭЛ",
      status: "active",
      image: "/images/product/prod1.jpg",
      seller: "Алтан Шармал Дэлгүүр",
      winner: null,
      createdAt: "2024-01-15T10:30:45",
    },
    {
      id: 2,
      uniqID: generateUniqID(new Date('2024-01-10T14:22:18').getTime()),
      name: "iPhone 15 Pro",
      description: "Latest iPhone with advanced features",
      startingPrice: 1500000,
      currentBid: 1800000,
      category: "ГАР УТАС & ТАБЛЕТ",
      status: "sold",
      image: "/images/product/prod2.png",
      seller: "Технологийн Дэлгүүр",
      winner: "Батбаяр",
      createdAt: "2024-01-10T14:22:18",
    },
    {
      id: 3,
      uniqID: generateUniqID(new Date('2024-01-20T09:15:33').getTime()),
      name: "MacBook Pro",
      description: "High-performance laptop for professionals",
      startingPrice: 800000,
      currentBid: 950000,
      category: "КОМПЬЮТЕР",
      status: "active",
      image: "/images/product/prod3.png",
      seller: "Компьютер Дэлгүүр",
      winner: null,
      createdAt: "2024-01-20T09:15:33",
    },
    {
      id: 4,
      uniqID: generateUniqID(new Date('2024-01-18T16:45:12').getTime()),
      name: "Samsung TV",
      description: "55-inch 4K Smart TV",
      startingPrice: 3200000,
      currentBid: 3200000,
      category: "ЦАХИЛГААН БАРАА",
      status: "pending",
      image: "/images/product/prod4.png",
      seller: "Электроник Дэлгүүр",
      winner: null,
      createdAt: "2024-01-18T16:45:12",
    },
    {
      id: 5,
      uniqID: generateUniqID(new Date('2024-01-22T11:08:27').getTime()),
      name: "Toyota Land Cruiser",
      description: "2018 Toyota Land Cruiser Prado",
      startingPrice: 45000000,
      currentBid: 52000000,
      category: "АВТОМАШИН",
      status: "active",
      image: "/images/product/prod1.jpg",
      seller: "Авто Дэлгүүр",
      winner: null,
      createdAt: "2024-01-22T11:08:27",
    },
  ];

  useEffect(() => {
    // Redirect pawnshop owners to their products page
    if (user && user.role === "pawnshop_owner") {
      router.push("/my-products");
    }
  }, [user, router]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = auctionProducts.filter(product => 
        product.uniqID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.winner && product.winner.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
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

  // Show loading or redirect for pawnshop owners
  if (user && user.role === "pawnshop_owner") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-500"></div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Search Auction Products
        </h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by unique ID (e.g., AU-2024-001)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Search Results ({searchResults.length} found)
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                          {product.uniqID}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                          {product.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {product.seller}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <div>Starting: {formatPrice(product.startingPrice)}</div>
                        <div>Current: {formatPrice(product.currentBid)}</div>
                        {product.winner && (
                          <div className="text-blue-600 dark:text-blue-400 font-medium">
                            Winner: {product.winner}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {searchTerm && searchResults.length === 0 && !isSearching && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>No products found</strong> for "{searchTerm}"
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
              Try searching with a different unique ID or product name.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
