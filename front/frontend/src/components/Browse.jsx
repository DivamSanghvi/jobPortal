import React from 'react';
import Navbar from './shared/Navbar';
import JobCard from './Job';

const randomJobs = [
  { company: "Company A", position: "Developer", location: "Remote" },
  { company: "Company B", position: "Designer", location: "NYC" },
  { company: "Company C", position: "Manager", location: "LA" },
  { company: "Company D", position: "HR", location: "Remote" }
];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            randomJobs.map((item, index) => {
              return (
                <JobCard key={index} job={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse;
