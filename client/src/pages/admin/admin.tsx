import React from "react";
import Navbar from "../../comp/navbar/Navbar";
import Footer from "../../comp/footer/Footer";
import DashboardC from "../../comp/admin/Dashboard";


const AdminHome: React.FC = () => {
  return (
    <div>
      <Navbar/>
     <DashboardC/>
      <Footer />
    </div>
  );
};

export default AdminHome;
