import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String},
    email:{type:String,required:true,unique: true},
    password:{type:String,required:true}
})

const userModel = mongoose.models.users || new mongoose.model("users",userSchema)

export default userModel