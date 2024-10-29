import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export const register = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if profile files exist
        const profileLocalPath = req.files?.profile && req.files.profile.length > 0 
            ? req.files.profile[0].path 
            : null;

        if (!profileLocalPath) {
            throw new ApiError(400, "Profile photo is required");
        }

        const profile = await uploadOnCloudinary(profileLocalPath);

        const user = await User.create({
            fullname,
            email,
            password,
            phoneNumber,
            role,
            profile: {
                profilePhoto: profile?.url
            }
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshtoken"
        );

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        );

    } catch (error) {
        console.log(error);
        next(error); // Pass the error to the next middleware
    }
});

export const loginUser = asyncHandler(async(req,res)=>{
    
    const {email,password,role} = req.body;
    console.log(email)
    if(!email || !password || !role){
        throw new ApiError(400,"While logging something is missing")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"no email found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "password is incorrect" )
    }

    if(role !== user.role){
        throw new ApiError(400,"role is not the same for this account")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    const loggedinUser = await User.findById(user._id).select("-password -refreshtoken")

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedinUser,accessToken,refreshToken
            },
            "user logged in successfully"
        )
    )
})

export const logout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken: 1,
            }
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(201)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged out successfully")
    )
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const resumeLocalPath = req.files?.resume && req.files.resume.length > 0 
        ? req.files.resume[0].path 
        : null;

    const profileLocalPath = req.files?.profile && req.files.profile.length > 0 
    ? req.files.profile[0].path 
    : null;

    const profile = await uploadOnCloudinary(profileLocalPath);
    const resume = resumeLocalPath ? await uploadOnCloudinary(resumeLocalPath) : null;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update profile fields
    const profileUpdates = {};
    if (bio) profileUpdates.bio = bio;
    if (skills) profileUpdates.skills = skills.split(",");
    if (resume) {
        profileUpdates.resume = resume.url;
        profileUpdates.resumeOriginalName = "resume";
    }
    if(profile){
        profileUpdates.profilePhoto = profile.url
    }
    
    // Apply profile updates if any
    if (Object.keys(profileUpdates).length > 0) {
        user.profile = { ...user.profile.toObject(), ...profileUpdates };
    }

    await user.save();

    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

    return res.status(200).json(
        new ApiResponse(
            200,
            loggedInUser,
            "Updates happened successfully"
        )
    );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});
