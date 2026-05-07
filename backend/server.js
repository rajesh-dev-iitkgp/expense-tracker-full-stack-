import express from "express"
import connectDB from "./config/connectDB.js"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"

dotenv.config()

const app= express()

app.use(express.json())
app.use(cors())

// MongoDB connection

connectDB()

// API routes

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.end("API is working")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})