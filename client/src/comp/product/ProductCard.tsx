import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



interface Product {
  [key: string]: any;
}

interface CardProps {

  product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
  const navigate=useNavigate();
  const goToProduct=(id:string)=>{
    navigate(`/product/${id}`)

  }
  
  return (
    <div className="relative bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-all"
    onClick={()=>goToProduct(product._id)}>
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        -{product.discount}%
      </div>

      {/* Wishlist and View Icons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button className="bg-white p-1 rounded-full shadow">
          <AiOutlineHeart size={18} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-36 object-contain mx-auto"
      />

      {/* Name */}
      <div className="mt-2 text-sm font-medium">{product.name}</div>

      {/* Price */}
      <div className="mt-1 text-sm">
        <span className="text-red-500 font-semibold">${product.price}</span>
        <span className="text-gray-400 line-through ml-2">${product.oldPrice}</span>
      </div>

      {/* Ratings */}
      <div className="flex items-center text-xs text-yellow-500 mt-1">
        {"★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating))}
        {/* <span className="ml-2 text-gray-600">({reviews})</span> */}
      </div>
    </div>
  );
};

export default ProductCard;
