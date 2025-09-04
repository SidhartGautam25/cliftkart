import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { logout } from "../../context/user/userSlice";
import { clearCart } from "../../context/cart/cartSlice";
import { toast } from "react-toastify";
import logo from "../../../public/cliftkart_logo.png";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearCart());
      setIsDropdownOpen(false);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-800 tracking-tight"
        >
          <img
            src={logo}
            alt="Cliftkart Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-[#852555]">Cliftkart</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-4 pr-10 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a1630] placeholder-gray-400"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Wishlist */}
          <button className="p-1 hover:bg-gray-100 rounded-full" aria-label="Wishlist">
            <FaHeart className="text-xl text-gray-700" />
          </button>

          {/* Cart */}
          {isAuthenticated ? (
<a href="/cart" className="p-1 hover:bg-gray-100 rounded-full" aria-label="Cart">
            <FaShoppingCart className="text-xl text-gray-700" />
          </a>
          ):(<></>)}

          {/* Auth Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="p-1 hover:bg-gray-100 rounded-full focus:outline-none"
                aria-label="User menu"
              >
                <FaUser className="text-xl text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#852555] hover:bg-[#983868] text-white px-4 py-2 rounded-md text-sm transition"
              >
                Login
              </button>
            )}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-100 text-gray-700"
                >
                  <FaUserCircle className="mr-3 text-lg" />
                  Profile
                </button>
                <button
                  className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-100 text-gray-700"
                >
                  <FaQuestionCircle className="mr-3 text-lg" />
                  Help
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-100 text-gray-700"
                >
                  <FaSignOutAlt className="mr-3 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a1630] placeholder-gray-400"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex space-x-6">
            <button className="p-1 hover:bg-gray-100 rounded-full" aria-label="Wishlist">
              <FaHeart className="text-xl text-gray-700" />
            </button>
            <a href="/cart" className="p-1 hover:bg-gray-100 rounded-full" aria-label="Cart">
              <FaShoppingCart className="text-xl text-gray-700" />
            </a>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/profile")}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Profile"
              >
                <FaUser className="text-xl text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#852555] hover:bg-[#983868] text-white px-4 py-2 rounded-md text-sm transition w-full text-center"
              >
                Login
              </button>
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
