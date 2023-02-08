import express from "express";
import cors from "cors"
import * as dotenv from "dotenv"

import connectDB from "./MongoDB/connect.js";
import PostRoutes from "./Routes/PostRoutes.js"
import DalleRoutes from "./Routes/DalleRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({limit: "50mb"}))

app.use("/api/v1/post", PostRoutes)
app.use("/api/v1/dalle", DalleRoutes)

app.get("/", async (req, res)=>{
    res.send("Hello From DALL-E")
})

const startServer = async () =>{

    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=>{
            console.log("App is listening on post https://localhost:8080")
        })
    }
    catch(err){
        console.log(err)
    }
}

startServer();