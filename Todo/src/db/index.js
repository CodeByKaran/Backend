import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const dbConnection = async()=>{
  try{
  const instance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
  console.log("Db connected:",instance.connection.name)
  }catch(err){
    console.log("Error Occured: ",err)
    process.exit(1)
  }
}


export default dbConnection;