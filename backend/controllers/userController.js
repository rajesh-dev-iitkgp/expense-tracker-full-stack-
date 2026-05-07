import validator from "validator"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

const loginUser = async (req,res)=>{

    try {
        
        const {email,password} = req.body
        const user = await userModel.findOne({ email })

        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid password"})
        }

        const token = createToken(user._id)

        return res.json({success:true,token})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

const registerUser = async (req,res)=>{
    try {
        const { name, email, password } = req.body

        const exists = await userModel.findOne({email})

        if(exists){
            return res.status(400).json({success:false,message:"User already exists"})}

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Invalid email"})
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({success:false,message:"Password is not strong enough"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        return res.json({success:true,token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}

export {loginUser,registerUser}