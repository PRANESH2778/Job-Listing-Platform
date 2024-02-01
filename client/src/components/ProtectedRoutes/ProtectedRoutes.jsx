import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
    const {Component} = props
    const [isActive,setIsActive] = useState(true);
    useEffect(()=>{
        const token = localStorage.getItem("token")
        setIsActive(JSON.parse(token))
    },[])
  return (
    <div>
        {isActive ? <Component/> : <Navigate to="/register"/>}
    </div>
  )
}
