import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import ProductsTagC from "../comp/products/ProductTagC";

const ProductsByTag: React.FC = () => {
  return <div>
    <Navbar/>
    <ProductsTagC/>
    <Footer />

  </div>;
};

export default ProductsByTag;
