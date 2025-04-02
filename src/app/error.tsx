'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { FaHome, FaExclamationCircle, FaRedo } from 'react-icons/fa'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center">
          <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-gray-400 text-lg mb-8">
            We apologize for the inconvenience. Please try again or return to the home page.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <button
              onClick={() => reset()}
              className="btn btn-primary flex items-center justify-center"
            >
              <FaRedo className="mr-2" /> Try Again
            </button>
            <Link 
              href="/"
              className="btn btn-secondary flex items-center justify-center"
            >
              <FaHome className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
