import React from 'react'
import {Link} from "react-router-dom"

export default function Home() {
  return (
    <>
   <div class="home-area">
      <div class="my-wrapper">
        <div class="my-content">
          <span>* if already registered</span>
          <button  class="btn btn-secondary btn-sm">
         <Link to="/login" class="text-white text-decoration-none"> Login</Link>
          </button>
        </div>
      <div class="my-content">
       <span>* if not registered</span>
       <button  class="btn btn-secondary btn-sm">
       <Link to="/register" class="text-white text-decoration-none">Register</Link>
       </button>
      </div>
    </div>
  </div>
    </>
  )
}