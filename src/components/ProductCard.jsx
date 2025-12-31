import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Helper to color-code nutrition grades
  const getGradeColor = (grade) => {
    const colors = {
      a: 'bg-green-500',
      b: 'bg-teal-500',
      c: 'bg-yellow-500',
      d: 'bg-orange-500',
      e: 'bg-red-500',
    };
    return colors[grade?.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.code}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100 "
    >
      <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center relative  hover:text-green-300">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.product_name} 
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
        {/* Nutrition Grade Badge */}
        {product.nutrition_grades && (
          <span className={`absolute top-2 right-2 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center uppercase ${getGradeColor(product.nutrition_grades)}`}>
            {product.nutrition_grades}
          </span>
        )}
      </div>
    
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-800 text-lg truncate mb-1">
          {product.product_name || "Unknown Product"}
        </h3>
        <p className="text-sm mb-2 text-green-700">
          {product.categories ? product.categories.split(',')[0] : 'Uncategorized'}
        </p>
        {/* Ingredients Preview */}
        <p className="text-xs text-gray-400 line-clamp-2">
          {product.ingredients_text ? product.ingredients_text : "Ingredients not available"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;




