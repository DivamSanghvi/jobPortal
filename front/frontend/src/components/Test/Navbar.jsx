import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('Home')
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const navItems = ['Home', 'Our Work', 'About Us', 'Courses', 'More']

  const colors = {
    primary: '#FF6B35', // Vibrant Orange
    secondary: '#2B2D42', // Dark Blue-Gray
    background: '#FFFFFF', // White
    text: '#2B2D42', // Dark Blue-Gray
    lightText: '#8D99AE', // Light Blue-Gray
  }

  return (
    <div className="w-full flex justify-center pt-6 px-4">
      <nav 
        style={{ 
          background: colors.background,
          boxShadow: `0 4px 6px -1px ${colors.primary}20, 0 2px 4px -1px ${colors.primary}10`
        }}
        className="w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div style={{ background: colors.primary }} className="w-10 h-10 rounded-full flex items-center justify-center">
            <span style={{ color: colors.background }} className="text-2xl font-bold">L</span>
          </div>
          <span style={{ color: colors.secondary }} className="text-xl font-semibold">
            Logo
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => item === 'More' ? setIsMoreOpen(!isMoreOpen) : setActiveSection(item)}
              style={{ 
                color: activeSection === item || (item === 'More' && isMoreOpen) ? colors.primary : colors.text
              }}
              className={`relative px-4 py-2 rounded-full transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{item}</span>
              {(activeSection === item || (item === 'More' && isMoreOpen)) && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 bottom-0 w-full h-1 rounded-full"
                  style={{ background: colors.primary }}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item === 'More' && (
                <motion.span
                  animate={{ rotate: isMoreOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block ml-1"
                >
                  ▼
                </motion.span>
              )}
            </motion.button>
          ))}

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMoreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 z-50"
                style={{ background: colors.background }}
              >
                {['Blog', 'Resources', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    style={{ color: colors.text }}
                    className="block px-4 py-2 hover:bg-gray-50"
                    whileHover={{ x: 5, backgroundColor: colors.primary, color: colors.background }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: colors.secondary, color: colors.background }}
          className="px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md"
        >
          Get In Touch
        </motion.button>
      </nav>
    </div>
  )
}

export default Navbar