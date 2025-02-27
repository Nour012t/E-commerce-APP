import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../images/blog-img-1.jpeg';
import banner2 from '../../images/blog-img-2.jpeg';
import image1 from '../../images/slider-image-1.jpeg';
import image2 from '../../images/slider-image-2.jpeg';
import image3 from '../../images/slider-image-3.jpeg';
function CategorySlider() {
    var setting = {
        autoplaySpeed:1000,
        arrows:false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      var settings = {
        autoplaySpeed:1000,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
      };

      const[productCategory,setproductCategory]=useState([])
    async function getCategory() {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setproductCategory(data.data);
       
    }
    useEffect(()=>{
        getCategory()
    } ,[])
   


  return (
    <>
    <div className=" mt-20 mainslider flex ">
        <div className="w-3/4">

        <Slider {...setting}>
      
      <img className='w-full h-[400px]' src={image1} alt="" />      
      
      <img className='w-full h-[400px]' src={image2} alt="" />      
      
      <img className='w-full h-[400px]' src={image3} alt="" />      
      </Slider>




       
        </div>
        <div className="w-1/4 flex flex-col">
        <img className='w-full h-[200px]'  src={banner1} alt="" />
        <img className='w-full h-[200px]' src={banner2} alt="" />

        </div>





    </div>
     <div className="category-slider-container">
        <h1 className='text-gray-400 text-2xl pb-2'>Shop Popular Categories</h1>
    <Slider {...settings}>
        {productCategory?.map((category) => (
            <div key={category._id} className="category-item">
                <img className='category-img' src={category.image} alt={category.name} />
                <p className=' pt-2 text-center text-gray-400'>{category.name}</p>
            </div>
        ))}
    </Slider>
</div>
</>
  )
}

export default CategorySlider