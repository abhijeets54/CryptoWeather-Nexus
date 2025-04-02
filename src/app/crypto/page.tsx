'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchCryptoList } from '@/redux/slices/cryptoSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaArrowLeft, FaBitcoin, FaArrowUp, FaArrowDown } from 'react-icons/fa'

const CryptosPage = () => {
  const dispatch = useAppDispatch()
  const { cryptoList: cryptoData, isLoading } = useAppSelector((state: RootState) => state.crypto as any)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchCryptoList())
  }, [dispatch])

  const handleGoBack = () => {
    router.push('/')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatPercentage = (percentage: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percentage / 100)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold mb-8">Cryptocurrencies</h1>
        
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded-md mb-4"></div>
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-700 rounded-md mb-2"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">24h Change</th>
                  <th className="py-3 px-4 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cryptoData.map((crypto: any) => (
                  <tr 
                    key={crypto.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link href={`/crypto/${crypto.id}`} className="flex items-center">
                        <img 
                          src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                          alt={crypto.name}
                          className="w-8 h-8 mr-3"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://www.cryptocompare.com/media/37746251/btc.png'
                          }}
                        />
                        <div>
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-sm text-gray-400">{crypto.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {formatPrice(crypto.priceUsd)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className={`flex items-center justify-end ${parseFloat(crypto.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {parseFloat(crypto.changePercent24Hr) >= 0 ? (
                          <FaArrowUp className="mr-1" />
                        ) : (
                          <FaArrowDown className="mr-1" />
                        )}
                        {formatPercentage(parseFloat(crypto.changePercent24Hr))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {formatPrice(crypto.marketCapUsd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default CryptosPage
