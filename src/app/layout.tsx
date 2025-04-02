import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/redux/provider'
import dynamic from 'next/dynamic'

// Dynamically import Toaster to avoid hydration issues
const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoWeather Nexus - Dashboard',
  description: 'A comprehensive dashboard combining cryptocurrency, weather data, and real-time notifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <ReduxProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #3b82f6',
              },
            }}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
