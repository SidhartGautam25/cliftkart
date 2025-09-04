import React from "react";
import { FaHeart } from "react-icons/fa";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    discount: number;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col">
      {/* Discount */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
        -{product.discount}%
      </div>

      {/* Heart Icon */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        <FaHeart size={14} />
      </button>

      {/* Image Container - fixed height ratio */}
      <div className="h-[65%] min-h-[65%] w-full p-2 flex items-center justify-center bg-gray-50 rounded">
        {product.image ? (
          <img
            src={product.image[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-sm text-center">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Info - with equal spacing */}
      <div className="mt-3 flex-1 flex flex-col justify-between pb-2">
        {/* Product Name */}
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold">${product.price}</span>
            <span className="text-gray-400 line-through text-xs ml-1">
              ${product.originalPrice}
            </span>
          </div>
          <div className="text-yellow-400 text-xs">
            ★{product.rating.toFixed(1)}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-black text-white text-xs py-1.5 rounded hover:bg-gray-800 transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
