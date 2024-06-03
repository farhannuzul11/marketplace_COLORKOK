import React from "react";
import { Link } from "react-router-dom";

export const Item = ({ _id, item_name, item_image, new_price, old_price }) => {
  return (
    <Link to={`/${_id}`} className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-out transform hover:scale-110 hover:shadow-2xl">
      <img src={item_image} alt={item_name} className="w-full h-64 object-contain" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item_name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm line-through">${old_price}</p>
          <p className="text-lg text-red-600 font-bold">${new_price}</p>
        </div>
      </div>
    </Link>
  );
};
