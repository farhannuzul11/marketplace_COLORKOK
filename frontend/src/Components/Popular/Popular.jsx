import React, { useState, useEffect } from 'react';
import { Item } from "../Item/Item";
import { toast } from 'react-toastify';

export const Popular = () => {
  const [bgColor, setBgColor] = useState('bg-white');
  const [itemShop, setItemShop] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/item`);
      const result = await response.json();
      setItemShop(result);
    } catch (err) {
      toast.error("Error fetching data")
    }
  }

  useEffect(()=> {
    fetchData();
  }, []);

  useEffect(() => {
    const changeColorOnScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 150) setBgColor('bg-white');
      else if (scrollPosition < 300) setBgColor('bg-gray-100'); 
      else if (scrollPosition < 450) setBgColor('bg-gray-200');
      else setBgColor('bg-gray-300');
    };

    window.addEventListener('scroll', changeColorOnScroll);
    return () => window.removeEventListener('scroll', changeColorOnScroll);
  }, []);

  return (
    <div className={`${bgColor} transition-colors duration-500 ease-in-out py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {itemShop && itemShop.map((item, index) => (
            <Item key={index} {...item} className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"/>
          ))}
        </div>
      </div>
    </div>
  );
};
