import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import Hero from "../comp/hero/Hero";
// import CategorySection from "../comp/home/Category";
// import FlashSale from "../comp/home/flashsale/Flashsale";
import Trending from "../comp/home/Trending";
import Popular from "../comp/home/Popular";
import CategoryBanner from "../comp/home/CategoryBanner";
import BestDeals from "../comp/home/BestDeals";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategoryBanner />
        <Popular />
        <Trending/>
        {/* <FlashSale/> */}
        <BestDeals/>
      
        {/* <CategorySection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
