import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

export const uploadOnCloudinary=async(localFilepath)=>{
  try {
    if(!localFilepath){
      return null
    }
    
   const avatar = await cloudinary.uploader.upload(localFilepath,{
      resource_type:"auto"
    })
   
   if(!avatar){
     return null
   }
   
  fs.unlinkSync(localFilepath)
  return avatar;
  
  } catch (e) {
    console.log(e);
    fs.unlinkSync(localFilepath)
    return null
  }
}