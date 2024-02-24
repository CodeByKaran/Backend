import app from "./App.js"
import dotenv from "dotenv"
import dbConnection from "./db/index.js"

dotenv.config({
  path:"./.env"
})

dbConnection()
.then(()=>{
 const network = app.listen(process.env.PORT||8000,()=>{
  console.log("server is listening on the port",process.env.PORT);
  })
})
.catch(err=>{
  console.log(err);
})
