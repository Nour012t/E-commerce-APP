import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedRouter(props) {

    if(localStorage.getItem('usertoken')!==null){
        return props.children
    }
    else{
        return <Navigate to={'/login'} />
    }
    const[counter,setCounter]=useState(10)
    useEffect(()=>{

    } ,[])


  return (
    <div>TemplateName</div>
  )
}

export default ProtectedRouter