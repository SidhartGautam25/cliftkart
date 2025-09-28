import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/hooks/order";
import { useNavigate } from "react-router-dom";

// Enhanced Order interface
interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  properties?: {
    size?: string;
    color?: string;
  };
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  deliveredAt?: string;
  shippedAt?: string;
  estimatedDelivery?: string;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  paymentMethod?: string;
  itemsPrice?: number;
  taxPrice?: number;
  shippingPrice?: number;
}

const AllOrders: React.FC = () => {
  const { orders, loading, handleGetAllMyOrders } = useOrder();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllMyOrders();
  }, [handleGetAllMyOrders]);

  // Helper function to get status color and background
  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return {
          text: 'text-green-700',
          bg: 'bg-green-100',
          border: 'border-green-300'
        };
      case 'processing':
        return {
          text: 'text-yellow-700',
          bg: 'bg-yellow-100',
          border: 'border-yellow-300'
        };
      case 'shipped':
        return {
          text: 'text-blue-700',
          bg: 'bg-blue-100',
          border: 'border-blue-300'
        };
      case 'cancelled':
        return {
          text: 'text-red-700',
          bg: 'bg-red-100',
          border: 'border-red-300'
        };
      case 'pending':
        return {
          text: 'text-orange-700',
          bg: 'bg-orange-100',
          border: 'border-orange-300'
        };
      default:
        return {
          text: 'text-gray-700',
          bg: 'bg-gray-100',
          border: 'border-gray-300'
        };
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // Calculate estimated delivery (if not provided)
  const getEstimatedDelivery = (order: Order) => {
    if (order.estimatedDelivery) {
      return formatDate(order.estimatedDelivery);
    }
    
    // If shipped, estimate 2-3 days from ship date
    if (order.shippedAt) {
      const shipped = new Date(order.shippedAt);
      shipped.setDate(shipped.getDate() + 3);
      return formatDate(shipped.toISOString());
    }
    
    // If processing, estimate 5-7 days from order date
    const ordered = new Date(order.createdAt);
    ordered.setDate(ordered.getDate() + 7);
    return formatDate(ordered.toISOString());
  };

  // Filter orders based on selected filter
  const filteredOrders = orders?.filter(order => {
    if (selectedFilter === "all") return true;
    return order.orderStatus.toLowerCase() === selectedFilter.toLowerCase();
  });

  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const hasOrders = filteredOrders && filteredOrders.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filter Options */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {!hasOrders ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {selectedFilter === "all" ? "No orders found" : `No ${selectedFilter} orders`}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedFilter === "all" 
                  ? "Start shopping to see your orders here"
                  : `You don't have any ${selectedFilter} orders`
                }
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {(filteredOrders as Order[]).map(order => {
              const statusStyles = getStatusStyles(order.orderStatus);
              
              return (
                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-6">
                        <div>
                          <p className="text-sm text-gray-600">Order ID</p>
                          <p className="font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-medium text-gray-900">{formatCurrency(order.totalPrice)}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}>
                          {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-8">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
                          <span className="text-gray-600">Ordered</span>
                          <span className="text-xs text-gray-500">{formatDate(order.createdAt)}</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mb-1 ${
                            ['shipped', 'delivered'].includes(order.orderStatus.toLowerCase()) 
                              ? 'bg-green-500' 
                              : order.orderStatus.toLowerCase() === 'processing' 
                                ? 'bg-yellow-500' 
                                : 'bg-gray-300'
                          }`}></div>
                          <span className="text-gray-600">Shipped</span>
                          <span className="text-xs text-gray-500">
                            {order.shippedAt ? formatDate(order.shippedAt) : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mb-1 ${
                            order.orderStatus.toLowerCase() === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-gray-600">Delivered</span>
                          <span className="text-xs text-gray-500">
                            {order.deliveredAt ? formatDate(order.deliveredAt) : `Est. ${getEstimatedDelivery(order)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.orderItems?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                              <span className="text-sm font-medium text-gray-900">{formatCurrency(item.price)}</span>
                              {item.properties?.size && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Size: {item.properties.size}</span>
                              )}
                              {item.properties?.color && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Color: {item.properties.color}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                                  </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
