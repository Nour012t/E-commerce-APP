import React, { useContext, useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { CounterContext } from '../../../context/counterContext';
useNavigate
function CheckOut() {
 
  const[isLoading,setisLoading]=useState(false)
  useEffect(()=>{

  } ,[])

   async function handleCheckOut(id,url,formValue){
    let {data} = await axios.post( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,{
        "shippingAddress":formValue
    },
    {headers: {
        token: localStorage.getItem("userToken"), // Fetch latest token dynamically
    }}
)
    if(data.status=='success'){
        window.location.href = data.session.url
    }
    
    ;
    }
   
   
    
    
   
    
  
  
  let formik = useFormik({
    initialValues:{
     
        details:'',
        phone:'',
        city:''
    
    },
   
    onSubmit:()=>handleCheckOut('67ae785f4a9040166aa1e3a9','http://localhost:5173',formik.values)

  })

  

return (
  <div className=" mt-12 container  flex flex-col    p-5 lg:ps-[25%]">
    <h1 className="mb-4  text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-400 from-green-900">CheckOut Now</span> </h1>
   
<form className="max-w-2xl  py-6 " onSubmit={formik.handleSubmit}>


<div className="relative z-0 w-full mb-5    group">
    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
</div>

<div className="relative z-0 w-full mb-5    group">
    <input type="tel"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone address</label>
</div>
<div className="relative z-0 w-full mb-5    group">
    <input type="text"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} name="city"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city address</label>
</div>

<button type='submit'  className=" text-white bg-green-400 px-5 py-2 rounded-md relative lg:left-145 ">
  {isLoading? <i className="fa-solid fa-spinner"></i> :'CheckOut'}

</button>
</form>
  </div>
  )
}

export default CheckOut