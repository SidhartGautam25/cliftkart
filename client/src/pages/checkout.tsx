//import { ShieldCheck, ChevronLeft } from 'lucide-react';
//import {useNavigate} from 'react-router-dom';
//import {useAppDispatch, useAppSelector} from '../context/hooks';
//import {useEffect, useState} from 'react';
//import {loadCartItems} from '../context/cart/cartSlice';
//import {useProfile} from '../context/hooks/profile';

//interface CartItem {
//  id: string;
//  name: string;
//  price: number;
//  quantity: number;
//  image: string;
//}

//interface CheckoutState {
//    items: CartItem[];
//    subtotal: number;
//    shipping: number;
//    tax: number;
//    total: number;
//}

//const mockState = {
//  cart: {
//    cartItems: [
//      { id: '1', name: 'Premium Leather Wallet', price: 99.99, quantity: 2, image: 'https://placehold.co/100x100/A5D6A7/000000?text=Item+1' },
//      { id: '2', name: 'Wireless Bluetooth Headphones', price: 49.50, quantity: 1, image: 'https://placehold.co/100x100/81D4FA/000000?text=Item+2' },
//    ],
//  },
//  user: {
//    isAuthenticated: true, // Set to true to simulate a logged-in user
//    address: {
//        name: "Ravi Kumar",
//        line1: "#123, Silicon Avenue, Electronic City",
//        city: "Bengaluru",
//        zip: "560100",
//        country: "India"
//    },
//    phone: "+91 98765 43210"
//  },
//};

//const { cartItems } = mockState.cart;
////  const { isAuthenticated } = mockState.user;

//  // In a real app with Redux, you would use dispatch and useEffect here.
//  // We'll keep it simple for this simulation.

//  //const totalItem = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
//  const totalCost = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);


// const orderDetails: CheckoutState = {
//      items: cartItems,
//      subtotal: totalCost,
//      shipping: 5.00,
//      tax: totalCost * 0.18, // 18% GST example
//      total: totalCost + 5.00 + (totalCost * 0.18),
//    };


//// The main checkout page component
//const CheckoutPage: React.FC = () => {
//      const { address, phone } = mockState.user;
//      function navigateToCart(){

//      }


//        const navigate = useNavigate();
//        const dispatch = useAppDispatch();
//        const { cartItems } = useAppSelector((state) => state.cart);
//        console.log("cartItems in the cart page is ",cartItems);
//        const { isAuthenticated } = useAppSelector((state) => state.user);
//        useEffect(() => {
//            if(isAuthenticated){
//               dispatch(loadCartItems());
//            }
//        }, [dispatch, cartItems.length]);

//        const totalItem = cartItems.reduce(
//              (acc, item) => acc + Number(item.quantity),
//             0
//        );

//        const totalCost = cartItems.reduce(
//            (acc, item) => acc + Number(item.price) * Number(item.quantity),
//             0
//        );

//        const handleCardClick = (id: string) => {
//            navigate(`/product/${id}`);
//        };

//          const { getPhone, getAddress, handleAddPhone, handleAddAddress, loading } = useProfile();
  
//  const [showAllPhones, setShowAllPhones] = useState(false);
//  const [showAllAddresses, setShowAllAddresses] = useState(false);
//  const [showPhoneForm, setShowPhoneForm] = useState(false);
//  const [showAddressForm, setShowAddressForm] = useState(false);
  
//  const [newPhone, setNewPhone] = useState('');
//  const [newAddress, setNewAddress] = useState({ pin: '', other: '' });

//  const phones = getPhone();
//  const addresses = getAddress();

//  const handleSavePhone = () => {
//    if (newPhone.trim()) {
//      handleAddPhone(newPhone.trim());
//      setNewPhone('');
//      setShowPhoneForm(false);
//    }
//  };

//  const handleSaveAddress = () => {
//    if (newAddress.pin.trim() && newAddress.other.trim()) {
//      handleAddAddress({
//        pin: newAddress.pin.trim(),
//        other: newAddress.other.trim()
//      });
//      setNewAddress({ pin: '', other: '' });
//      setShowAddressForm(false);
//    }
//  };

//  console.log("phones are ",phones);
//  const displayedPhones = showAllPhones ? phones : phones.slice(0, 1) || [];
//  console.log("displayed phones are ",displayedPhones);
 
//  const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 1) || [];








   
//    return (
//       <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
//            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
//                <div className="p-6 md:p-8">
//                    <div className="flex items-center mb-6">
//                        <button onClick={navigateToCart} className="p-2 rounded-full hover:bg-slate-100 mr-4">
//                            <ChevronLeft size={24} className="text-slate-600" />
//                        </button>
//                        <h1 className="text-3xl font-bold text-slate-800">Confirm Order</h1>
//                    </div>
//                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                        {/* --- Left Column: Shipping & Contact --- */}
//                       <div className="space-y-6">
//                            <div>
//                                <div className="flex justify-between items-center mb-3">
//                                    <h2 className="text-xl font-semibold text-slate-700">Shipping to</h2>
//                                    <button onClick={() => alert('Change address functionality not implemented.')} className="text-sm font-medium text-blue-600 hover:text-blue-800">
//                                        Change Address
//                                    </button>
//                                </div>
//                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
//                                    {/* --- FIX: Map over the addresses array to render each part --- */}
//                                    {displayedAddresses.map((addr, index) => (
//                                        <div key={index} className="text-slate-700">
//                                            <p className="font-bold text-slate-800">{addr.other}</p>
//                                            <p>Pincode: {addr.pin}</p>
//                                        </div>
//                                    ))}
//                                </div>
//                            </div>
//                             <div>
//                                <div className="flex justify-between items-center mb-3">
//                                    <h2 className="text-xl font-semibold text-slate-700">Contact Number</h2>
//                                    <button onClick={() => alert('Change mobile number functionality not implemented.')} className="text-sm font-medium text-blue-600 hover:text-blue-800">
//                                        Change Mobile Number
//                                    </button>
//                                </div>
//                                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
//                                     {/* --- FIX: Map over the phones array to render each one --- */}
//                                    {displayedPhones.map((phone, index) => (
//                                        <p key={index} className="font-bold text-slate-800">{phone}</p>
//                                    ))}
//                                </div>
//                            </div>
//                        </div>                        {/* --- Right Column: Order Summary --- */}
//                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col">
//                           <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-3">Order Summary</h2>
//                            <div className="space-y-3 text-slate-600 flex-grow">
//                                <div className="flex justify-between"><span>Subtotal</span><span>₹{orderDetails.subtotal.toFixed(2)}</span></div>
//                                <div className="flex justify-between"><span>Shipping</span><span>₹{orderDetails.shipping.toFixed(2)}</span></div>
//                                <div className="flex justify-between"><span>Tax (GST)</span><span>₹{orderDetails.tax.toFixed(2)}</span></div>
//                                <div className="border-t border-slate-200 my-3"></div>
//                                <div className="flex justify-between text-lg font-bold text-slate-800"><span>Total</span><span>₹ {totalCost}</span></div>
//                            </div>
//                             <button
//                                 // onClick={onPlaceOrder}
//                                className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
//                            >
//                                Confirm Order (Cash on Delivery)
//                            </button>
//                            <div className="flex items-center justify-center mt-4 text-sm text-slate-500">
//                                <ShieldCheck size={16} className="mr-2 text-green-500" />
//                                <span>You can pay upon delivery</span>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>    );
//};

//export default CheckoutPage;

import React, { useEffect, useState } from 'react';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/hooks'; // Assuming this is your hooks file path
import { loadCartItems } from '../context/cart/cartSlice'; // Assuming this is your cart slice path
import { useProfile } from '../context/hooks/profile'; // Assuming this is your profile hook path
import { useOrder } from '../context/hooks/order'; // Assuming this is your order hook path

// Define types for address for clarity
interface Address {
    pin: string;
    other: string;
    city?: string;
    state?: string;
    country?: string;
}

// --- The main checkout page component ---
const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // --- State from Redux and Custom Hooks ---
    const { cartItems } = useAppSelector((state) => state.cart);
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const { getPhone, getAddress } = useProfile();
    const { handleCreateOrder, loading: orderLoading } = useOrder();
    
    const phones: string[] = getPhone();
    const addresses: Address[] = getAddress();

    // --- Component State ---
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

    // --- Effects ---
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadCartItems());
        }
    }, [dispatch, isAuthenticated]);

    // Set default selected address and phone when data loads
    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
        if (phones.length > 0 && !selectedPhone) {
            setSelectedPhone(phones[0]);
        }
    }, [addresses, phones, selectedAddress, selectedPhone]);

    // --- Calculations ---
    const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
    const shippingPrice = 5.00;
    const taxPrice = subtotal * 0.18; // 18% GST example
    const totalPrice = subtotal + shippingPrice + taxPrice;

    // --- Event Handlers ---
    const onPlaceOrder = async () => {
        if (!selectedAddress || !selectedPhone) {
            // In a real app, you'd use a toast or a more elegant notification
            alert("Please select a shipping address and phone number.");
            return;
        }

        const orderData = {
            shippingInfo: {
                address: selectedAddress.other,
                city: selectedAddress.city || "N/A",
                state: selectedAddress.state || "N/A",
                country: selectedAddress.country || "N/A",
                pinCode: Number(selectedAddress.pin),
                phoneNo: Number(selectedPhone.replace(/\D/g, '')),
            },
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
               // image: item.image,
                product: item.id,
            })),
            paymentInfo: {
                id: `cod-${Date.now()}`,
                status: 'Pending',
            },
            itemPrice: subtotal,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: new Date(),
        };

        await handleCreateOrder(orderData);
    };
    
    // --- Render Logic ---
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                            <button onClick={() => navigate('/cart')} className="p-2 rounded-full hover:bg-slate-100 mr-4">
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
                                        <button onClick={() => setIsAddressModalOpen(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                            Change Address
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700">
                                        {selectedAddress ? (
                                            <div>
                                                <p className="font-bold text-slate-800">{selectedAddress.other}</p>
                                                <p>Pincode: {selectedAddress.pin}</p>
                                            </div>
                                        ) : <p>No address selected.</p>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-xl font-semibold text-slate-700">Contact Number</h2>
                                        <button onClick={() => setIsPhoneModalOpen(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                            Change Mobile Number
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <p className="font-bold text-slate-800">{selectedPhone || "No phone selected."}</p>
                                    </div>
                                </div>
                            </div>
                            {/* --- Right Column: Order Summary --- */}
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col">
                                <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-3">Order Summary</h2>
                                <div className="space-y-3 text-slate-600 flex-grow">
                                    <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span>₹{shippingPrice.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Tax (GST)</span><span>₹{taxPrice.toFixed(2)}</span></div>
                                    <div className="border-t border-slate-200 my-3"></div>
                                    <div className="flex justify-between text-lg font-bold text-slate-800"><span>Total</span><span>₹{totalPrice.toFixed(2)}</span></div>
                                </div>
                                <button
                                    onClick={onPlaceOrder}
                                    disabled={orderLoading}
                                    className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {orderLoading ? 'Processing...' : 'Confirm Order (Cash on Delivery)'}
                                </button>
                                <div className="flex items-center justify-center mt-4 text-sm text-slate-500">
                                    <ShieldCheck size={16} className="mr-2 text-green-500" />
                                    <span>You can pay upon delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals for Selection --- */}
            {isAddressModalOpen && (
                <SelectionModal
                    title="Select Address"
                    items={addresses}
                    displayKey="other"
                    onClose={() => setIsAddressModalOpen(false)}
                    onSelect={(item) => {
                        setSelectedAddress(item);
                        setIsAddressModalOpen(false);
                    }}
                />
            )}
            {isPhoneModalOpen && (
                <SelectionModal
                    title="Select Phone Number"
                    items={phones}
                    onClose={() => setIsPhoneModalOpen(false)}
                    onSelect={(item) => {
                        setSelectedPhone(item);
                        setIsPhoneModalOpen(false);
                    }}
                />
            )}
        </>
    );
};

// --- Generic Selection Modal Component ---
interface SelectionModalProps<T> {
    title: string;
    items: T[];
    displayKey?: keyof T;
    onClose: () => void;
    onSelect: (item: T) => void;
}

const SelectionModal = <T,>({ title, items, displayKey, onClose, onSelect }: SelectionModalProps<T>) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {items.map((item, index) => (
                        <div key={index} onClick={() => onSelect(item)} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer border">
                            {displayKey && item && typeof item === 'object' ? String(item[displayKey]) : String(item)}
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="mt-4 w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;


