import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { loadCartItems } from "../../context/cart/cartSlice";
import CartCard from "./CartCard";

const CartC: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const { isAuthenticated } = useAppSelector((state) => state.user);
  useEffect(() => {
    if(isAuthenticated){
      dispatch(loadCartItems());
    }
  }, [dispatch, cartItems.length]);

  const totalItem = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
      0
  );

  const totalCost = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
  );

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10">
    Your Cart
    </h1>

    {cartItems.length === 0 ? (
      <div className="text-center text-gray-600">Your cart is empty.</div>
    ) : (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">

    {/* Cart Items Container */}
    <div className="flex-1 w-full bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
    {cartItems.map((item) => (
      <div
      key={item.id}
      onClick={() => handleCardClick(item.id)}
      className="cursor-pointer hover:scale-[1.01] transition-transform"
      >
      <CartCard item={item} />
      </div>
    ))}
    </div>

    {/* Cart Summary */}
    <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 sticky top-6 lg:top-24">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Cart Summary
    </h2>
    <div className="space-y-2 text-gray-700 text-sm sm:text-base">
    <p className="flex justify-between">
    <span>Total Items:</span>
    <span className="font-medium">{totalItem}</span>
    </p>
    <p className="flex justify-between">
    <span>Total Amount:</span>
    <span className="font-medium">₹{totalCost.toFixed(2)}</span>
    </p>
    </div>
    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
    Buy Now
    </button>
    </div>
    </div>
    )}
    </div>
  );
};

export default CartC;
