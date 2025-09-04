import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import ProductsC from "../comp/products/Products";

const Products: React.FC = () => {
  return <div>
    <Navbar/>
    <ProductsC/>
    <Footer />

  </div>;
};

export default Products;
