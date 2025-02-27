import React, { useEffect, useState } from 'react'
import RecentProducts from '../RecentProducrs/RecentProducts'

function Products() {
    const[counter,setCounter]=useState(10)
    useEffect(()=>{

    } ,[])

  return (
    <div className="mt-20">
    <RecentProducts></RecentProducts></div>
  )
}

export default Products