import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postJob = asyncHandler(async(req,res)=>{
    const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
    const userId = req.user._id

    if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId){
        throw new ApiError(404,"something is missing")
    }

    const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experienceLevel,
        position,
        company: companyId,
        created_by: userId
    });
    return res.status(201).json(
        new ApiResponse(201,job,"job was created successfully")
    )
})

export const getAlljobs = asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword || ""
    const query = {
        $or: [
            {title: {$regex : keyword, $options : "i"}},
            {description: {$regex: keyword,$options: "i"}},
        ]
    };
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({createdAt: -1});
    if(!jobs){
        throw new ApiError(404, "no jobs found with the search function")
    }
    return res.status(201).json(
        new ApiResponse(201,jobs,"jobs found successfully")
    )
})

export const getJobById = asyncHandler(async(req,res)=>{
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
        path:"applications"
    });
    if(!job){
        throw new ApiError(404,"no job found")
    }
    return res.status(201).json(
        new ApiResponse(201,job,"jobs with all the applications")
    )
})

export const getAdminJobs = asyncHandler(async(req,res)=>{
    const adminId = req.user._id
    const jobs = await Job.find({created_by: adminId}).populate({
        path: "company",
        createdAt: -1
    })
    if(!jobs){
        throw new ApiError(404, "Admin has not posted any jobs")
    }
    return res.status(201).json(
        new ApiResponse(201,jobs,"Jobs found successfully")
    )
})