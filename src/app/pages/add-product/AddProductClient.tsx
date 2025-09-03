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
    priceNegotiable: false,
    
    // Vehicle Specifications (for cars) - All mandatory fields from the form
    brand: "", // Сонгох (Select)
    condition: "", // Нөхцөл (Condition)
    type: "", // Төрөл (Type)
    doors: "", // Хаалга (Door)
    steeringWheel: "", // Хүрд (Steering Wheel)
    driveType: "", // Хөтлөгч (Drive Type)
    yearOfManufacture: "", // Үйлдвэрлэсэн он (Year of Manufacture)
    yearOfImport: "", // Орж ирсэн он (Year of Import)
    engine: "", // Хөдөлгүүр (Engine)
    engineCapacity: "", // Мотор багтаамж (Engine Capacity)
    gearbox: "", // Хурдны хайрцаг (Gearbox)
    interiorColor: "", // Дотор өнгө (Interior Color)
    mileage: "", // Явсан (Mileage)
    leasing: "", // Лизинг (Leasing)
    color: "", // Өнгө (Color)
    chassisNumber: "", // Арлын дугаар (Chassis Number/VIN)
    
    // Auction Details
    auctionDuration: "",
    auctionStartDate: "",
    auctionStartHour: "",
    auctionEndDate: "",
    
    // Images
    images: [] as File[],
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert('Some files were rejected. Please upload only image files under 5MB.');
    }

    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...validFiles] 
    }));
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

    // Vehicle-specific validations - All mandatory fields from the form
    if (formData.category === "АВТОМАШИН") {
      if (!formData.brand) newErrors.brand = "Brand is required";
      if (!formData.condition) newErrors.condition = "Condition is required";
      if (!formData.type) newErrors.type = "Type is required";
      if (!formData.doors) newErrors.doors = "Number of doors is required";
      if (!formData.steeringWheel) newErrors.steeringWheel = "Steering wheel position is required";
      if (!formData.driveType) newErrors.driveType = "Drive type is required";
      if (!formData.yearOfManufacture) newErrors.yearOfManufacture = "Year of manufacture is required";
      if (!formData.yearOfImport) newErrors.yearOfImport = "Year of import is required";
      if (!formData.engine) newErrors.engine = "Engine type is required";
      if (!formData.engineCapacity) newErrors.engineCapacity = "Engine capacity is required";
      if (!formData.gearbox) newErrors.gearbox = "Gearbox type is required";
      if (!formData.interiorColor) newErrors.interiorColor = "Interior color is required";
      if (!formData.mileage) newErrors.mileage = "Mileage is required";
      if (!formData.leasing) newErrors.leasing = "Leasing status is required";
      if (!formData.color) newErrors.color = "Exterior color is required";
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
      priceNegotiable: false,
      brand: "",
      condition: "",
      type: "",
      doors: "",
      steeringWheel: "",
      driveType: "",
      yearOfManufacture: "",
      yearOfImport: "",
      engine: "",
      engineCapacity: "",
      gearbox: "",
      interiorColor: "",
      mileage: "",
      leasing: "",
      color: "",
      chassisNumber: "",
      auctionDuration: "",
      auctionStartDate: "",
      auctionStartHour: "",
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
          Бүтээгдэхүүн нэмэх
        </h1>

      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ерөнхий мэдээлэл
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>
                Бүтээгдэхүүний нэр <span className="text-red-500">*</span>
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
                Ангилал <span className="text-red-500">*</span>
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
                  Дэд ангилал <span className="text-red-500">*</span>
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
                Тайлбар оруулна уу <span className="text-red-500">*</span>
              </Label>
              <textarea
                placeholder="Барааны дэлгэрэнгүй танилцуулга оруулна уу..."
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
                Үнэ (Price) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="e.g., 12000000"
                value={formData.startingPrice}
                onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                className={errors.startingPrice ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Үнийн дүнг бүх тэгтэй нь оруулна уу. Жишээ нь: 12 саяыг 12000000 гэж оруулна уу.
              </p>
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
              Автомашины мэдээлэл (Vehicle Information)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Сонгох (Select) - Brand */}
              <div>
                <Label>
                  Сонгох (Select) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.brand}
                  onChange={(value) => handleInputChange("brand", value)}
                  options={[
                    { value: "Toyota", label: "Toyota" },
                    { value: "Honda", label: "Honda" },
                    { value: "Nissan", label: "Nissan" },
                    { value: "Hyundai", label: "Hyundai" },
                    { value: "Kia", label: "Kia" },
                    { value: "Mitsubishi", label: "Mitsubishi" },
                    { value: "Mazda", label: "Mazda" },
                    { value: "Subaru", label: "Subaru" },
                    { value: "Suzuki", label: "Suzuki" },
                    { value: "Isuzu", label: "Isuzu" },
                    { value: "Other", label: "Other" },
                  ]}
                  className={errors.brand ? "border-red-500" : ""}
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>

              {/* Нөхцөл (Condition) */}
              <div>
                <Label>
                  Нөхцөл (Condition) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.condition}
                  onChange={(value) => handleInputChange("condition", value)}
                  options={[
                    { value: "Дугаар авсан", label: "Дугаар авсан (Registered)" },
                    { value: "Дугаар аваагүй", label: "Дугаар аваагүй (Not Registered)" },
                    { value: "Шинэ", label: "Шинэ (New)" },
                    { value: "Хуучин", label: "Хуучин (Used)" },
                  ]}
                  className={errors.condition ? "border-red-500" : ""}
                />
                {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
              </div>

              {/* Төрөл (Type) */}
              <div>
                <Label>
                  Төрөл (Type) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onChange={(value) => handleInputChange("type", value)}
                  options={[
                    { value: "Sedan", label: "Sedan" },
                    { value: "SUV", label: "SUV" },
                    { value: "Hatchback", label: "Hatchback" },
                    { value: "Pickup", label: "Pickup" },
                    { value: "Van", label: "Van" },
                    { value: "Coupe", label: "Coupe" },
                    { value: "Convertible", label: "Convertible" },
                    { value: "Wagon", label: "Wagon" },
                  ]}
                  className={errors.type ? "border-red-500" : ""}
                />
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              {/* Хаалга (Door) */}
              <div>
                <Label>
                  Хаалга (Door) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.doors}
                  onChange={(value) => handleInputChange("doors", value)}
                  options={[
                    { value: "2", label: "2 Doors" },
                    { value: "3", label: "3 Doors" },
                    { value: "4", label: "4 Doors" },
                    { value: "5", label: "5 Doors" },
                  ]}
                  className={errors.doors ? "border-red-500" : ""}
                />
                {errors.doors && <p className="text-red-500 text-sm mt-1">{errors.doors}</p>}
              </div>

              {/* Хүрд (Steering Wheel) */}
              <div>
                <Label>
                  Хүрд (Steering Wheel) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.steeringWheel}
                  onChange={(value) => handleInputChange("steeringWheel", value)}
                  options={[
                    { value: "Зүүн", label: "Зүүн (Left)" },
                    { value: "Баруун", label: "Баруун (Right)" },
                  ]}
                  className={errors.steeringWheel ? "border-red-500" : ""}
                />
                {errors.steeringWheel && <p className="text-red-500 text-sm mt-1">{errors.steeringWheel}</p>}
              </div>

              {/* Хөтлөгч (Drive Type) */}
              <div>
                <Label>
                  Хөтлөгч (Drive Type) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.driveType}
                  onChange={(value) => handleInputChange("driveType", value)}
                  options={[
                    { value: "FWD", label: "FWD (Front Wheel Drive)" },
                    { value: "RWD", label: "RWD (Rear Wheel Drive)" },
                    { value: "AWD", label: "AWD (All Wheel Drive)" },
                    { value: "4WD", label: "4WD (Four Wheel Drive)" },
                  ]}
                  className={errors.driveType ? "border-red-500" : ""}
                />
                {errors.driveType && <p className="text-red-500 text-sm mt-1">{errors.driveType}</p>}
              </div>

              {/* Үйлдвэрлэсэн он (Year of Manufacture) */}
              <div>
                <Label>
                  Үйлдвэрлэсэн он (Year of Manufacture) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.yearOfManufacture}
                  onChange={(value) => handleInputChange("yearOfManufacture", value)}
                  options={Array.from({ length: 30 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return { value: year.toString(), label: year.toString() };
                  })}
                  className={errors.yearOfManufacture ? "border-red-500" : ""}
                />
                {errors.yearOfManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearOfManufacture}</p>}
              </div>

              {/* Орж ирсэн он (Year of Import) */}
              <div>
                <Label>
                  Орж ирсэн он (Year of Import) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.yearOfImport}
                  onChange={(value) => handleInputChange("yearOfImport", value)}
                  options={Array.from({ length: 30 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return { value: year.toString(), label: year.toString() };
                  })}
                  className={errors.yearOfImport ? "border-red-500" : ""}
                />
                {errors.yearOfImport && <p className="text-red-500 text-sm mt-1">{errors.yearOfImport}</p>}
              </div>

              {/* Хөдөлгүүр (Engine) */}
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
                    { value: "LPG", label: "LPG" },
                  ]}
                  className={errors.engine ? "border-red-500" : ""}
                />
                {errors.engine && <p className="text-red-500 text-sm mt-1">{errors.engine}</p>}
              </div>

              {/* Мотор багтаамж (Engine Capacity) */}
              <div>
                <Label>
                  Мотор багтаамж (Engine Capacity) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.engineCapacity}
                  onChange={(value) => handleInputChange("engineCapacity", value)}
                  options={[
                    { value: "1000CC", label: "1000CC" },
                    { value: "1200CC", label: "1200CC" },
                    { value: "1500CC", label: "1500CC" },
                    { value: "1600CC", label: "1600CC" },
                    { value: "1800CC", label: "1800CC" },
                    { value: "2000CC", label: "2000CC" },
                    { value: "2500CC", label: "2500CC" },
                    { value: "3000CC", label: "3000CC" },
                    { value: "3500CC", label: "3500CC" },
                    { value: "4000CC", label: "4000CC" },
                    { value: "4500CC", label: "4500CC" },
                    { value: "5000CC", label: "5000CC" },
                  ]}
                  className={errors.engineCapacity ? "border-red-500" : ""}
                />
                {errors.engineCapacity && <p className="text-red-500 text-sm mt-1">{errors.engineCapacity}</p>}
              </div>

              {/* Хурдны хайрцаг (Gearbox) */}
              <div>
                <Label>
                  Хурдны хайрцаг (Gearbox) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gearbox}
                  onChange={(value) => handleInputChange("gearbox", value)}
                  options={[
                    { value: "Автомат", label: "Автомат (Automatic)" },
                    { value: "Гар", label: "Гар (Manual)" },
                    { value: "CVT", label: "CVT" },
                    { value: "Semi-Auto", label: "Semi-Automatic" },
                  ]}
                  className={errors.gearbox ? "border-red-500" : ""}
                />
                {errors.gearbox && <p className="text-red-500 text-sm mt-1">{errors.gearbox}</p>}
              </div>

              {/* Дотор өнгө (Interior Color) */}
              <div>
                <Label>
                  Дотор өнгө (Interior Color) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.interiorColor}
                  onChange={(value) => handleInputChange("interiorColor", value)}
                  options={[
                    { value: "Хар", label: "Хар (Black)" },
                    { value: "Цагаан", label: "Цагаан (White)" },
                    { value: "Саарал", label: "Саарал (Gray)" },
                    { value: "Хүрэн", label: "Хүрэн (Brown)" },
                    { value: "Цэнхэр", label: "Цэнхэр (Blue)" },
                    { value: "Улаан", label: "Улаан (Red)" },
                    { value: "Ногоон", label: "Ногоон (Green)" },
                    { value: "Шар", label: "Шар (Yellow)" },
                  ]}
                  className={errors.interiorColor ? "border-red-500" : ""}
                />
                {errors.interiorColor && <p className="text-red-500 text-sm mt-1">{errors.interiorColor}</p>}
              </div>

              {/* Явсан (Mileage) */}
              <div>
                <Label>
                  Явсан (Mileage) <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <Input
                    type="number"
                    placeholder="e.g., 8000"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                    className={`rounded-r-none ${errors.mileage ? "border-red-500" : ""}`}
                  />
                  <span className="px-3 py-2 text-sm border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                    KM
                  </span>
                </div>
                {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
              </div>

             

              {/* Өнгө (Color) */}
              <div>
                <Label>
                  Өнгө (Color) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.color}
                  onChange={(value) => handleInputChange("color", value)}
                  options={[
                    { value: "Хар", label: "Хар (Black)" },
                    { value: "Цагаан", label: "Цагаан (White)" },
                    { value: "Саарал", label: "Саарал (Gray)" },
                    { value: "Мөнгөлөг", label: "Мөнгөлөг (Silver)" },
                    { value: "Цэнхэр", label: "Цэнхэр (Blue)" },
                    { value: "Улаан", label: "Улаан (Red)" },
                    { value: "Ногоон", label: "Ногоон (Green)" },
                    { value: "Шар", label: "Шар (Yellow)" },
                    { value: "Хүрэн", label: "Хүрэн (Brown)" },
                    { value: "Ягаан", label: "Ягаан (Purple)" },
                  ]}
                  className={errors.color ? "border-red-500" : ""}
                />
                {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
              </div>

              {/* Арлын дугаар (Chassis Number/VIN) - Not required */}
              <div>
                <Label>
                  Арлын дугаар (Chassis Number/VIN)
                </Label>
                <Input
                  placeholder="e.g., JT12345678901234567"
                  value={formData.chassisNumber}
                  onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Auction Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>
                Дуудлага худалдаа үргэлжлэх хугацаа (Цаг)
              </Label>
              <Select
                value={formData.auctionDuration}
                onChange={(value) => handleInputChange("auctionDuration", value)}
                options={[
                  { value: "1", label: "1 цаг" },
                  { value: "2", label: "2 цаг" },
                  { value: "3", label: "3 цаг" },
                  { value: "4", label: "4 цаг" },
                  { value: "5", label: "5 цаг" },
                  { value: "6", label: "6 цаг" },
                ]}
              />
            </div>

            <div>
              <Label>
                Дуудлага худалдаа эхлэх огноо
              </Label>
              <Select
                value={formData.auctionStartDate}
                onChange={(value) => handleInputChange("auctionStartDate", value)}
                options={[
                  { 
                    value: "7", 
                    label: `7 хоногийн дараа (${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('mn-MN')})` 
                  },
                  { 
                    value: "14", 
                    label: `14 хоногийн дараа (${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('mn-MN')})` 
                  },
                  { 
                    value: "30", 
                    label: `30 хоногийн дараа (${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('mn-MN')})` 
                  },
                ]}
              />
            </div>

            {formData.auctionStartDate && (
              <div>
                <Label>
                  Эхлэх цаг
                </Label>
                <Select
                  value={formData.auctionStartHour}
                  onChange={(value) => handleInputChange("auctionStartHour", value)}
                  options={Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return { 
                      value: hour, 
                      label: `${hour}:00` 
                    };
                  })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Бүтээгдэхүүний зураг
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label>
                Зураг оруулах <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Компьютерээс зураг сонгоно уу (JPG, PNG, GIF - хамгийн ихдээ 5MB)
              </p>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Зураг нэмэх
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Эсвэл зургийг энд чирээд тавина уу
                  </span>
                </label>
              </div>
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>

            {formData.images.length > 0 && (
              <div>
                <Label>Сонгосон зураг ({formData.images.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                        {file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
                      </div>
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
            {isSubmitting ? "Adding..." : "Бүтээгдэхүүн нэмэх"}
          </Button>
        </div>
      </form>
    </div>
  );
}