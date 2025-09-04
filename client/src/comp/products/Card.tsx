import { Star } from "lucide-react";

interface Product {
  [key: string]: any;
}


interface BookCardProps {
  product: Product;
}

const Card: React.FC<BookCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-4 w-full max-w-sm mx-auto hover:shadow-lg transition-all duration-300">
      {/* Badge */}
      {product.badge && (
        <span className="absolute bg-orange-500 text-white text-xs px-2 py-1 rounded-md z-10 ml-2 mt-2">
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="w-full min-h-[220px] max-h-[250px] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden p-4">
        <img
          src={product.image[0]}
          alt={product.name}
          className="object-contain h-full"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-2 text-sm">
        <h2 className="text-gray-900 font-semibold text-base line-clamp-2">
          {product.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500" />
          ))}
          <span className="text-gray-600 text-xs ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="text-gray-800 font-semibold text-base">
          ₹{product.price}
          <span className="text-gray-500 line-through text-sm ml-2">
            ₹{product.oldPrice}
          </span>
          <span className="text-green-600 text-sm ml-1">
            ({product.discount}% off)
          </span>
        </div>

        {/* Delivery Info */}
        {/* <div className="text-sm text-gray-600">FREE delivery</div> */}

        {/* View Button */}
        <button className="mt-2 px-4 py-2 bg-[#a52665] text-white text-sm rounded-md hover:bg-[#490d2b] transition-all duration-200">
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
