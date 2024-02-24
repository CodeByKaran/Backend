import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


app.use(cors(corsOptions))

app.use(express.json({
  limit:"16kb"
}))
app.use(express.urlencoded({
  extended:true,
  limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


import UserRouter from "./routes/User.router.js"

app.use("/api/v1/users",UserRouter)


export default app;