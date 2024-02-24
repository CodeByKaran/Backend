import React,{useRef,useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function MyForm({handleRegister}) {
  const navigate= useNavigate()
  const form = useRef()
  const [file,setfile] = useState(null)
  
  const HandleClick=async(e)=>{
    e.preventDefault()
    try{
    const formdata = new FormData()
    formdata.append("userName",form.current[1].value)
    formdata.append("email",form.current[2].value)
    formdata.append("passWord",form.current[3].value)
    formdata.append("avatar",file)
   const {data} = await axios.post("/api/v1/users/register",formdata)
   handleRegister(data)
   navigate('/login')
  }catch(err){
    console.log(err);
  }
}
  
  return (
    <form className="w-75 text-white p-3" data-bs-theme="dark" ref={form}>
      <div className="mb-3">
    <label htmlFor="exampleInputFile" className="form-label">Avatar</label>
    <input type="file" className="form-control" name="avatar" onChange={(e)=>setfile(e.target.files[0])}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputuserName" className="form-label">userName</label>
    <input type="text" className="form-control"  />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" />
  </div>
  <div className="mb-3 ">
   <Link to="/login">Login</Link>
  </div>
  <button type="submit" className="btn btn-primary" onClick={HandleClick}>
  Register
  </button>
</form>
  )
}