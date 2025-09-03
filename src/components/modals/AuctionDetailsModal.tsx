"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
// Using inline SVG instead of lucide-react

interface AuctionProduct {
  id: number;
  uniqID: string;
  name: string;
  description: string;
  startingPrice?: number;
  currentBid?: number;
  price?: number; // For my-products page
  category: string;
  status: string;
  image: string;
  seller?: string;
  winner?: string | null;
  createdAt: string;
  auctionEndDate?: string;
  bids: number;
  highestBid?: number; // For my-products page
}

interface AuctionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: AuctionProduct | null;
}

export default function AuctionDetailsModal({ isOpen, onClose, product }: AuctionDetailsModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Sample images for the product gallery - use product?.image to handle null case
  const productImages = product ? [
    product.image,
    "/images/product/prod1.jpg",
    "/images/product/prod2.png", 
    "/images/product/prod3.png",
    "/images/product/prod4.png"
  ] : [];

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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  }, [productImages.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  }, [productImages.length]);

  const handleImageClick = useCallback(() => {
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (productImages.length > 1) {
            prevImage();
          }
          break;
        case 'ArrowRight':
          if (productImages.length > 1) {
            nextImage();
          }
          break;
        case ' ':
          e.preventDefault();
          handleImageClick();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, productImages.length, onClose, prevImage, nextImage, handleImageClick]);

  // Early return after all hooks are defined
  if (!isOpen || !product) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isZoomed ? 'z-[90]' : 'z-50'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Дуудлага худалдааны дэлгэрэнгүй
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image with Zoom */}
              <div className="relative">
                <div 
                  className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-300"
                  onClick={handleImageClick}
                >
                  <Image
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                                    
                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 text-white px-3 py-2 rounded text-sm bg-black bg-opacity-50">
                    Click to zoom
                  </div>
                  
                  {/* Image Counter */}
                  {productImages.length > 1 && (
                    <div className="absolute bottom-4 left-4 text-white px-3 py-2 rounded text-sm bg-black bg-opacity-50">
                      {selectedImageIndex + 1} / {productImages.length}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Full Screen Zoom Overlay */}
              {isZoomed && (
                <div 
                  className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                  onClick={() => setIsZoomed(false)}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={productImages[selectedImageIndex]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setIsZoomed(false)}
                      className="absolute top-4 right-4 text-white p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    {/* Navigation Arrows for Full Screen */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15,18 9,12 15,6"></polyline>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9,18 15,12 9,6"></polyline>
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter for Full Screen */}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-4 left-4 text-white px-3 py-2 rounded text-sm bg-white bg-opacity-20">
                        {selectedImageIndex + 1} / {productImages.length}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {productImages.map((imagePath, index) => (
                    <div 
                      key={index} 
                      className={`aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-200 ${
                        selectedImageIndex === index 
                          ? 'ring-2 ring-brand-500 opacity-100' 
                          : 'opacity-60 hover:opacity-80'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={imagePath}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(product.status)}`}>
                    {product.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Auction Information */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Auction Information
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Starting Price</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatPrice(product.startingPrice || product.price || 0)}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.status === "ended" ? "Winning Bid" : "Current Bid"}
                    </span>
                    <p className={`text-lg font-semibold ${
                      product.status === "ended" 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-green-600 dark:text-green-400"
                    }`}>
                      {formatPrice(product.currentBid || product.highestBid || 0)}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Bids</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.bids}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seller & Winner Info */}
              <div className="space-y-4">
                {product.seller && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Seller</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.seller}
                    </span>
                  </div>
                )}
                
                {product.winner && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Winner</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {product.winner}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Created</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                
                {product.auctionEndDate && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-500 dark:text-gray-400">Auction Ends</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(product.auctionEndDate)}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                {product.status === "pending" && (
                  <button className="flex-1 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
                    Edit Auction
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
