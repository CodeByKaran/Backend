import mongoose,{Schema} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
  userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  passWord:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    required:true
  },
  refreshToken:{
    type:String,
  },
  taskList:[{
    type:Object,
  }],
 },
 {
   timestamps:true
 }
)

userSchema.pre("save",async function(next){
  if(!this.isModified("passWord")) return next()
  this.passWord = await bcrypt.hash(this.passWord,10)
  next()
})

userSchema.methods.isPassWordCorrect=async function(passWord){
  return await bcrypt.compare(passWord,this.passWord)
}

userSchema.methods.generateAccessToken=function(userId){
  return jwt.sign(
    {
      _id:this.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken=function(userId){
  return jwt.sign(
    {
      _id:this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User= mongoose.model("User",userSchema)