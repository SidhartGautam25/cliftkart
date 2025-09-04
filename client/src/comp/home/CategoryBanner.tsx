// import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryBanner = () => {
  // Helper for background image style
  const bgStyle = (url: string) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: `100% 100%`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });

   const navigate = useNavigate();

  const handleClick = (str:string) => {
    navigate(str);
  };

  return (
    <div className="bg-white w-full">
      {/* Mobile Layout */}
      <div className="block md:hidden w-full px-4 py-2 space-y-2">
        {/* First row */}
        <div
          className="w-full h-32 border-2 border-gray-800 rounded-sm"
          style={bgStyle("/catbanner/groceriesmobile.png")}
        ></div>

        {/* Second row */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className="h-32 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/fashion.png")}
          ></div>
          <div
            className="h-32 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/footwearimg.png")}
          ></div>
        </div>

        {/* Third row */}
        <div className="grid grid-cols-4 gap-2">
          <Link to="/products/watches">
            {" "}
            <div
              className="h-24 border-2 border-gray-800 rounded-sm"
              style={bgStyle("/catbanner/watches.png")}
            ></div>
          </Link>

          <div
            className="h-24 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/b&himg.png")}
          ></div>
          <div
            className="h-24 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/toysimg.png")}
          ></div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block w-full h-[70vh]">
        <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-2 px-4 lg:px-8">
          <div
            className="col-span-4 row-span-6 border-2 border-gray-800 rounded-sm bg-center"
            style={bgStyle("/catbanner/Groceriesdesk.png")}
            onClick={()=>handleClick("/products/groceries")}
          ></div>

          <div
            className="col-span-5 row-span-3 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/fashion.png")}
            onClick={()=>handleClick("/products/fashion")}
          ></div>

          <div
            className="col-span-3 row-span-3 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/footwearimg.png")}
            onClick={()=>handleClick("/products/footwear")}
          ></div>
          
            <div
              className="col-span-3 row-span-3 border-2 border-gray-800 rounded-sm"
              style={bgStyle("/catbanner/watches.png")}
              onClick={()=>handleClick("/products/watches")}
            ></div>
          

          <div
            className="col-span-3 row-span-3 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/b&himg.png")}
            onClick={()=>handleClick("/products/beautyAndHealth")}
          ></div>

          <div
            className="col-span-2 row-span-2 border-2 border-gray-800 rounded-sm"
            style={bgStyle("/catbanner/toysimg.png")}
            onClick={()=>handleClick("/products/sportsAndToys")}
          ></div>

          <div className="col-span-2 row-span-1 rounded-sm bg-[#95295f] flex items-center justify-center">
            <button className="w-full h-full text-white font-semibold text-lg hover:bg-[#c72576] transition duration-200">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
