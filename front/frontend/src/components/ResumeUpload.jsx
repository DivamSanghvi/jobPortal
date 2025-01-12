'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, Briefcase, X, ChevronRight } from 'lucide-react'
import Navbar from './shared/Navbar'

export default function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setShowRecommendations(true)
  }

  const recommendedJobs = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      match: "95%",
      description: "Looking for an experienced frontend developer with React expertise..."
    },
    {
      title: "Full Stack Engineer",
      company: "Innovation Labs",
      match: "88%",
      description: "Seeking a full stack developer with Node.js and React experience..."
    },
    {
      title: "UI/UX Developer",
      company: "Creative Digital",
      match: "82%",
      description: "Join our team as a UI/UX developer with strong frontend skills..."
    }
  ]

  return (
    <div className="min-h-screen bg-white p-8">
        <Navbar/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-2">Upload Your Resume</h1>
        <p className="text-gray-600 text-center mb-8">
          We'll find the perfect job matches based on your experience
        </p>

        {!showRecommendations && (
          <motion.div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            animate={{ scale: dragActive ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <Upload className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <label
              htmlFor="resume-upload"
              className="block text-lg mb-2 cursor-pointer hover:text-orange-500 transition-colors"
            >
              {file ? file.name : "Drop your resume here or click to upload"}
            </label>
            <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX</p>
          </motion.div>
        )}

        {file && !showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full inline-block"
                />
              ) : (
                "Analyze Resume"
              )}
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recommended Jobs</h2>
                <button
                  onClick={() => {
                    setShowRecommendations(false)
                    setFile(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.match} Match
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-orange-500 font-semibold flex items-center hover:text-orange-600"
                    >
                      View Details
                      <ChevronRight size={20} className="ml-1" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}