
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderFailurePage: React.FC = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        // Navigate back to the checkout page to let the user try again
        navigate('/checkout');
    };

    const handleGoHome = () => {
        // Navigate back to the homepage
        navigate('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
                
                {/* Failure Icon */}
                <div className="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                    <svg 
                        className="w-12 h-12 text-red-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">Something Went Wrong</h1>
                <p className="text-gray-600 mb-8">
                    We were unable to process your order at this time. Please check your payment information and try again.
                </p>

                {/* Error Details Placeholder */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                    <p className="text-sm text-red-700 font-semibold">Error Details:</p>
                    <p className="text-sm text-red-600 mt-1">
                        Your payment could not be authorized. Please use a different payment method.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleTryAgain}
                        className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out"
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderFailurePage;
