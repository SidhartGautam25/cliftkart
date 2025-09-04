import React from "react";
import Left from "./Left";
import Right from "./Right";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-8 bg-white md:h-[450px] px-4">
      {/* Categories at top on mobile */}
      <Left />
      {/* Vertical divider only on md+ */}
      <div className="hidden md:block border-l border-gray-200"></div>
      <Right />
    </section>
  );
};

export default Hero;
