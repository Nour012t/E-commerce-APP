import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    async function getCartItems() {
        return await axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart",
           
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }

    async function deleteCartItem(productId) {
        return await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
           
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }


    async function updateCartItem(productId,count) {
        return await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
         
           {count:count} ,
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }

    async function Addtocart(productId) {
        return await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
            { productId },
      
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }
 let [cart,setcart]=useState(null)
 async function getcard() {
    let response= await getCartItems()
    setcart(response.data)
 }
 useEffect(()=>{
    getcard()
 }
    ,[])
    return (
        <CartContext.Provider value={{getcard, cart,setcart,Addtocart,getCartItems,deleteCartItem,updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
}
