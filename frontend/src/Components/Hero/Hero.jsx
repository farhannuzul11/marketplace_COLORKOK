import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.jpg"; 

export const Hero = () => {
  return (
    <div className="relative h-screen bg-gray-50">
      <img src={hero_image} alt="Elegant Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-left">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-400 to-black text-transparent bg-clip-text">
          New Arrivals Only!
        </h2>
        <div className="mt-4 flex items-center">
          <p className="text-lg font-light text-gray-700 italic">new</p>
          <img src={hand_icon} alt="Hand Icon" className="ml-2 h-6 w-auto" />
        </div>
        <p className="text-sm font-light text-gray-700 italic">collections for everyone</p>
      </div>
    </div>
  );
};
