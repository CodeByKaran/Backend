import MyForm from "./components/MyForm"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm"
import TodoScreen from "./components/TodoScreen"
import Home from "./components/Home"
import {useState,useEffect} from "react"
import axios from "axios"

function App() {

const [isloggedin, setisloggedin] = useState(false)
const [tasks,settasks]=useState([])
const [loggedUserData,setloggedUserData] = useState({})




const getCurrentUser= async ()=>{
  let {data} = await axios.post("/api/v1/users/getuser")
  
  if(!data) return
  
  settasks(data.data.taskList)
  let userdata = {
    userName:data.data.userName,
    avatar: data.data.avatar
  }
  setloggedUserData(userdata)
  setisloggedin(true)
  
}

let isloggedinValue = localStorage.getItem("user")?true:false


useEffect(()=>{
  getCurrentUser()
},[])

const handleLogin=(data)=>{
  if(!data){
    return "not login"
  }
  let userdata = {
    userName:data.data.userName,
    avatar: data.data.avatar
  }
  setloggedUserData(userdata)
  setisloggedin(true)
  settasks(data.data.taskList)
  localStorage.setItem("user",data)
}

const handleRegister=(data)=>{
  if(!data){
    return "not register"
  }
}

const manageTask=(data)=>{
  settasks(data)
}

const Logout=async()=>{
  
 let {data} = await axios.get('/api/v1/users/logout')
 setisloggedin(false)
 return data;
}

  return (
    <center className="my-class">
      <BrowserRouter>
      <Navbar isloggedin={isloggedin} loggedUserData={loggedUserData} Logout={Logout}/>
      <Routes>
      <Route path="/" element={!isloggedin?<Home/>:<TodoScreen manageTask={manageTask}  tasks={tasks} Logout={Logout}/>}/>
       <Route path="/register" element={<MyForm handleRegister={handleRegister}/>}/>
       <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>}/>
       <Route path="/todos" element={<TodoScreen manageTask={manageTask}  tasks={tasks}/>}/>
      </Routes>
    </BrowserRouter>
    
    </center>
  )
}

export default App
