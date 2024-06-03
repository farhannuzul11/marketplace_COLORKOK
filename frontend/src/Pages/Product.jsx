import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams(); //Getting the object's attribute from useParam() function.
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [itemDetail, setItemDetail] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/item/${productId}`
    );
    const result = await response.json();
    setItemDetail(result);
  };

  useEffect(() => {
    let user = localStorage.getItem("user")
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
    fetchData();
  }, []);

  const addData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
      // object
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // [BE]:[FE], dont forget to change the userId
      body: JSON.stringify({ userId: user._id, item_id: productId, quantity: quantity, size: selectedSize}),
    });
    await fetchData();
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };
  

  return itemDetail ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg space-y-4">
          <img
            src={itemDetail.item_image}
            alt={itemDetail.item_name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            {itemDetail.item_name}
          </h1>
          <div className="flex justify-between items-center">
            <p className="text-2xl text-red-500 font-bold">
              ${itemDetail.new_price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-500 line-through">
              ${itemDetail.old_price.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {itemDetail.description || "No description available."}
          </p>
          <div>
            <strong>Select Size:</strong>
            <div className="flex space-x-1 mt-1">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`py-1 px-2 text-sm border ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <button
              className="px-2 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              className="px-2 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <button
            className="mt-2 w-full bg-blue-600 text-white py-2 text-sm rounded hover:bg-blue-700"
            disabled={quantity === 0}
            onClick={async () => {
              await addData();
              navigate("/");
              toast.success("Added product to cart.");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">Product not found</div>
    </div>
  );
};

export default Product;
