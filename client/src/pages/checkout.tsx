
import { ShieldCheck, ChevronLeft } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutState {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

const mockState = {
  cart: {
    cartItems: [
      { id: '1', name: 'Premium Leather Wallet', price: 99.99, quantity: 2, image: 'https://placehold.co/100x100/A5D6A7/000000?text=Item+1' },
      { id: '2', name: 'Wireless Bluetooth Headphones', price: 49.50, quantity: 1, image: 'https://placehold.co/100x100/81D4FA/000000?text=Item+2' },
    ],
  },
  user: {
    isAuthenticated: true, // Set to true to simulate a logged-in user
    address: {
        name: "Ravi Kumar",
        line1: "#123, Silicon Avenue, Electronic City",
        city: "Bengaluru",
        zip: "560100",
        country: "India"
    },
    phone: "+91 98765 43210"
  },
};

const { cartItems } = mockState.cart;
//  const { isAuthenticated } = mockState.user;

  // In a real app with Redux, you would use dispatch and useEffect here.
  // We'll keep it simple for this simulation.

  //const totalItem = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totalCost = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);


 const orderDetails: CheckoutState = {
      items: cartItems,
      subtotal: totalCost,
      shipping: 5.00,
      tax: totalCost * 0.18, // 18% GST example
      total: totalCost + 5.00 + (totalCost * 0.18),
    };


// The main checkout page component
const CheckoutPage: React.FC = () => {
      const { address, phone } = mockState.user;
      function navigateToCart(){

      }
   
    return (
       <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-center mb-6">
                        <button onClick={navigateToCart} className="p-2 rounded-full hover:bg-slate-100 mr-4">
                            <ChevronLeft size={24} className="text-slate-600" />
                        </button>
                        <h1 className="text-3xl font-bold text-slate-800">Confirm Order</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* --- Left Column: Shipping & Contact --- */}
                       <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-xl font-semibold text-slate-700">Shipping to</h2>
                                    <button onClick={() => alert('Change address functionality not implemented.')} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                        Change Address
                                    </button>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <p className="font-bold text-slate-800">{address.name}</p>
                                    <p className="text-slate-600">{address.line1}</p>
                                    <p className="text-slate-600">{address.city}, {address.zip}</p>
                                    <p className="text-slate-600">{address.country}</p>
                                </div>
                            </div>
                             <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-xl font-semibold text-slate-700">Contact Number</h2>
                                    <button onClick={() => alert('Change mobile number functionality not implemented.')} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                        Change Mobile Number
                                    </button>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <p className="font-bold text-slate-800">{phone}</p>
                                </div>
                            </div>
                        </div>                        {/* --- Right Column: Order Summary --- */}
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col">
                           <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-3">Order Summary</h2>
                            <div className="space-y-3 text-slate-600 flex-grow">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{orderDetails.subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>₹{orderDetails.shipping.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Tax (GST)</span><span>₹{orderDetails.tax.toFixed(2)}</span></div>
                                <div className="border-t border-slate-200 my-3"></div>
                                <div className="flex justify-between text-lg font-bold text-slate-800"><span>Total</span><span>₹{orderDetails.total.toFixed(2)}</span></div>
                            </div>
                             <button
                                 // onClick={onPlaceOrder}
                                className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
                            >
                                Confirm Order (Cash on Delivery)
                            </button>
                            <div className="flex items-center justify-center mt-4 text-sm text-slate-500">
                                <ShieldCheck size={16} className="mr-2 text-green-500" />
                                <span>You can pay upon delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    );
};

export default CheckoutPage;
