import React, { useEffect, useState } from 'react'
import './Footer.module.css'
function Footer() {
    const[counter,setCounter]=useState(10)
    useEffect(()=>{

    } ,[])

  return (
    <>
    <div className="flex flex-col bg-gray-200 p-9  ">
    <div >
      <h1 className='font-light text-2xl'>Get the Fresh Cart APP</h1>
      <p className='opacity-60'>we will send you a link in your email , <span className='text-green-400'> use it to download our app</span></p>
    </div>
    <div className='py-2 flex flex-row justify-between '>
    <input type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[75%] h-9" placeholder="name@flowbite.com"  />   
    <button type='button'  className=" h-9 text-[11px] bg-green-400 px-2 text-white   rounded-md relative w-[20%]  lg:text-sm ">Share App Link</button>
    </div>
    <div className=' pt-5 flex flex-row justify-between   '>
      <div className='lg:flex flex-row aligns-center'>
        <p>Payments Parteners</p>
        <div>
        <i className ="fa-brands fa-cc-paypal px-1  "></i>
        <i className="fa-brands fa-cc-visa px-1"></i>
        <i className="fa-solid fa-money-check-dollar px-1"></i>
        </div>
      </div>
      <div className='  flex flex-col lg:flex-row items-center  '>
        <p className='px-2'>Get Deliveries with Fresh Cart</p>
        <div className='flex'>
        <img className='w-25 mx-2' src="https://www.lourdes-france.org/wp-content/uploads/2023/09/disponible-app_apple-en.png" alt="" />
    <img className='w-25' src="https://revistasociosams.com/wp-content/uploads/2019/06/google.png" alt="" />
      </div></div>

    </div></div>
  
    
    </>
  )
}

export default Footer