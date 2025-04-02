'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBitcoin, FaMoon, FaSun, FaHome, FaChartLine, FaCloudSun } from 'react-icons/fa'
import NotificationsPanel from './NotificationsPanel'

const Header = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, we would apply the theme change to the entire application
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center py-4">
      <div className="flex items-center">
        <FaBitcoin className="text-yellow-500 text-4xl mr-3" />
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            CryptoWeather Nexus
          </h1>
        </Link>
      </div>
      
      <nav className="flex items-center space-x-1 md:space-x-4">
        <Link 
          href="/"
          className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          <span className="flex items-center">
            <FaHome className="mr-1" /> Dashboard
          </span>
        </Link>
        <Link 
          href="/crypto"
          className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/crypto') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          <span className="flex items-center">
            <FaChartLine className="mr-1" /> Crypto
          </span>
        </Link>
        <Link 
          href="/weather"
          className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/weather') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          <span className="flex items-center">
            <FaCloudSun className="mr-1" /> Weather
          </span>
        </Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        <div className="text-gray-300 text-sm hidden md:block">
          {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
        </div>
        
        <NotificationsPanel />
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
        </button>
      </div>
    </header>
  )
}

export default Header
