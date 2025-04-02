'use client'

import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CryptoWind. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Powered by CoinCap, CoinGecko, OpenWeatherMap, and NewsData.io
          </p>
        </div>
        
        <div className="flex space-x-4">
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="Discord"
          >
            <FaDiscord size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
