import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Code, Globe, PenTool, Palette, Cpu } from 'lucide-react'

const AnimatedServiceCards = () => {
  const colors = {
    primary: '#FF6B35', // Orange
    secondary: '#2B2D42', // Black
    background: '#FFFFFF', // White
  }

  const services = [
    {
      icon: Layout,
      title: 'UI Design',
      description: 'Creating intuitive and engaging user interfaces that delight users and drive engagement. Our design process focuses on user-centered approaches.',
      delay: 0
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Building robust and scalable applications using cutting-edge technologies and best practices in software development.',
      delay: 0.2
    },
    {
      icon: Globe,
      title: 'Web Services',
      description: 'Delivering comprehensive web solutions from simple websites to complex web applications with focus on performance.',
      delay: 0.4
    },
    {
      icon: PenTool,
      title: 'Branding',
      description: 'Crafting unique and memorable brand identities that help businesses stand out in their market and connect with their audience.',
      delay: 0.6
    },
    {
      icon: Palette,
      title: 'Design System',
      description: 'Creating cohesive design systems that ensure consistency across all digital touchpoints while maintaining scalability.',
      delay: 0.8
    },
    {
      icon: Cpu,
      title: 'Integration',
      description: 'Seamlessly integrating various systems and APIs to create unified and efficient digital ecosystems.',
      delay: 1
    }
  ]

  return (
    <div className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: service.delay,
                ease: "easeOut"
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-lg"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6"
                >
                  <service.icon 
                    size={32}
                    style={{ color: colors.primary }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: service.delay + 0.3 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: colors.secondary }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center font-semibold"
                    style={{ color: colors.primary }}
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.div>

                {/* Background Decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
                  style={{ background: colors.primary }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedServiceCards