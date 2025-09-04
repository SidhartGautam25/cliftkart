import React from "react";

import Footer from "../../comp/footer/Footer";
import Navbar from "../../comp/admin/Navbar";
import CProductC from "../../comp/admin/CProduct";


const CreateProduct: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <CProductC/>
     
      <Footer />
    </div>
  );
};

export default CreateProduct;
