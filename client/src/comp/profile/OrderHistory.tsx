// import React from "react";

// interface Order {
//   id: string;
//   date: string;
//   status: string;
//   total: string;
// }

// const OrderHistory: React.FC<{ orders: Order[] }> = ({ orders }) => {
  
//   // Filter orders by status
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'text-green-600';
//       case 'pending':
//         return 'text-yellow-600';
//       case 'cancelled':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Check if orders exist
//   const hasOrders = orders && orders.length > 0;

//   return (
//     <div className="bg-white shadow rounded-xl p-4 col-span-2">
//       <h2 className="text-lg font-semibold mb-2">Order History</h2>
      
//       {!hasOrders ? (
//         <div className="text-center py-8 text-gray-500">
//           <p>No orders found</p>
//         </div>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {orders.map(order => (
//             <li key={order.id} className="py-2">
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-medium">Order #{order.id}</p>
//                   <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </p>
//                   <p className="font-semibold">{order.total}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;


import React, { useEffect } from "react";
import { useOrder } from "../../context/hooks/order";

// This interface can be expanded to match the full IOrder structure if needed
interface Order {
  _id: string;
  createdAt: string;
  orderStatus: string;
  totalPrice: number;
}

const OrderHistory: React.FC = () => {
  const { orders, loading, handleGetAllMyOrders } = useOrder();

  useEffect(() => {
    // Fetch orders when the component mounts
    handleGetAllMyOrders();
  }, [handleGetAllMyOrders]);

  // Helper function to determine the color for the order status
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600';
      case 'processing':
        return 'text-yellow-600';
      case 'shipped':
          return 'text-blue-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Helper function to format the date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to format the price into a currency string
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
  }

  const hasOrders = orders && orders.length > 0;

  return (
    <div className="bg-white shadow rounded-xl p-4 md:p-6 col-span-2">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Order History</h2>
      
      {loading ? (
        <div className="text-center py-8 text-gray-500">
          <p>Loading your orders...</p>
        </div>
      ) : !hasOrders ? (
        <div className="text-center py-8 text-gray-500">
          <p>No orders found</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {(orders as Order[]).map(order => (
            <li key={order._id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-700">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </p>
                  <p className="font-semibold text-slate-800">{formatCurrency(order.totalPrice)}</p>
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


