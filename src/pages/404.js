import React from 'react'
import Link from 'next/link'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 text-lg mb-8 text-center">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link 
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center"
        >
          <FaHome className="mr-2" /> Back to Home
        </Link>
        <Link 
          href="/weather"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center"
        >
          Weather Dashboard
        </Link>
        <Link 
          href="/crypto"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center"
        >
          Crypto Dashboard
        </Link>
      </div>
    </div>
  )
}
