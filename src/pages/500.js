import React from 'react'
import Link from 'next/link'
import { FaHome, FaExclamationCircle } from 'react-icons/fa'

export default function Custom500() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <FaExclamationCircle className="text-red-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
      <p className="text-gray-400 text-lg mb-8 text-center">
        We apologize for the inconvenience. Our server encountered an error and could not complete your request.
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link 
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center"
        >
          <FaHome className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  )
}
