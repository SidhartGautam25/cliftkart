import React, { useState, useEffect } from "react";
import { useOrder } from "../../../context/hooks/order"; // Adjust the import path to your useOrder hook

// This interface should match the structure of your order objects from the backend
interface Order {
  _id: string;
  createdAt: string;
  orderStatus: string;
  totalPrice: number;
  user?: { name: string }; // Optional user details
  orderItems: { name: string; quantity: number }[];
}

const OrdersComponent: React.FC = () => {
  // State for managing the selected date and current page
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Destructure what we need from the useOrder hook
  const { orders, loading, handleGetOrdersByDate , totalPages} = useOrder();

  // Fetch orders whenever the selected date or page changes
  useEffect(() => {
    if (selectedDate) {
      handleGetOrdersByDate(selectedDate, currentPage);
    }
  }, [selectedDate, currentPage, handleGetOrdersByDate]);

  // --- Helper Functions for UI Formatting ---

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR'
    }).format(amount);
  };

  // --- Pagination Handlers ---

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800">📋 Orders Management</h2>
        <div className="flex items-center gap-2">
            <label htmlFor="order-date" className="text-sm font-medium text-slate-600">Select Date:</label>
            <input 
                type="date" 
                id="order-date"
                value={selectedDate}
                onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setCurrentPage(1); // Reset to first page on new date
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <p>Loading orders...</p>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No orders found for the selected date.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <ul className="divide-y divide-gray-200">
                {(orders as Order[]).map(order => (
                    <li key={order._id} className="py-4 px-2 hover:bg-gray-50 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <p className="font-medium text-slate-800">Order #{order._id.slice(-6)}</p>
                            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-sm text-gray-600">
                           {order.orderItems.map(item => `${item.quantity} x ${item.name}`).join(', ')}
                        </div>
                        <div className="flex justify-start md:justify-center">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                        <p className="font-semibold text-slate-800 text-left md:text-right">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    </li>
                ))}
            </ul>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersComponent;

