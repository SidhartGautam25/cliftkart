import React from "react";
import AllOrders from "../comp/orders/AllOrders";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";

// Enhanced Order interface
const OrdersPage: React.FC = () => {
  

  return (
    <div>
    <Navbar/>
       <AllOrders/> 
    <Footer/>
    </div>

       );
};

export default OrdersPage;
