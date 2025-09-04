import React from "react";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
}

const OrderHistory: React.FC<{ orders: Order[] }> = ({ orders }) => {
  
  // Filter orders by status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if orders exist
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="bg-white shadow rounded-xl p-4 col-span-2">
      <h2 className="text-lg font-semibold mb-2">Order History</h2>
      
      {!hasOrders ? (
        <div className="text-center py-8 text-gray-500">
          <p>No orders found</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map(order => (
            <li key={order.id} className="py-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                  <p className="font-semibold">{order.total}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;