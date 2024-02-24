import React from 'react'
import { useNavigate } from "react-router-dom";


export default function Navbar({isloggedin,loggedUserData,Logout}) {
  
  const logoutNavigate = useNavigate()
  
  const HandleLogOutClick=async()=>{
    let returnRes = await Logout()
    logoutNavigate("/login")
  }
  
  return (
    <>
    <div className={`my-navbar ${!isloggedin&&'justify-content-center'}`}>
    
    {
    isloggedin&&
    <div className="wrap">
    <img src={loggedUserData.avatar} className="my-img"/>
    <span className="name-span p-1">{loggedUserData.userName.slice(0,3)}..</span>
    </div>
    }
    
    <span className="my-header">To-Do</span>
    {isloggedin&&
    <button className="btn btn-danger btn-sm rounded-1" onClick={HandleLogOutClick}>LogOut</button>
    }
    </div>
    </>
  )
}