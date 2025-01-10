import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousal from './CategoryCarousal'
import LatestJobs from './LatestJobs'
import ModernAnimatedFooter from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs()
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousal/>
      <LatestJobs/>
      <ModernAnimatedFooter/>
    </div>
  )
}

export default Home