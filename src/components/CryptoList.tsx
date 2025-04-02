'use client'

import { FaArrowUp, FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa'
import { CryptoData } from '@/types/crypto'
import Link from 'next/link'

interface CryptoListProps {
  cryptoData: CryptoData[]
  isLoading: boolean
  selectedCrypto: string
  onSelectCrypto: (id: string) => void
}

const CryptoList = ({ cryptoData, isLoading, selectedCrypto, onSelectCrypto }: CryptoListProps) => {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(parseFloat(price))
  }

  const formatPercent = (percent: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(percent) / 100)
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-700 rounded-md mb-2"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          Cryptocurrencies
          <Link href="/crypto" className="ml-2 text-blue-400 hover:text-blue-300">
            <FaExternalLinkAlt size={12} />
          </Link>
        </h2>
      </div>
      <table className="w-full text-sm md:text-base">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="text-left py-3 px-2">#</th>
            <th className="text-left py-3 px-2">Name</th>
            <th className="text-right py-3 px-2">Price</th>
            <th className="text-right py-3 px-2">24h %</th>
            <th className="text-right py-3 px-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => {
            const isPositive = parseFloat(crypto.changePercent24Hr) >= 0
            
            return (
              <tr 
                key={crypto.id}
                className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${
                  selectedCrypto === crypto.id ? 'bg-gray-700' : ''
                }`}
                onClick={() => onSelectCrypto(crypto.id)}
              >
                <td className="py-4 px-2">{crypto.rank}</td>
                <td className="py-4 px-2 font-medium">
                  <div className="flex items-center">
                    <img 
                      src={`https://www.cryptocompare.com/media/37746251/${crypto.symbol.toLowerCase()}.png`}
                      alt={crypto.name}
                      className="w-6 h-6 mr-2"
                      onError={(e) => {
                        // Fallback for missing icons
                        (e.target as HTMLImageElement).src = 'https://www.cryptocompare.com/media/37746251/btc.png'
                      }}
                    />
                    <span>{crypto.name}</span>
                    <span className="text-gray-400 ml-2">{crypto.symbol}</span>
                    <Link 
                      href={`/crypto/${crypto.id}`} 
                      className="ml-2 text-blue-400 hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={12} />
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  {formatPrice(crypto.priceUsd)}
                </td>
                <td className={`py-4 px-2 text-right ${isPositive ? 'crypto-up' : 'crypto-down'}`}>
                  <div className="flex items-center justify-end">
                    {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {formatPercent(crypto.changePercent24Hr)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                    maximumFractionDigits: 2
                  }).format(parseFloat(crypto.marketCapUsd))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoList
