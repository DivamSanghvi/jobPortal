'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from './ui/button'

const jobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Cloud Architect",
  "Blockchain Developer",
  "UI/UX Designer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Mobile App Developer"
]

export default function AnimatedJobCarousel() {
  const controls = useAnimation()
  const [key, setKey] = useState(0)

  useEffect(() => {
    const animateCarousel = async () => {
      await controls.start({
        x: [0, -100, -200, -300, -400, -500, -600, -700, -800, -900],
        transition: {
          x: {
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
            ease: "easeInOut",
            duration: 20,
          },
        },
      })
      setKey(prevKey => prevKey + 1)
    }

    animateCarousel()
  }, [controls, key])

  return (
    <div className="w-1/2 mx-auto overflow-hidden bg-white-100 py-12">
  <motion.div
    key={key}
    className="flex whitespace-nowrap justify-center"
    animate={controls}
    onAnimationComplete={() => setKey((prevKey) => prevKey + 1)}
  >
    {[...jobTitles, ...jobTitles].map((title, index) => (
      <Button
        key={index}
        className="inline-block justify-center mx-4 px-6 py-3 bg-black text-white rounded-full text-lg font-bold shadow-lg"
        style={{ minWidth: "max-content" }}
      >
        {title}
      </Button>
    ))}
  </motion.div>
</div>

  )
}