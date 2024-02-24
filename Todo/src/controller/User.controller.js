import {User} from "../model/user.model.js"
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"


const options={
  httpOnly:true,
  secured:true
}

const register=AsyncHandler(async(req,res)=>{
  
  const {userName,passWord,email}=req.body
  
  
  if([userName,passWord,email].some((e) => e==="")){
    return res
    .satus(402)
    .json(
     new ApiError(402,"all fields are required")
    )
  }
  
  const IsAlreadyRegister= await User.findOne({
    $or:[{userName},{email}]
  })
  
  if(IsAlreadyRegister){
    throw new ApiError(300,"User is already registered")
  }
  
  const avatarLocalPath=req.file?.path;
  
  if(!avatarLocalPath){
    throw new ApiError(401,"avatar not found")
  }
  
 const avatar = await uploadOnCloudinary(avatarLocalPath)
  
  if(!avatar){
    throw new ApiError(500,"error while uploading avatar on cloudinary")
  }
  
  const user= await User.create({
    userName,
    email,
    passWord,
    avatar:avatar.url
  })
  
  return res
  .status(200)
  .json(
    new ApiResponse(200,user,"registerd user")
  )
  
})

const login=AsyncHandler(async(req,res)=>{
  const {email,passWord} = req.body
  
  if([email,passWord].some((fields) => fields==="")){
    return res
    .status(402)
    .json(
    new ApiError(402,"Email or passWord is required")
    )
  }
  
  const user = await User.findOne({email})
  
  if(!user){
    return res
    .status(409)
    .json(
    new ApiError(409,"email is wrong or not registered")
    )
  }
  
  const validPassWord= await user.isPassWordCorrect(passWord)
  
  if(!validPassWord){
    return res
    .status(409)
    .json(
    {
      "status":"402",
      "message":"passWord is Wrong"
    }
    )
  }
  
 const accessToken = await user.generateAccessToken(user._id)
 
 const refreshToken = await user.generateRefreshToken(user._id)
 
  user.refreshToken=refreshToken
 await user.save({validateBeforeSave:false})
 
 if(!accessToken && !refreshToken){
   throw new ApiError(500,"error while generating tokens")
 }
 
 const newUser = await User.findById(user._id).select("-passWord")
 
 return res
 .status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(
   new ApiResponse(200,newUser,"login successfully")
  )
  
})

const logout=AsyncHandler(async(req,res)=>{
  const user = await User.findById(req.user?._id)
  
  if(!user){
    throw new ApiError(402,"token is used or expired")
  }
  
  user.refreshToken=undefined;
  user.save({validateBeforeSave:false})
  
  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
   new ApiResponse(200,{},"logout successfully")
  )
})


const AddTask=AsyncHandler(async(req,res)=>{
  const user = await User.findById(req.user?._id).select("-passWord -refreshToken")
  
  if(!user){
    throw new ApiError(404,"please try again cant add tasks")
  }
  
  const {task} = req.body
  
  if(!task){
    throw new ApiError(402,"task not found")
  }

  await user.taskList.push({task,isDone:false})
  user.save({validateBeforeSave:false})

  return res 
  .status(200)
  .json(
    new ApiResponse(200,user,"task added successfully")
  )
  
})

const removeTask=AsyncHandler(async(req,res,)=>{
  const user = await User.findById(req.user?._id).select("-passWord -refreshToken")
  
  if(!user){
    throw new ApiError(404,"please try again cant remove tasks")
  }
  
  const {index} = req.body
  
  if(index<0){
    throw new ApiError(402,"index not found")
  }
  
  await user.taskList.splice(index,1)
  user.save({validateBeforeSave:false})
  
  return res 
  .status(200)
  .json(
   new ApiResponse(200,user,"task removed")
  )
})


const editTask=AsyncHandler(async(req,res)=>{

 const {task,done} = req.body
 
 const user = await User.updateOne({_id:req.user?._id,"taskList.task":task},{
   $set:{"taskList.$.isDone":done}
 })
 
 
  if(!user){
    throw new ApiError(400,"try again cant edit now")
  }
  
  
  return res
  .status(200)
  .json(
    new ApiResponse(200,user,"taks edit successfully")
  )
  
})


const currentUser=AsyncHandler(async(req,res)=>{
  
  const user = await User.findById(req.user?._id).select("-passWord -refreshToken")

  if(!user){
    throw new ApiError(402,"user not found")
  }
  
  
  
  return res
  .status(200)
  .json(
    new ApiResponse(200,user,"got user")
  )
})


const getAllTask=AsyncHandler(async(req,res)=>{
  
  const user = await User.findById(req.user?._id).select("-passWord -refreshToken")
  
  if(!user){
    throw new ApiError(409,"tokens expired")
  }
  
  return res
  .status(200)
  .json(
   new ApiResponse(200,user.taskList,"taskList got successfully")
  )
})

export{
  register,
  login,
  logout,
  AddTask,
  removeTask,
  editTask,
  currentUser,
  getAllTask
}