'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchCryptoDetails, fetchCryptoHistory } from '@/redux/slices/cryptoSlice'
import { toggleFavoriteCrypto } from '@/redux/slices/favoritesSlice'
import { RootState } from '@/redux/store'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CryptoChart from '@/components/CryptoChart'
import { FaStar, FaArrowLeft, FaExchangeAlt, FaChartLine, FaInfoCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

const CryptoDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const cryptoId = params.id as string
  const dispatch = useAppDispatch()
  const { cryptoDetails, cryptoHistory, isLoading, error } = useAppSelector((state: RootState) => state.crypto as any)
  const { favoriteCryptos } = useAppSelector((state: RootState) => state.favorites as any)

  useEffect(() => {
    if (cryptoId) {
      dispatch(fetchCryptoDetails(cryptoId))
      dispatch(fetchCryptoHistory(cryptoId))
    }
  }, [dispatch, cryptoId])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(cryptoId))
    const message = isFavorite() 
      ? `${cryptoDetails?.name} removed from favorites` 
      : `${cryptoDetails?.name} added to favorites`
    toast(message)
  }

  const isFavorite = () => {
    return favoriteCryptos.includes(cryptoId)
  }

  const handleGoBack = () => {
    router.back()
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: num < 1 ? 6 : 2,
      maximumFractionDigits: num < 1 ? 6 : 2,
    }).format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`
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
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-700 rounded-md w-1/3"></div>
            <div className="h-60 bg-gray-700 rounded-md"></div>
            <div className="h-40 bg-gray-700 rounded-md"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 border border-red-500 rounded-md">
            Error loading cryptocurrency data. Please try again.
          </div>
        ) : cryptoDetails ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                {cryptoDetails.image && (
                  <img 
                    src={cryptoDetails.image.small} 
                    alt={cryptoDetails.name} 
                    className="w-10 h-10 mr-3"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{cryptoDetails.name}</h1>
                  <div className="text-gray-400">{cryptoDetails.symbol.toUpperCase()}</div>
                </div>
              </div>
              <button 
                onClick={handleToggleFavorite}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <FaStar className={isFavorite() ? "text-yellow-400" : "text-gray-500"} size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaExchangeAlt className="mr-2 text-blue-400" /> Market Data
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Current Price</span>
                    <span className="font-semibold">{formatNumber(cryptoDetails.market_data.current_price.usd)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Market Cap</span>
                    <span>{formatNumber(cryptoDetails.market_data.market_cap.usd)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">24h Trading Volume</span>
                    <span>{formatNumber(cryptoDetails.market_data.total_volume.usd)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">24h Low / High</span>
                    <span>
                      {formatNumber(cryptoDetails.market_data.low_24h.usd)} / {formatNumber(cryptoDetails.market_data.high_24h.usd)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Circulating Supply</span>
                    <span>{cryptoDetails.market_data.circulating_supply.toLocaleString()} {cryptoDetails.symbol.toUpperCase()}</span>
                  </li>
                </ul>
              </div>
              
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaChartLine className="mr-2 text-blue-400" /> Price Change
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">24 Hours</span>
                    <span className={cryptoDetails.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(cryptoDetails.market_data.price_change_percentage_24h)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">7 Days</span>
                    <span className={cryptoDetails.market_data.price_change_percentage_7d >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(cryptoDetails.market_data.price_change_percentage_7d)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">14 Days</span>
                    <span className={cryptoDetails.market_data.price_change_percentage_14d >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(cryptoDetails.market_data.price_change_percentage_14d)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">30 Days</span>
                    <span className={cryptoDetails.market_data.price_change_percentage_30d >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(cryptoDetails.market_data.price_change_percentage_30d)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">1 Year</span>
                    <span className={cryptoDetails.market_data.price_change_percentage_1y >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(cryptoDetails.market_data.price_change_percentage_1y)}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-400" /> Information
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Market Cap Rank</span>
                    <span>#{cryptoDetails.market_cap_rank}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Hashing Algorithm</span>
                    <span>{cryptoDetails.hashing_algorithm || 'N/A'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Genesis Date</span>
                    <span>{cryptoDetails.genesis_date || 'N/A'}</span>
                  </li>
                  <li>
                    <span className="text-gray-400 block mb-1">Links</span>
                    <div className="flex flex-wrap gap-2">
                      {cryptoDetails.links.homepage[0] && (
                        <a 
                          href={cryptoDetails.links.homepage[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Website
                        </a>
                      )}
                      {cryptoDetails.links.blockchain_site[0] && (
                        <a 
                          href={cryptoDetails.links.blockchain_site[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Explorer
                        </a>
                      )}
                      {cryptoDetails.links.official_forum_url[0] && (
                        <a 
                          href={cryptoDetails.links.official_forum_url[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Forum
                        </a>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Price History (Last 7 Days)</h2>
              <div className="h-80">
                <CryptoChart selectedCrypto={cryptoId} />
              </div>
            </div>
            
            {cryptoDetails.description.en && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">About {cryptoDetails.name}</h2>
                <div 
                  className="text-gray-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: cryptoDetails.description.en }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">No data available for this cryptocurrency</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default CryptoDetailPage
