import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    video:{
        type:String
    }
},{timestamps:true})
export const User = mongoose.model('User',userSchema);