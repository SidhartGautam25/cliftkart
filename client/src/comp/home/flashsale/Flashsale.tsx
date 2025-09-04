// components/Popular.tsx
import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const Popular: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Baby care product",
      image: "public/product_img/babycare.webp",
      discount: 40,
      price: 120,
      originalPrice: 160,
      rating: 4.5,
      reviews: 88,
    },
    {
      id: 2,
      name: "Dairy Product",
      image: "public/product_img/dairy.avif",
      discount: 35,
      price: 960,
      originalPrice: 1160,
      rating: 4.3,
      reviews: 75,
    },
    {
      id: 3,
      name: "Vadilal ice-cream",
      image: "public/product_img/icecream.jpg",
      discount: 30,
      price: 370,
      originalPrice: 470,
      rating: 4.4,
      reviews: 99,
    },
    {
      id: 4,
      name: "Fruits & vegetable",
      image: "/product_img/vegetables.jpg",
      discount: 25,
      price: 375,
      originalPrice: 400,
      rating: 4.6,
      reviews: 99,
    },
  ];

  return (
    <section className="py-6 px-4 md:px-10 bg-gray-50">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center mb-4 px-4">
          <span className="w-2 h-7 bg-[#4a1630] mr-2 rounded-sm"></span>
          <h2 className="text-xl md:text-2xl font-semibold">Popular</h2>
        </div>
        <a
          href="/trending"
          className="text-sm text-white bg-[#852555] hover:bg-[#a03a6c] px-4 py-2 rounded-md"
        >
          View All
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-3 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col relative"
          >
            {/* Wishlist Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-pink-500"
              title="Add to Wishlist"
            >
              <FaHeart />
            </button>

            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full min-h-[180px]"
              />
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-medium line-clamp-2 mt-2">{product.name}</h3>

            {/* Price & Rating */}
            <div className="flex items-center justify-between text-sm mt-1">
              <div>
                <p className="text-[#ED145B] font-semibold">₹{product.price}</p>
                {product.originalPrice && (
                  <p className="text-gray-400 line-through text-xs">
                    ₹{product.originalPrice}
                  </p>
                )}
              </div>
              <p className="text-yellow-500 text-xs flex items-center gap-1">
                <FaStar className="inline-block" /> {product.rating}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 flex-col sm:flex-row">
              <button className="flex-1 bg-[#4a1630] hover:bg-[#6a2146] text-white text-sm px-4 py-2 rounded">
                View
              </button>
              <button className="flex-1 bg-[#ED145B] hover:bg-[#9b113f] text-white text-sm px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
