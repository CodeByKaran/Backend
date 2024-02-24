import React,{useRef,useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Error from "./Error"

export default function MyForm({handleLogin}) {
  
  const navigate = useNavigate()
  
  const emailref = useRef()
  const passwordref = useRef()
  const [isError,setisError] = useState(null)
  
  const handleClick= async (e)=>{
    e.preventDefault()
    
      let userData = {
        email:emailref.current.value,
        passWord:passwordref.current.value
      }
       axios.post("/api/v1/users/login",userData)
      .then(res=>{
        handleLogin(res.data)
        navigate("/todos")
      })
      .catch(err=>{
        setisError(err.response.data.message)
        emailref.current.value=""
        passwordref.current.value=""
        emailref.current.focus()
        setTimeout(()=>{setisError(null)},3000)
      })
  }
  
  
  return (
    <form className=" w-75 text-white p-3">
  <div className="mb-3" data-bs-theme="dark" >
    {isError&&
   <Error message={isError}/>
   }
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className={`form-control ${isError&&'input-error'}`} ref={emailref} />
  </div>
  <div className="mb-3" data-bs-theme="dark" >
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className={`form-control ${isError&&'input-error'}`} ref={passwordref}/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={handleClick}>
  Login
  </button>
  <br/>
  <div className="my-2">
  <Link to="/register">Back</Link>
  </div>
</form>
  )
}