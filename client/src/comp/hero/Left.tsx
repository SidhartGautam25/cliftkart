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
              className="flex justify-between items-center cursor-pointer hover:text-black hover:font-medium transition"
            >
              <a href={`/products/${item.str}`} className="flex-1">
                {item.name}
              </a>
              <FaChevronRight className="text-sm ml-2" />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Left;