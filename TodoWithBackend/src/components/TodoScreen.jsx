import React,{useRef,useState} from 'react'
import axios from "axios"
import Cookies from 'js-cookie';

export default function TodoScreen({tasks,manageTask}) {
  
  const taskref=useRef()
  
  const handleAddClick=async()=>{
   if(taskref.current.value==="") return
   
   try{
   let taskdata = {task:taskref.current.value,isDone:false}
   let {data} = await axios.post("/api/v1/users/addtask",taskdata)
   manageTask(data.data.taskList)
   taskref.current.value=""
   }catch(err){
    console.log('error: ',err)
   }
 }
 
  const handleDelClick=async(index)=>{
   if(index<0) return
   let userIndex = {index}
  let {data} = await axios.post("/api/v1/users/removetask",userIndex)
  manageTask(data.data.taskList)
 }
 
 const HandlEditTask= async (task,isChecked,index)=>{
  
   let userdata = {
     task:task,
     done:isChecked
   }
   
  let updateData = await axios.post('/api/v1/users/edit',userdata)
  
  let {data} = await axios.post('/api/v1/users/getalltask')
  
  manageTask(data.data)
 }
  

 
  
  return (
    <>
      <div className="input-area my-3" data-bs-theme="dark" >
        <input type="text" className="p-2 w-50 border-1 rounded-2 mx-1"  ref={taskref} placeholder="Go To College"/>
        <input type="button" value="Add" className="p-2 w-25 border-1 rounded-2" onClick={handleAddClick}/>
      </div>
      <div  data-bs-theme="dark" className="my-3 task-area">
        {tasks.map((task, index) =>{
          return(
     <div className="bg-dark my-width position-relative p-2 my-2 d-flex align-items-center rounded-2 " data-bs-theme="dark">
         <span className="text">{task.task}</span>
          <button type="button" className="btn btn-danger btn-sm position-absolute my-right" onClick={()=>handleDelClick(index)}>Del</button>
          <input type="checkbox" className="position-absolute my-left" defaultChecked={task.isDone}  onClick={()=>HandlEditTask(task.task,!task.isDone,index)}/>
         </div>
          );
        })}
      </div>
    </>
  )
}