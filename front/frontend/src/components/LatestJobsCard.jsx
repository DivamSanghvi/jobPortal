import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    // Check if job has nested properties
    const companyName = job.company ? job.company.name : ''; // Example of nested object
    const jobLocation = job.location || 'Location not available'; // Handle missing data

    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{companyName}</h1> {/* Handle nested property */}
                <p className='text-sm text-gray-500'>{jobLocation}</p> {/* Render fallback text if location is missing */}
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job.title}</h1>
                <p className='text-sm text-gray-600'>{job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost"> {job.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">$ {job.salary}</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
