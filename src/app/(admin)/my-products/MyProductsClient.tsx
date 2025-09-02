"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
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
            My Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your auction products
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {sampleProducts.length} products
          </div>
          <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
            Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
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
                  View Details
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
