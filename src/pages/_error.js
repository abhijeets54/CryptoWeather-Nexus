import React from 'react'
import Link from 'next/link'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold mb-4">
        {statusCode ? `Error ${statusCode}` : 'An error occurred'}
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center">
        {statusCode === 404
          ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
          : 'Sorry, something went wrong on our server.'}
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center"
      >
        <FaHome className="mr-2" /> Back to Home
      </Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
