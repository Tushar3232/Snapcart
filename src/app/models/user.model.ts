import mongoose from "mongoose";

interface IUser{
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    mobile?: string,
    role: "user" | "deliberyBoy" | "admin"
}

const userSchema= new mongoose.Schema<IUser>({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true,

    },
    mobile:{
        type: String,
        required: false
    },
    role:{
        type: String,
        enum: ["user","deliberyBoy","admin"],
        default: "user"
    }

},{timestamps:true})