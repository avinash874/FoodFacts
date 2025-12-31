import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Leaf, AlertTriangle } from "lucide-react";

// Components
import Navbar from "../components/Navbar";

// API
import { getProductByBarcode } from "../services/api";

const ProductDetail = () => {
  const { barcode } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!barcode) return;

      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductByBarcode(barcode);

        if (data && data.length > 0) {
          setProduct(data[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="text-center mt-20 text-gray-500">
          Loading product details...
        </div>
      </>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error || !product) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="text-center mt-20">
          <p className="text-red-500">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-green-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Link>
        </div>
      </>
    );
  }

  const imageUrl = product.image_url || product.image_front_url;
  const allergens = product.allergens_tags || [];
  const nutriments = product.nutriments || {};

  return (
    <>
      {/* <Navbar /> */}

      <div className="container mx-auto p-6">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg shadow">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.product_name}
                className="w-full h-72 object-contain"
              />
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400">
                <Leaf size={64} />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold">
              {product.product_name || "Unknown Product"}
            </h1>

            {product.brands && (
              <p className="text-gray-600">
                <span className="font-semibold">Brand:</span>{" "}
                {product.brands}
              </p>
            )}

            {/* Ingredients */}
            {product.ingredients_text && (
              <div>
                <h3 className="font-semibold mb-1">Ingredients</h3>
                <p className="text-sm text-gray-600">
                  {product.ingredients_text}
                </p>
              </div>
            )}

            {/* Nutrition */}
            <div>
              <h3 className="font-semibold mb-1">
                Nutrition Facts (per 100g)
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {nutriments.energy && (
                  <li>Energy: {nutriments.energy}</li>
                )}
                {nutriments.fat && (
                  <li>Fat: {nutriments.fat} g</li>
                )}
                {nutriments.carbohydrates && (
                  <li>Carbohydrates: {nutriments.carbohydrates} g</li>
                )}
                {nutriments.proteins && (
                  <li>Protein: {nutriments.proteins} g</li>
                )}
                {nutriments.salt && (
                  <li>Salt: {nutriments.salt} g</li>
                )}
              </ul>
            </div>

            {/* Allergens */}
            {allergens.length > 0 && (
              <div className="bg-red-100 p-3 rounded">
                <h3 className="font-semibold flex items-center gap-2 text-red-600 mb-2">
                  <AlertTriangle size={16} />
                  Allergens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((a) => (
                    <span
                      key={a}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      {a.replace("en:", "")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/*  Barcode Section */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">
                Product Barcode
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg text-gray-800">
                  {barcode}
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(barcode)
                  }
                  className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
