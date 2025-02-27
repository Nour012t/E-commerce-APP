import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/cartContext";
import { NavLink } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const { getCartItems, updateCartItem, setcart, deleteCartItem } = useContext(CartContext);

  /** ✅ Fetch Cart */
  async function getCart() {
    try {
      let response = await getCartItems();
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  /** ✅ Delete Item from Cart */
  async function deleteCart(productId) {
    try {
      let response = await deleteCartItem(productId);
      setCart(response.data);
      setcart(response.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  /** ✅ Update Item Quantity */
  async function updateCart(productId, count) {
    if (count < 1) return; // Prevent negative or zero quantity

    try {
      let response = await updateCartItem(productId, count);
      setCart(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  /** ✅ Fetch cart on mount */
  useEffect(() => {
    getCart();
  }, []);

  if (!cart?.data?.products?.length) {
    return (
      <p className="text-center text-gray-500 mt-10">Your cart is empty...</p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className=" mt-20 w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-3">Image</th>
              <th scope="col" className="px-4 md:px-6 py-3">Product</th>
              <th scope="col" className="px-4 md:px-6 py-3">Qty</th>
              <th scope="col" className="px-4 md:px-6 py-3">Price</th>
              <th scope="col" className="px-4 md:px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.data?.products.map((product) => (
              <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {/* Product Image */}
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-12 md:w-24 max-w-full max-h-full object-cover rounded-md"
                    alt={product.product.title}
                  />
                </td>

                {/* Product Title */}
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>

                {/* Quantity Controls */}
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => updateCart(product.product.id, product.count - 1)}
                      className="p-1 w-8 h-8 text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
                    >
                      −
                    </button>

                    <span className="mx-3 font-medium">{product.count}</span>

                    <button
                      onClick={() => updateCart(product.product.id, product.count + 1)}
                      className="p-1 w-8 h-8 text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Product Price */}
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>

                {/* Remove Button */}
                <td className="px-4 md:px-6 py-4">
                  <button
                    onClick={() => deleteCart(product.product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Checkout Button */}
      <div className="flex justify-center mt-6">
        <NavLink to="/checkout">
          <button className="text-white bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Checkout Now
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Cart;
