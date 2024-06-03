import React, { useEffect, useState } from "react";
import { AboutUs } from "../Components/AboutUs/AboutUs"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${itemId}/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await fetchCartItems();
        toast.success("Successfully removed item from cart.")
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCart = async (itemId, quantity, newSize) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, item_id: itemId, quantity, size: newSize }),
        }
      );
      if (response.ok) {
        await fetchCartItems();
      } else {
        console.error("Failed to update item in cart");
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const checkout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCartItems([]);
        toast.success("Successfully checkout.");
        navigate("/");
      } else {
        console.error("Failed to checkout");
      }
    } catch (error) {
      console.error("Error checkout:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems &&
          cartItems.map((item) => (
            <div
              key={item.item_id._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={item.item_id.item_image}
                alt={item.item_id.item_name}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {item.item_id.item_name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Price: ${item.item_id.new_price}
                </p>
                <p className="text-gray-600 mb-2">Size: {item.size}</p>
                <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>

                <div className="flex items-center mb-4">
                  <button
                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded-l"
                    onClick={() =>
                      updateCart(item.item_id._id, item.quantity - 1, item.size)
                    }
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded-r"
                    onClick={() =>
                      updateCart(item.item_id._id, item.quantity + 1, item.size)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <label className="mr-2">Size:</label>
                  <select
                    value={item.size}
                    onChange={(e) =>
                      updateCart(item.item_id._id, item.quantity, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => removeItem(item.item_id._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="flex mt-12">
          <button
            onClick={() => checkout()}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-auto"
          >
            Checkout
          </button>
        </div>
      ) : (
        <></>
      )}
      <footer>
        <AboutUs />
      </footer>
    </div>
  );
};
