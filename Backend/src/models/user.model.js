import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true,
    },
    phoneNumber : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
        
    },
    role : {
        type: String,
        required : true,
        enum : ['student','recruiter']
    },
    profile : {
        bio:{
            type :String
        },
        skills :[{
            type : String
        }],
        resume : {type:String}, //here the cloudinary url would come
        resumeOriginName : {
            type : String
        },
        company : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Company'
        },
        profilePhoto : {
            type :String,
            default : ""
        }
    },
},{timestamps : true
})

UserSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password ,10);
    next()
})

UserSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',UserSchema);