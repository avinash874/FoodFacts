import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, loading }) => {
  // 🔥 Skeleton Loader
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No products available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.code || "product"}-${index}`}
          product={product}
        />
      ))}

    </div>
  );
};

export default ProductList;
