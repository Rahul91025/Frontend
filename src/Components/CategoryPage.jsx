import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CategoryPage = () => {
  const categories = [
    {
      name: "Footwear",
      imgSrc:
        "https://images.meesho.com/images/marketing/1631536034339_100.webp",
    },
    {
      name: "Winter Collection",
      imgSrc:
        "https://images.meesho.com/images/products/442460158/di2dj_512.webp",
    },
    {
      name: "Kurti & Dress",
      imgSrc:
        "https://images.meesho.com/images/marketing/1649688502928_100.webp",
    },
    {
      name: "Kids",
      imgSrc:
        "https://images.meesho.com/images/marketing/1649689217815_100.webp",
    },
    {
      name: "Western Wear",
      imgSrc:
        "https://images.meesho.com/images/marketing/1649690440106_100.webp",
    },
    {
      name: "Home",
      imgSrc:
        "https://images.meesho.com/images/marketing/1670479134713_100.webp",
    },
    {
      name: "Men Clothing",
      imgSrc:
        "https://images.meesho.com/images/marketing/1689675132726_100.webp",
    },
    {
      name: "Beauty",
      imgSrc:
        "https://images.meesho.com/images/marketing/1651505214223_100.webp",
    },
    {
      name: "Kitchen",
      imgSrc:
        "https://images.meesho.com/images/marketing/1600969398161_100.webp",
    },
    {
      name: "Sarees",
      imgSrc:
        "https://images.meesho.com/images/marketing/1628672353857_100.webp",
    },
  ];

  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine categories to show based on screen size
  const displayedCategories =
    windowWidth < 768 ? categories.slice(1, 9) : categories.slice(0, 10);

  return (
    <div className="bg-white p-6 mt-[2rem]">
      {/* Container for the category list */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
        {displayedCategories.map((category, index) => (
          <NavLink
            to="/collection"
            key={index}
            className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {/* Circular image with hover effect */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-pink-400 mb-4"
              style={{
                boxShadow: "0 0 15px 4px rgba(255, 182, 193, 0.6)",
              }}
            >
              <img
                src={category.imgSrc}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Category name */}
            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {category.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
