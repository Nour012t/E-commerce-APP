import React, { useContext, useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { CounterContext } from '../../../context/counterContext';
useNavigate
function Login() {
  const{setLogin}=useContext(CounterContext)
  const[ApiError,setApiError]=useState('')
  const[isLoading,setisLoading]=useState(false)
  useEffect(()=>{

  } ,[])

  let navigate=useNavigate();
   function handleLogin(formValues){
    setisLoading(true)
    let {data}=  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formValues)
    .then((apiResponse)=>{
      navigate('/home')
      localStorage.setItem('usertoken',apiResponse.data.token)
      localStorage.setItem('userToken',apiResponse.data.token)

      setLogin(apiResponse.data.token)
    ;
    })
    .catch((apiResponse)=>{
      setisLoading(false)
      setApiError(apiResponse?.response?.data?.message)
    })
    console.log(data);
    
   
    
  }
  let ValidationShema = Yup.object().shape({
   
    email: Yup.string()
        .email("Invalid email address format")
        .required('Email is required'),
   
    password: Yup.string()
        .matches(/^[A-Z][a-z  1-9]{5,10}$/, 'The first letter must be uppercase')
        .required('Password is required'),
   
});
  let formik = useFormik({
    initialValues:{
     
      email:'',
      password:'',
    
    },
    validationSchema:ValidationShema,
    onSubmit:handleLogin

  })

  

return (
  <div className="  container  flex flex-col   mt-12 p-5 lg:ps-[25%]">
    <h1 className="mb-4  text-3xl font-bold text-gray-900  md:text-4xl lg:text-5xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-400 from-green-900">Login Now</span> </h1>
    {ApiError?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {ApiError}
</div> :null}
<form className="max-w-2xl  py-6 " onSubmit={formik.handleSubmit}>


<div className="relative z-0 w-full mb-5    group">
    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
</div>
{formik.errors.email && formik.touched.email?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div> :null}
<div className="relative z-0 w-full mb-5    group">
    <input type="password"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="passward" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">passward address</label>
</div>
{formik.errors.password && formik.touched.password?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div> :null}

<button type='submit'  className=" text-white bg-green-400 px-5 py-2 rounded-md relative lg:left-145 ">
  {isLoading? <i className="fa-solid fa-spinner"></i> :'Login'}

</button>
</form>
  </div>
  )
}

export default Login
