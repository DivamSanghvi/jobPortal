import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Navbar from './shared/Navbar'


const JobDescription = () => {
    const isApplied = true
  return (
    
    <div className='max-w-7xl mx-auto my-10'>
        <Navbar/>
            <div className='flex items-center justify-between my-12'>
                <div>
                    <h1 className='font-bold text-xl'>Title</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">Software Engineer</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24 LPA</Badge>
                    </div>
                </div>
                <Button
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Google Software Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Bengaluru</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus deserunt, voluptatem aperiam eaque dicta numquam laboriosam nemo temporibus repellat praesentium doloribus exercitationem quod voluptas, sit odit placeat. Fuga, doloremque necessitatibus.
                Accusantium veritatis aliquam culpa sit ducimus omnis porro ipsam? Doloremque velit qui rem itaque, illum perferendis, laboriosam eum modi sapiente fugit explicabo nemo ipsa accusantium libero facilis! Eaque, tempore culpa?</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>4 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>24 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>1000+ Candidates</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>24-12-24</span></h1>
            </div>
        </div>
  )
}

export default JobDescription