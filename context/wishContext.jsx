import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
    async function getwishListItems() {
        return await axios.get(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }

    async function deletewishListItem(productId) {
        return await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishList/${productId}`,
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }

    async function AddtowishList(productId) {
        return await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishList",
            { productId },
            {
                headers: {
                    token: localStorage.getItem("userToken"), // Fetch latest token dynamically
                },
            }
        );
    }

    let [wishList, setwishList] = useState(null);

    async function getwishList() {
        let response = await getwishListItems();
        setwishList(response.data);
    }

    useEffect(() => {
        getwishList(); // Fixed function call
    }, []); // Fixed syntax error

    return (
        <wishListContext.Provider value={{ getwishList, wishList, setwishList, AddtowishList, getwishListItems, deletewishListItem }}>
            {children}
        </wishListContext.Provider>
    );
}
