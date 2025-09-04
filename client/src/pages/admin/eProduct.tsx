import React from "react";

import Footer from "../../comp/footer/Footer";
import Navbar from "../../comp/admin/Navbar";
import EditProductC from "../../comp/admin/EditProduct";


const EditProduct: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <EditProductC/>
     
      <Footer />
    </div>
  );
};

export default EditProduct;
