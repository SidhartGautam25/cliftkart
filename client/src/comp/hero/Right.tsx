import React, { useState, useEffect } from "react";

const Right: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { content: <img src="product_img/salesbanner6.avif" alt="banner" className="w-full h-full object-cover" /> },
    { content: <img src="product_img/salesbanner5.jpg" alt="banner" className="w-full h-full object-cover" /> },
        { content: <img src="product_img/salesbanner6.avif" alt="banner" className="w-full h-full object-cover" /> },
    { content: <img src="product_img/salesbanner2.avif" alt="banner" className="w-full h-full object-cover" /> },
        { content: <img src="product_img/salesbanner6.avif" alt="banner" className="w-full h-full object-cover" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full md:w-3/4 lg:w-4/5 relative h-60 md:h-[450px]">
      <div className="w-full h-full relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.content}
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-red-500" : "bg-white bg-opacity-70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;
