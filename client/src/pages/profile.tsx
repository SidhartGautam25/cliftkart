import React from "react";
import UserInfo from "../comp/profile/UserInfo";
import OrderHistory from "../comp/profile/OrderHistory";
import CartSection from "../comp/profile/CartSection";
import AdditionalDetails from "../comp/profile/AdditionalDetails";
import ProfilePic from "../comp/profile/ProfilePic";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import { useAppSelector } from "../context/hooks";

// --- Types ---
interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
}




const Profile: React.FC = () => {
  const dummyOrders: Order[] = [
    { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
    { id: "12346", date: "2025-06-15", status: "Shipped", total: "₹890" },
     { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
      { id: "12345", date: "2025-06-24", status: "Delivered", total: "₹1200" },
  ];


    const { cartItems } = useAppSelector((state) => state.cart);
    

 

  return (
    <>
    <Navbar/>
    <div className=" bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="md:col-span-1 space-y-6">
        <ProfilePic  />
        <UserInfo />
      </div>
      <div className="md:col-span-2 space-y-6">
        <OrderHistory orders={dummyOrders} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CartSection items={cartItems} />
          <AdditionalDetails />
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Profile;
