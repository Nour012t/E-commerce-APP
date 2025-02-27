import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../../context/cartContext';
import { wishListContext } from '../../../context/wishContext';
import toast from 'react-hot-toast';

function RecentProducts() {
  function RecentProduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { Addtocart, setcart } = useContext(CartContext);
  let { AddtowishList, deletewishListItem, getwishListItems } = useContext(wishListContext);
  
  const { data, isLoading } = useQuery({
    staleTime: 2000,
    queryKey: ['recentProducts'],
    queryFn: RecentProduct
  });

  // State to track wishlisted items
  const [wishList, setWishList] = useState([]);

  async function fetchWishlist() {
    let response = await getwishListItems();
    setWishList(response.data.data.map(item => item.id));
  }

  async function toggleWishlist(productId) {
    if (wishList.includes(productId)) {
      await deletewishListItem(productId);
      setWishList(prev => prev.filter(id => id !== productId));
      toast.error('Removed from Wishlist');
    } else {
      await AddtowishList(productId);
      setWishList(prev => [...prev, productId]);
      toast.success('Added to Wishlist');
    }
  }

  async function addProduct(productId) {
    let response = await Addtocart(productId);
    if (response.data.status === 'success') {
      toast.success('Successfully added to cart');
      setcart(response.data);
    } else {
      toast.error('Oops! There was a problem adding to cart');
    }
  }

  React.useEffect(() => {
    fetchWishlist();
  }, []);

  if (isLoading) {
    return <div><i className="fa-solid fa-spinner fa-10x text-green-400 w-full text-center p-5"></i></div>;
  }

  return (
    <>
      <div className="row">
        {data?.data.data.map((product) => (
          <div key={product.id} className="w-1/3 p-5 lg:w-1/6 product">
            <Link to={`/productdetails/${product.id}`}>
              <img className='w-full' src={product.imageCover} alt="" />
              <p className='font-light text-green-600'>{product.category.name}</p>
              <h3>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className="flex justify-between items-center text-gray-400">
                <span>{product.price} EGP</span>
                <span>{product.ratingsQuantity} <i className="fa-solid fa-star text-amber-600"></i></span>
              </div>
            </Link>
            
            {/* Wishlist Heart Icon */}
            <i 
              className={`fa-solid fa-heart text-2xl cursor-pointer ${wishList.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`}
              onClick={() => toggleWishlist(product.id)}
            ></i>

            <button type='submit' onClick={() => addProduct(product.id)} className="text-white bg-green-400 px-5 py-2 rounded-md relative w-full text-center top-5 opacity-0 cursor-pointer">
              Add To Cart
            </button>        
          </div>
        ))}
      </div>
    </>
  );
}

export default RecentProducts;
