import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of image URLs
  const images = [
     assets.hero_img, 
    "https://i.postimg.cc/rmF8d2D6/download-We-Resize-com.png",
    "https://i.postimg.cc/BbRsw8Ms/download-We-Resize-com-1.png",
    "https://i.postimg.cc/bwcpxtZ9/download-We-Resize-com-2.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-[550px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden border border-gray-400 mt-[2rem]">
      {/* Slider Container */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
