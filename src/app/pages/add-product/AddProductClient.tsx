"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import SubcategorySelector from "@/components/form/SubcategorySelector";

export default function AddProductPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    category: "",
    subcategory: "",
    description: "",
    startingPrice: "",
    
    // Vehicle Specifications (for cars)
    yearOfManufacture: "",
    yearOfImport: "",
    engine: "",
    color: "",
    engineCapacity: "",
    exteriorCondition: "",
    gearbox: "",
    interiorCondition: "",
    steeringWheel: "",
    location: "",
    driveType: "",
    partsCondition: "",
    mileage: "",
    
    // Auction Details
    auctionDuration: "",
    auctionStartDate: "",
    auctionEndDate: "",
    
    // Images
    images: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Clear subcategory when category changes
    if (field === "category") {
      setFormData(prev => ({ ...prev, subcategory: "" }));
    }
  };

  const availableImages = [
    "/images/product/prod1.jpg",
    "/images/product/prod2.png", 
    "/images/product/prod3.png",
    "/images/product/prod4.png"
  ];

  const handleImageSelect = (imagePath: string) => {
    if (!formData.images.includes(imagePath)) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imagePath] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subcategory) newErrors.subcategory = "Subcategory is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startingPrice.trim()) newErrors.startingPrice = "Starting price is required";
    if (formData.images.length === 0) newErrors.images = "At least one image is required";

    // Vehicle-specific validations
    if (formData.category === "Автомашин" || formData.category === "Car") {
      if (!formData.yearOfManufacture) newErrors.yearOfManufacture = "Year of manufacture is required";
      if (!formData.engine) newErrors.engine = "Engine type is required";
      if (!formData.color) newErrors.color = "Color is required";
      if (!formData.engineCapacity) newErrors.engineCapacity = "Engine capacity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      title: "",
      category: "",
      subcategory: "",
      description: "",
      startingPrice: "",
      yearOfManufacture: "",
      yearOfImport: "",
      engine: "",
      color: "",
      engineCapacity: "",
      exteriorCondition: "",
      gearbox: "",
      interiorCondition: "",
      steeringWheel: "",
      location: "",
      driveType: "",
      partsCondition: "",
      mileage: "",
      auctionDuration: "",
      auctionStartDate: "",
      auctionEndDate: "",
      images: [],
    });
    
    setIsSubmitting(false);
    alert("Product added successfully!");
  };

  const isVehicleCategory = formData.category === "АВТОМАШИН";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new auction listing for your product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>
                Product Title <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g., TOYOTA LAND CRUISER 250"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label>
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                options={[
                  { value: "АВТОМАШИН", label: "АВТОМАШИН (Car)" },
                  { value: "ГАР УТАС & ТАБЛЕТ", label: "ГАР УТАС & ТАБЛЕТ (Mobile Phone & Tablet)" },
                  { value: "КОМПЬЮТЕР", label: "КОМПЬЮТЕР (Computer)" },
                  { value: "ҮНЭТ ЭДЛЭЛ", label: "ҮНЭТ ЭДЛЭЛ (Jewelry)" },
                  { value: "ЦАХИЛГААН БАРАА", label: "ЦАХИЛГААН БАРАА (Electronics)" },
                ]}
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {formData.category && (
              <div>
                <Label>
                  Brand/Subcategory <span className="text-red-500">*</span>
                </Label>
                <SubcategorySelector
                  categoryId={formData.category}
                  value={formData.subcategory}
                  onChange={(value) => handleInputChange("subcategory", value)}
                  className={errors.subcategory ? "border-red-500" : ""}
                  placeholder="Select brand or subcategory"
                />
                {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
              </div>
            )}

            <div className="md:col-span-2">
              <Label>
                Description <span className="text-red-500">*</span>
              </Label>
              <textarea
                placeholder="Enter detailed description of your product..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 ${
                  errors.description ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label>
                Your Price (MNT) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="e.g., 48200000"
                value={formData.startingPrice}
                onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                className={errors.startingPrice ? "border-red-500" : ""}
              />
              {errors.startingPrice && <p className="text-red-500 text-sm mt-1">{errors.startingPrice}</p>}
            </div>

            {formData.startingPrice && (
              <div>
                <Label>
                  Auction Starting Price (MNT)
                </Label>
                <div className="px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                  {parseInt(formData.startingPrice) > 0 ? (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Your Price:</span>
                        <span>{parseInt(formData.startingPrice).toLocaleString()} MNT</span>
                      </div>
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>System Fee (10%):</span>
                        <span>+{Math.round(parseInt(formData.startingPrice) * 0.1).toLocaleString()} MNT</span>
                      </div>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <div className="flex justify-between font-semibold text-brand-600 dark:text-brand-400">
                        <span>Auction Starting Price:</span>
                        <span>{Math.round(parseInt(formData.startingPrice) * 1.1).toLocaleString()} MNT</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">Enter your price to see auction starting price</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  The auction will start at 110% of your price (includes 10% system fee)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Specifications - Only show for car category */}
        {isVehicleCategory && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Vehicle Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label>
                  Үйлдвэрлэсэн он (Year of Manufacture) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 2024"
                  value={formData.yearOfManufacture}
                  onChange={(e) => handleInputChange("yearOfManufacture", e.target.value)}
                  className={errors.yearOfManufacture ? "border-red-500" : ""}
                />
                {errors.yearOfManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearOfManufacture}</p>}
              </div>

              <div>
                <Label>
                  Импортлогдсон он (Year of Import)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 2025"
                  value={formData.yearOfImport}
                  onChange={(e) => handleInputChange("yearOfImport", e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Хөдөлгүүр (Engine) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.engine}
                  onChange={(value) => handleInputChange("engine", value)}
                  options={[
                    { value: "Бензин", label: "Бензин (Petrol)" },
                    { value: "Дизель", label: "Дизель (Diesel)" },
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "Electric", label: "Electric" },
                  ]}
                  className={errors.engine ? "border-red-500" : ""}
                />
                {errors.engine && <p className="text-red-500 text-sm mt-1">{errors.engine}</p>}
              </div>

              <div>
                <Label>
                  Өнгө (Color) <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="e.g., Цэнхэр (Blue)"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className={errors.color ? "border-red-500" : ""}
                />
                {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
              </div>

              <div>
                <Label>
                  Моторын багтаамж (Engine Capacity) <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="e.g., 3500CC"
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                  className={errors.engineCapacity ? "border-red-500" : ""}
                />
                {errors.engineCapacity && <p className="text-red-500 text-sm mt-1">{errors.engineCapacity}</p>}
              </div>

              <div>
                <Label>
                  Гадна талын ашиглалт (Exterior Condition)
                </Label>
                <Select
                  value={formData.exteriorCondition}
                  onChange={(value) => handleInputChange("exteriorCondition", value)}
                  options={[
                    { value: "Хэвийн", label: "Хэвийн (Normal)" },
                    { value: "Сайн", label: "Сайн (Good)" },
                    { value: "Маш сайн", label: "Маш сайн (Very Good)" },
                    { value: "Шинэ", label: "Шинэ (New)" },
                  ]}
                />
              </div>

              <div>
                <Label>
                  Хурдны хайрцаг (Gearbox)
                </Label>
                <Select
                  value={formData.gearbox}
                  onChange={(value) => handleInputChange("gearbox", value)}
                  options={[
                    { value: "Автомат", label: "Автомат (Automatic)" },
                    { value: "Гар", label: "Гар (Manual)" },
                    { value: "CVT", label: "CVT" },
                  ]}
                />
              </div>

              <div>
                <Label>
                  Салоны ашиглалт (Interior Condition)
                </Label>
                <Select
                  value={formData.interiorCondition}
                  onChange={(value) => handleInputChange("interiorCondition", value)}
                  options={[
                    { value: "Хэвийн", label: "Хэвийн (Normal)" },
                    { value: "Сайн", label: "Сайн (Good)" },
                    { value: "Маш сайн", label: "Маш сайн (Very Good)" },
                    { value: "Шинэ", label: "Шинэ (New)" },
                  ]}
                />
              </div>

              <div>
                <Label>
                  Хүрд (Steering Wheel)
                </Label>
                <Select
                  value={formData.steeringWheel}
                  onChange={(value) => handleInputChange("steeringWheel", value)}
                  options={[
                    { value: "Зөв", label: "Зөв (Right)" },
                    { value: "Зүүн", label: "Зүүн (Left)" },
                  ]}
                />
              </div>

              <div>
                <Label>
                  Байршил (Location)
                </Label>
                <Input
                  placeholder="e.g., Улаанбаатар"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Хөтлөгч (Drive Type)
                </Label>
                <Select
                  value={formData.driveType}
                  onChange={(value) => handleInputChange("driveType", value)}
                  options={[
                    { value: "Бүх дугуй 4WD", label: "Бүх дугуй 4WD (All-wheel drive 4WD)" },
                    { value: "Арын дугуй", label: "Арын дугуй (Rear-wheel drive)" },
                    { value: "Урд дугуй", label: "Урд дугуй (Front-wheel drive)" },
                  ]}
                />
              </div>

              <div>
                <Label>
                  Эд ангиудын ашиглалт (Parts Condition)
                </Label>
                <Input
                  placeholder="e.g., Хэвийн"
                  value={formData.partsCondition}
                  onChange={(e) => handleInputChange("partsCondition", e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Гүйлт (Mileage)
                </Label>
                <Input
                  placeholder="e.g., 8000км"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Auction Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Auction Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>
                Auction Duration (Days)
              </Label>
              <Select
                value={formData.auctionDuration}
                onChange={(value) => handleInputChange("auctionDuration", value)}
                options={[
                  { value: "7", label: "7 Days" },
                  { value: "14", label: "14 Days" },
                  { value: "21", label: "21 Days" },
                  { value: "30", label: "30 Days" },
                ]}
              />
            </div>

            <div>
              <Label>
                Auction Start Date
              </Label>
              <Input
                type="datetime-local"
                value={formData.auctionStartDate}
                onChange={(e) => handleInputChange("auctionStartDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Image Selection */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Images
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label>
                Select Images <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Choose from available product images
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableImages.map((imagePath, index) => (
                  <div 
                    key={index}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                      formData.images.includes(imagePath)
                        ? "border-brand-500 ring-2 ring-brand-200"
                        : "border-gray-200 dark:border-gray-700 hover:border-brand-300"
                    }`}
                    onClick={() => handleImageSelect(imagePath)}
                  >
                    <Image
                      src={imagePath}
                      alt={`Product ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {formData.images.includes(imagePath) && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>

            {formData.images.length > 0 && (
              <div>
                <Label>Selected Images ({formData.images.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {formData.images.map((imagePath, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={imagePath}
                        alt={`Selected ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}