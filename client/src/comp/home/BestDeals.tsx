// components/Popular.tsx
import React from "react";
import useProductFetcher from "../../context/hooks/tagProduct";
import { useNavigate } from "react-router-dom";

const BestDeals: React.FC = () => {

 const {products:allProducts}=useProductFetcher("bestDeals",1);

 const products = allProducts?.slice(0, 4);
 const navigate = useNavigate();

 const goToProduct=(id:string)=>{
    navigate(`/product/${id}`)
    
 }

 console.log("products in popular tag is ",products);

  return (
    <section className="py-6 px-4 md:px-10 bg-gray-50">
      <div className="mb-4 flex items-center justify-between">
        <div className="div">
         <div className="flex items-center mb-4 px-4">
            <span className="w-2 h-7 bg-[#4a1630] mr-2 rounded-sm"></span>
            <h2 className="text-xl md:text-2xl font-semibold">Best Deals</h2>
          </div>
        </div>
 <a
          href="/products/tag/bestDeals"
          className="text-sm text-white bg-[#852555] hover:bg-[#a03a6c] px-4 py-2 rounded-md"
        >
          View All
        </a>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index} className="border rounded-xl p-3 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col gap-2">
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <img
                src={product.image[0]}
                alt={product.name}
                className="object-contain w-full h-full min-h-[180px]"
              />
               {/* {product.badge && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}  */}
            </div>
            <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-blue-600 font-semibold">${product.price}</p>
                {product.price && (
                  <p className="text-gray-400 line-through text-xs">₹{product.price}</p>
                )}
              </div>
              {/* <p className="text-yellow-500 text-xs">⭐ {product.rating}</p> */}
            </div>
            <button className="mt-2 bg-[#ED145B] hover:bg-[#9b113f] text-white text-sm px-4 py-2 rounded"
            onClick={()=>{goToProduct(product._id)}}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
