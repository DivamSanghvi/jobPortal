import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const applyJob = asyncHandler(async(req,res)=>{
    const userId = req.user._id
    const jobId = req.params.id
    if(!jobId){
        throw new ApiError(404,"job not found")
    }

    const existingApplication = await Application.findOne({ job: jobId,applicant: userId})
    if(existingApplication){
        throw new ApiError(400,"application already exists")
    }

    //check if job exists
    const job = await Job.findById(jobId)
    if(!job){
        throw new ApiError(404,"job not found")
    }

    const newApplication = await Application.create({
        job:jobId,
        applicant:userId,
    });
    job.applications.push(newApplication._id)
    await job.save();
    
    return res.status(201).json(
        new ApiResponse(201,"Application submitted successfully")
    )

})

export const getAppliedJobs = asyncHandler(async(req,res)=>{
    const userId = req.user._id
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}},
        }
    })
    if(!application){
        throw new ApiError(404,"No applications found")
    }
    return res.status(200).json(
        new ApiResponse(201,application,"application founds")
    )
})

export const getApplicants = asyncHandler(async (req, res) => {
    const jobId = req.params.id; // Get job ID from request parameters
    const job = await Job.findById(jobId).populate({
        path: 'applications', // Use the correct path here
        options: { sort: { createdAt: -1 } }, // Sort by creation date
        populate: {
            path: 'applicant' // Reference the applicant field
        }
    });

    if (!job) {
        throw new ApiError(404, "Job not found"); // Handle job not found error
    }

    return res.status(200).json( // Use 200 for a successful response
        new ApiResponse(200, job, "Job applicants retrieved successfully") // Send back the job with applicants
    );
});

export const updateStatus = asyncHandler(async(req,res)=>{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });
})
