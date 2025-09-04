import React, { useRef } from "react";
import {
  MdPhoneIphone,
  MdComputer,
  MdWatch,
  MdCameraAlt,
  MdHeadset,
  MdGames,
} from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const categories = [
  { label: "Phones", icon: <MdPhoneIphone className="text-blue-700" size={28} /> },
  { label: "Computers", icon: <MdComputer className="text-purple-700" size={28} /> },
  { label: "SmartWatch", icon: <MdWatch className="text-pink-600" size={28} /> },
  { label: "Camera", icon: <MdCameraAlt className="text-yellow-600" size={28} /> },
  { label: "Headphones", icon: <MdHeadset className="text-green-600" size={28} /> },
  { label: "Gaming", icon: <MdGames className="text-red-500" size={28} /> },
  { label: "Phones", icon: <MdPhoneIphone className="text-blue-700" size={28} /> },
  { label: "Computers", icon: <MdComputer className="text-purple-700" size={28} /> },
  { label: "SmartWatch", icon: <MdWatch className="text-pink-600" size={28} /> },
];

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -240 : 240,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Scroll Buttons */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border shadow hover:bg-gray-100 rounded-full z-10 flex items-center justify-center"
          >
            <FaArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border shadow hover:bg-gray-100 rounded-full z-10 flex items-center justify-center"
          >
            <FaArrowRight size={18} />
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto py-4 px-6 scrollbar-hide scroll-smooth"
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-xl bg-gray-50 hover:bg-blue-50 hover:shadow-lg transition duration-300 border flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <div className="mb-2 p-3 bg-white rounded-full shadow-md">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;