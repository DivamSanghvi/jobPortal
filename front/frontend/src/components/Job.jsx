'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
const JobCard = ({
  Job
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <motion.img
            src={"https://t3.ftcdn.net/jpg/05/48/79/56/360_F_548795617_Mc2v4YX1gCR7UCmJDBMAjUmiUfVuJKHf.jpg"}
            alt={`Logo`}
            className="w-12 h-12 rounded-full mr-4"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h2 className="text-xl font-bold">Company Name</h2>
            <p className="text-gray-500 text-sm">2 days ago</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-2">Job Title</h3>
      
      <div className="flex items-center mb-2 text-gray-600">
        <MapPin size={18} className="mr-2" />
        <span>Job Location</span>
      </div>

      <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur porro maiores maxime ratione assumenda minima possimus, error animi, velit, dolorum officia cum obcaecati et impedit deleniti doloremque odit voluptatem quae.</p>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700">Position</h4>
            <p>Junior Developer</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700">Type</h4>
            <p>Full Time</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700">Salary</h4>
            <p>$120000</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link to="/job-description/12345">
        <motion.button
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          
        >
          Details
        </motion.button>
        </Link>
        <motion.button
          className="flex items-center text-gray-600 hover:text-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          
        >
          <Bookmark size={20} className="mr-2" />
          Save for later
        </motion.button>
      </div>
    </motion.div>
  )
}

export default JobCard