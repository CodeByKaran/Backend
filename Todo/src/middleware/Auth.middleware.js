import jwt from "jsonwebtoken"
import {User} from "../model/user.model.js"

export const Authentication=async(req,res,next)=>{
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","")
    
    if(!token){
      throw new Error()
    }
    
    const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken._id).select("-passWord -refreshToken")
    
    req.user=user
    next()
    
  } catch (e) {
    return null;
  }
}