import type { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductForm from "@/components/ecommerce/ProductForm";
import React from "react";

export const metadata: Metadata = {
  title: "Add Product | TailAdmin - Next.js Dashboard Template",
  description: "Add new product to your e-commerce store",
};

export default function AddProduct() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Product" />
      <div className="max-w-4xl mx-auto">
        <ProductForm />
      </div>
    </div>
  );
}
