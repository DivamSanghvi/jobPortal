import { Company } from "../models/comapny.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerCompany = asyncHandler(async(req,res)=>{
    const {companyName} = req.body
    if(!companyName){
        throw new ApiError(401,"company name is required")
    }
    let company = await Company.findOne({name : companyName})
    if(company){
        throw new ApiError(400,"you cant register the same company")
    }
    company = await Company.create({
        name: companyName,
        userId: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(201,company,"company was successfully created")
    )
})

export const getCompany = asyncHandler(async(req,res)=>{
    const userId = req.user._id
    const companies = await Company.find({userId})
    if(!companies){
        throw new ApiError(404,"No companies found under this user")
    }

    return res.status(201).json(
        new ApiResponse(201,companies,"Companies found successfully")
    )
})

export const getCompanyById = asyncHandler(async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            throw new ApiError(404,"company not found")
        }
        return res.status(201).json(
            new ApiResponse(201,company,"Company found successfully")
        )
    } catch (error) {
        console.log(error)
    }
})

export const updateCompany = asyncHandler(async(req,res)=>{

try {
        const { name, description,website,location} = req.body
    
        const logoLocalPath = req.files?.logo && req.files.logo.length > 0 
        ? req.files.logo[0].path 
        : null;
    
        const logo = await uploadOnCloudinary(logoLocalPath);
    
        const updateData = {
            name : name,
            description : description,
            website : website,
            location : location,
            logo : logo.url,
            userId : req.user._id
        }
    
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
    
        if(!company){
            throw new ApiError(404,"company not found")
        }
    
        return res.status(201).json(
            new ApiResponse(201,company,"Companies found successfully")
        )
} catch (error) {
    console.log(error)
}
})

