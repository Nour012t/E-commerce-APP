import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Slider from "react-slick";

function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    let {id}= useParams();
    const[productDetails,setproductDetails]=useState(null)
    async function getDetails(id) {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setproductDetails(data.data);
       
    }
    useEffect(()=>{
        getDetails(id)
    } ,[])

  return (
    <div className=' mt-20 row py-5'>
        <div className="w-1/4 md:pb-8">
        <Slider  {...settings}>
            {productDetails?.images.map((src)=><img className='w-full' src={src} alt="" />)}
        </Slider>
        
        </div>
        <div className="w-3/4 p-7 px-14 ">
        
        <h1 className=' font-bold text-2xl mt-4'>{productDetails?.title}</h1>
        <p className='pt-4 text-lg text-gray-500'>{productDetails?.description}</p>
        <div className="flex justify-between items-center text-gray-400 mt-5 ">
            <span>{productDetails?.price}EGP</span>
            <span>{productDetails?.ratingsQuantity} <i className="fa-solid fa-star text-amber-600" ></i>
            </span>
        </div>
        <button type='text'  className=" text-white bg-green-400 w-full mt-3 py-2 rounded-md relative cursor-pointer  ">Add To Cart</button>

        </div>
    </div>
  )
}

export default ProductDetails