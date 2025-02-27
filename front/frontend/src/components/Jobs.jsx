import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div>
      <Navbar />
      <div>
        <div className='flex gap-5'>
          <div className='w-1/6'>
            <FilterCard />
          </div>
          {
            allJobs.length <= 0 ? <span>NO JOBS FOUND</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    allJobs.map((item) => (
                      <div key={item._id}>
                        <Job job={item} /> {/* Ensure lowercase 'job' here */}
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs;
