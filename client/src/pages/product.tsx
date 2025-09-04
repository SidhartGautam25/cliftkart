import React from "react";
import ProductImages from "../comp/product/ProductImages";
import ProductInfo from "../comp/product/ProductInfo";
import RelatedItems from "../comp/product/RelatedItems";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import { useAppSelector } from "../context/hooks";


const Product: React.FC = () => {

 
   const { product } = useAppSelector((state) => state.product);
      

      

     

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8">
        <ProductImages />
        <ProductInfo />
      </div>
      <RelatedItems cat={product?.category} id={product?.id}/>
      <Footer />
    </>
  );
};

export default Product;
