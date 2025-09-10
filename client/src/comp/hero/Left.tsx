import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { categories } from "../../utils/categories";

const Left: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-gray-200 p-4 flex flex-col md:h-[450px]">
      {/* Header with toggle icon for mobile */}
      <div className="flex justify-between items-center md:block">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <button
          onClick={toggleCategories}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle Categories"
        >
          {isOpen ? (
            <FaChevronDown className="text-base" />
          ) : (
            <FaChevronRight className="text-base" />
          )}
        </button>
      </div>

      {/* Categories list - visible on md+, toggle on mobile */}
      <div
        className={`flex-1 overflow-y-auto scrollbar-hide mt-4 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="space-y-3 text-base text-gray-700">
          {categories.map((item, index) => (
  <li
    key={index}
    // Added padding and a subtle hover background for better interaction
    className="flex justify-between items-center cursor-pointer rounded-lg hover:bg-gray-100 transition"
  >
    {/* This link now uses flexbox to align the image and text */}
    <a href={`/products/${item.str}`} className="flex items-center gap-3 flex-1">
      {/* 1. Image section added */}
      <img
        src={item.image}
        alt={item.name} // Alt text is important for accessibility
        className="w-6 h-6 object-cover rounded-full" // Styling for a circular image
      />
      {/* 2. Name is wrapped in a span for better control */}
      <span className="font-medium text-gray-700 group-hover:text-black">
        {item.name}
      </span>
    </a>
    <FaChevronRight className="text-sm ml-2 text-gray-400" />
  </li>
))}
        </ul>
      </div>
    </aside>
  );
};

export default Left;
