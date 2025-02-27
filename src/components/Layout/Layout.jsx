import React, { useEffect, useState } from 'react'

import '../Navbar/Navbar.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layer() {
    const[counter,setCounter]=useState(10)
    useEffect(()=>{

    } ,[])

  return (
    <>
    <Navbar/>
   <Outlet/>
    <Footer/>
    </>
    
  )
}

export default Layer