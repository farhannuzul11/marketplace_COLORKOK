import React from 'react';

export const AboutUs = () => {
  return (
    <div className="relative bg-gray-50 py-12">
      <div className="absolute inset-0">
      </div>
      <div className="relative container mx-auto px-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-serif mb-4 text-center text-gray-800">About Us</h1>
        <h2 className="text-2xl font-light mb-4 text-center text-gray-600">Crafting Timeless Elegance</h2>
        <div className="border-b-2 border-gray-300 mb-6 mx-auto w-24"></div>
        <p className="text-lg leading-relaxed font-light text-gray-700 text-center">
          Our brand is built on a passion for exquisite craftsmanship and timeless design. We create pieces that celebrate personal style and poise, using the finest materials and meticulous attention to detail.
        </p>
        <blockquote className="mt-6 text-center text-gray-600 italic">
          "Quality is not an act, it is a habit." - Aristotle
        </blockquote>
      </div>
    </div>
  );
};
