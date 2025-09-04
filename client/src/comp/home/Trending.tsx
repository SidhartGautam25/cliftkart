import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import useProductFetcher from "../../context/hooks/tagProduct";
import { useNavigate } from "react-router-dom";



const TrendingNow: React.FC = () => {
  const { products: allProducts } = useProductFetcher("trending", 1);
  const products = allProducts?.slice(0, 6);
  console.log("products in popular tag is ", products);
  const navigate = useNavigate();
  const goToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header: always row layout */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center px-4">
          <span className="w-2 h-7 bg-[#4a1630] mr-2 rounded-sm"></span>
          <h2 className="text-xl md:text-2xl font-semibold">Trending Now</h2>
        </div>
        <a
          href="/products/tag/trending"
          className="text-sm text-white bg-[#852555] hover:bg-[#a03a6c] px-4 py-2 rounded-md"
        >
          View All
        </a>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Promo Banner */}
        <div className="bg-[#ffea4f] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between text-center md:text-left">
          <div>
            <p className="text-sm text-[#ED145B] font-semibold mb-2">
              Hurry Up!
            </p>
            <h3 className="text-lg md:text-xl font-bold leading-snug">
              Year Ending Sale Up
              <br /> To <span className="text-[#3742fa]">70% Off!</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Explore our exclusive sale on cutting-edge electronic devices.
            </p>
          </div>
          <button className="mt-6 bg-[#00bfff] hover:bg-[#009acd] text-white px-4 py-2 rounded-md text-sm w-fit mx-auto md:mx-0">
            Shop Now
          </button>
        </div>

        {/* Product Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                goToProduct(product._id);
              }}
              className="border rounded-xl p-3 sm:p-4 bg-white relative hover:shadow-md transition text-center sm:text-left"
            >
              {/* Wishlist Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-pink-500"
                title="Add to Wishlist"
              >
                <FaHeart />
              </button>

              {/* Product Image */}
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-32 sm:h-40 object-contain mb-4"
              />

              {/* Product Info */}
              <h4 className="text-sm font-medium mb-1">{product.name}</h4>
              <div className="flex justify-center sm:justify-start items-center text-sm text-gray-700 space-x-2 mb-1">
                <span className="text-[#ED145B] font-semibold">
                  ${product.price}
                </span>
                {/* <span className="line-through text-gray-400 text-xs">
                  ${product.price}
                </span> */}
              </div>

              {/* Rating */}
              <div className="flex justify-center sm:justify-start items-center text-yellow-400 text-xs mb-2">
                <FaStar className="mr-1" />
                {product.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
