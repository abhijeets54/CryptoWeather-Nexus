'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchCryptoList, setSelectedCrypto } from '@/redux/slices/cryptoSlice'
import { fetchAllCitiesWeather } from '@/redux/slices/weatherSlice'
import { fetchNewsData } from '@/redux/slices/newsSlice'
import { addNotification } from '@/redux/slices/notificationsSlice'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import CryptoList from '@/components/CryptoList'
import CryptoChart from '@/components/CryptoChart'
import WeatherWidget from '@/components/WeatherWidget'
import NewsWidget from '@/components/NewsWidget'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

export default function Home() {
  const dispatch = useAppDispatch()
  const { cryptoList, selectedCrypto, isLoading } = useAppSelector((state: RootState) => state.crypto as any)
  const { category } = useAppSelector((state: RootState) => state.news as any)
  
  // Initial data loading
  useEffect(() => {
    dispatch(fetchCryptoList())
    dispatch(fetchAllCitiesWeather())
    dispatch(fetchNewsData(category))
    
    // Set up polling for updates
    const cryptoPollInterval = setInterval(() => {
      dispatch(fetchCryptoList())
    }, 60000) // Poll every 60 seconds
    
    // Set up simulated WebSocket for price alerts
    const priceAlertInterval = setInterval(() => {
      // Randomly select a crypto to simulate a price alert
      if (cryptoList.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(3, cryptoList.length))
        const crypto = cryptoList[randomIndex]
        const priceChange = Math.random() > 0.5 ? 'up' : 'down'
        const percentChange = (Math.random() * 5 + 1).toFixed(2)
        
        const message = `${crypto.name} (${crypto.symbol}) price ${priceChange} by ${percentChange}%`
        
        // Add notification
        dispatch(addNotification({
          type: 'price_alert',
          message
        }))
        
        // Show toast notification
        toast(message, {
          icon: priceChange === 'up' ? '📈' : '📉',
          duration: 5000,
        })
      }
    }, 45000) // Simulate alerts every 45 seconds
    
    // Simulate weather alerts
    const weatherAlertInterval = setInterval(() => {
      const weatherEvents = [
        'Heavy rain expected in New York',
        'Heat wave alert for London',
        'Thunderstorm warning for Tokyo',
        'Strong winds expected in Paris',
        'Snowfall warning for Moscow'
      ]
      
      const randomEvent = weatherEvents[Math.floor(Math.random() * weatherEvents.length)]
      
      // Add notification
      dispatch(addNotification({
        type: 'weather_alert',
        message: randomEvent
      }))
      
      // Show toast notification
      toast(randomEvent, {
        icon: '🌦️',
        duration: 5000,
      })
    }, 120000) // Simulate weather alerts every 2 minutes
    
    return () => {
      clearInterval(cryptoPollInterval)
      clearInterval(priceAlertInterval)
      clearInterval(weatherAlertInterval)
    }
  }, [dispatch, category, cryptoList.length])
  
  const handleSelectCrypto = (id: string) => {
    dispatch(setSelectedCrypto(id))
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4">Cryptocurrency Chart</h2>
            <CryptoChart selectedCrypto={selectedCrypto} />
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Top Cryptocurrencies</h2>
            <CryptoList 
              cryptoData={cryptoList} 
              isLoading={isLoading} 
              selectedCrypto={selectedCrypto}
              onSelectCrypto={handleSelectCrypto}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <WeatherWidget />
          <NewsWidget />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
