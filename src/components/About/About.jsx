import React, { useContext, useEffect, useState } from 'react';
import { wishListContext } from '../../../context/wishContext.jsx';
import { CartContext } from '../../../context/cartContext';
import toast from 'react-hot-toast';

function About() {
  const [wishList, setWishList] = useState({ data: { products: [] } });
  const { getwishListItems, deletewishListItem } = useContext(wishListContext);
  const { Addtocart, setcart } = useContext(CartContext);

  /** ✅ Fetch Wishlist */
  async function getwishList() {
    try {
      const response = await getwishListItems();
      setWishList({ data: { products: response.data.data } });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  /** ✅ Delete item from Wishlist */
  async function deleteWishList(productId) {
    try {
      await deletewishListItem(productId);
      setWishList((prevState) => ({
        data: {
          products: prevState.data.products.filter((p) => p._id !== productId),
        },
      }));
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  }

  /** ✅ Add item to Cart */
  async function addProduct(productId) {
    try {
      const response = await Addtocart(productId);
      if (response?.data?.status === 'success') {
        toast.success('Successfully added to cart');
        setcart(response.data);
      } else {
        toast.error('Oops! There was a problem adding to cart');
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error('Error adding product to cart');
    }
  }

  /** ✅ Fetch Wishlist on Component Mount */
  useEffect(() => {
    getwishList();
  }, [getwishListItems]);

  if (!wishList?.data?.products?.length) {
    return <p className="text-center text-gray-500">Loading wishlist...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Your Wishlist
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishList?.data?.products?.map((product) => (
              <tr key={product._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 sm:w-24 max-w-full h-auto rounded-lg"
                    alt={product.title}
                  />
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </td>
                <td className="px-4 py-4 text-center">
                  <span
                    onClick={() => deleteWishList(product._id)}
                    className="font-medium text-red-600 dark:text-red-500 cursor-pointer hover:underline"
                  >
                    Remove
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white text-center">
                  {product.price} EGP
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => addProduct(product._id)}
                    className="text-white bg-green-500 px-4 py-2 rounded-md w-full text-center hover:bg-green-600 transition transform hover:scale-105"
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}

export default About;
