import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    const handleTrackOrder = () => {
        // Navigate to the user's order history or a specific order details page
        navigate('/orders');
    };

    const handleContinueShopping = () => {
        // Navigate back to the homepage or products page
        navigate('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
                
                {/* Success Icon */}
                <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                    <svg
                        className="w-12 h-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. You will receive an email confirmation shortly with your order details.
                </p>
                
                {/* Order Details Placeholder */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-left">
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold text-gray-800 tracking-wider">#123-4567890</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleTrackOrder}
                        className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md"
                    >
                        Track Your Orders
                    </button>
                    <button
                        onClick={handleContinueShopping}
                        className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out"
                    >
                        Continue Shopping
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccessPage;

