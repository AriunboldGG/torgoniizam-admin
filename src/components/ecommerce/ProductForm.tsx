"use client";
import React, { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { ChevronDownIcon } from "@/icons";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  sku: string;
  stock: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  status: string;
  featured: boolean;
  tags: string;
}

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sku: "",
    stock: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    status: "active",
    featured: false,
    tags: "",
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "books", label: "Books" },
    { value: "beauty", label: "Beauty & Health" },
    { value: "automotive", label: "Automotive" },
    { value: "toys", label: "Toys & Games" },
  ];

  const brandOptions = [
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "nike", label: "Nike" },
    { value: "adidas", label: "Adidas" },
    { value: "sony", label: "Sony" },
    { value: "lg", label: "LG" },
    { value: "generic", label: "Generic" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "draft", label: "Draft" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(typeof prev[parent as keyof ProductFormData] === 'object' && prev[parent as keyof ProductFormData] !== null 
            ? prev[parent as keyof ProductFormData] 
            : {}),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field as keyof ProductFormData]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Stock quantity is required";
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid stock quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Product data:", formData);
      // Here you would typically send the data to your API
      alert("Product added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        sku: "",
        stock: "",
        weight: "",
        dimensions: {
          length: "",
          width: "",
          height: "",
        },
        status: "active",
        featured: false,
        tags: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <ComponentCard title="Basic Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              error={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              type="text"
              value={formData.sku}
              onChange={(e) => handleInputChange("sku", e.target.value)}
              placeholder="Enter product SKU"
              error={!!errors.sku}
            />
            {errors.sku && (
              <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Price *</Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                error={!!errors.price}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              placeholder="0"
              error={!!errors.stock}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
            )}
          </div>

          <div>
            <Label>Category *</Label>
            <div className="relative">
              <Select
                options={categoryOptions}
                placeholder="Select category"
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                className="dark:bg-dark-900"
                error={!!errors.category}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <Label>Brand</Label>
            <div className="relative">
              <Select
                options={brandOptions}
                placeholder="Select brand"
                value={formData.brand}
                onChange={(value) => handleInputChange("brand", value)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Label htmlFor="description">Description *</Label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
            rows={4}
            placeholder="Enter product description"
            error={!!errors.description}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="mt-6">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
            placeholder="Enter tags separated by commas"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Separate tags with commas (e.g., electronics, smartphone, mobile)
          </p>
        </div>
      </ComponentCard>

      {/* Product Details */}
      <ComponentCard title="Product Details">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label>Status</Label>
            <div className="relative">
              <Select
                options={statusOptions}
                placeholder="Select status"
                value={formData.status}
                onChange={(value) => handleInputChange("status", value)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="length">Length (cm)</Label>
            <Input
              id="length"
              type="number"
              step="0.01"
              value={formData.dimensions.length}
              onChange={(e) => handleInputChange("dimensions.length", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="width">Width (cm)</Label>
            <Input
              id="width"
              type="number"
              step="0.01"
              value={formData.dimensions.width}
              onChange={(e) => handleInputChange("dimensions.width", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              step="0.01"
              value={formData.dimensions.height}
              onChange={(e) => handleInputChange("dimensions.height", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange("featured", e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <Label htmlFor="featured" className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Featured Product
            </Label>
          </div>
        </div>
      </ComponentCard>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: "",
              description: "",
              price: "",
              category: "",
              brand: "",
              sku: "",
              stock: "",
              weight: "",
              dimensions: {
                length: "",
                width: "",
                height: "",
              },
              status: "active",
              featured: false,
              tags: "",
            });
            setErrors({});
          }}
        >
          Reset
        </Button>
        <Button type="submit">
          Add Product
        </Button>
      </div>
    </form>
  );
}
