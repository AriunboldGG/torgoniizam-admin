"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import AuctionDetailsModal from "@/components/modals/AuctionDetailsModal";

// Define the auction product type
interface AuctionProduct {
  id: number;
  uniqID: string;
  name: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  category: string;
  status: string;
  image: string;
  seller: string;
  winner: string | null;
  createdAt: string;
  auctionEndDate: string;
  bids: number;
}

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
    status: "ended",
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
    status: "ended",
    image: "/images/product/prod2.png",
    createdAt: "2024-01-12",
    bids: 22,
    auctionEndDate: "2024-02-12T18:00:00",
    seller: "Цаг Дэлгүүр",
    winner: "Сайханбаяр",
  },
];

export default function AuctionProductsClient() {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<AuctionProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product: AuctionProduct) => {
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to view auction products.
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
            Auction Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor all auction products
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {auctionProducts.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionProducts.map((product) => (
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
                  <span className="text-gray-500 dark:text-gray-400">Created:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Ends:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(product.auctionEndDate)}
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
        ))}
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
