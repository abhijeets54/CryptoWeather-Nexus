'use client'

import Link from 'next/link'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <Link 
              href="/"
              className="btn btn-primary flex items-center justify-center"
            >
              <FaHome className="mr-2" /> Back to Home
            </Link>
            <Link 
              href="/weather"
              className="btn btn-secondary flex items-center justify-center"
            >
              Weather Dashboard
            </Link>
            <Link 
              href="/crypto"
              className="btn btn-secondary flex items-center justify-center"
            >
              Crypto Dashboard
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
