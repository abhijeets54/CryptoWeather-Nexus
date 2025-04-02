'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchWeatherData } from '@/redux/slices/weatherSlice'
import { toggleFavoriteCity } from '@/redux/slices/favoritesSlice'
import { RootState } from '@/redux/store'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaStar, FaArrowLeft, FaTemperatureHigh, FaWind, FaCloudRain } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface HistoricalData {
  date: string
  temperature: number
  humidity: number
  windSpeed: number
}

const CityDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const cityName = decodeURIComponent(params.name as string)
  const dispatch = useAppDispatch()
  const { weatherData, isLoading, error } = useAppSelector((state: RootState) => state.weather as any)
  const { favoriteCities } = useAppSelector((state: RootState) => state.favorites as any)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])

  useEffect(() => {
    if (cityName) {
      dispatch(fetchWeatherData(cityName))
      
      // Generate mock historical data for the city
      const mockHistoricalData: HistoricalData[] = []
      const today = new Date()
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        
        mockHistoricalData.push({
          date: date.toLocaleDateString(),
          temperature: Math.round(Math.random() * 10 + 15), // Random temp between 15-25°C
          humidity: Math.round(Math.random() * 40 + 40), // Random humidity between 40-80%
          windSpeed: Math.round(Math.random() * 20 + 5), // Random wind speed between 5-25 km/h
        })
      }
      
      setHistoricalData(mockHistoricalData)
    }
  }, [dispatch, cityName])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(cityName))
    const message = isFavorite() 
      ? `${cityName} removed from favorites` 
      : `${cityName} added to favorites`
    toast(message)
  }

  const isFavorite = () => {
    return favoriteCities.includes(cityName)
  }

  const handleGoBack = () => {
    router.back()
  }

  const cityData = weatherData[cityName]

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
            <div className="h-40 bg-gray-700 rounded-md"></div>
            <div className="h-60 bg-gray-700 rounded-md"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 border border-red-500 rounded-md">
            Error loading weather data for {cityName}. Please try again.
          </div>
        ) : cityData ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">{cityName}</h1>
              <button 
                onClick={handleToggleFavorite}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <FaStar className={isFavorite() ? "text-yellow-400" : "text-gray-500"} size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold mb-2">{Math.round(cityData.main.temp)}°C</div>
                    <div className="text-gray-400 capitalize">{cityData.weather[0].description}</div>
                  </div>
                  <img 
                    src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                    alt={cityData.weather[0].description}
                    className="w-24 h-24"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <FaTemperatureHigh className="mx-auto text-blue-400 mb-2" size={20} />
                    <div className="text-sm text-gray-400">Feels Like</div>
                    <div className="font-semibold">{Math.round(cityData.main.feels_like)}°C</div>
                  </div>
                  <div className="text-center">
                    <FaWind className="mx-auto text-blue-400 mb-2" size={20} />
                    <div className="text-sm text-gray-400">Wind</div>
                    <div className="font-semibold">{Math.round(cityData.wind.speed)} km/h</div>
                  </div>
                  <div className="text-center">
                    <FaCloudRain className="mx-auto text-blue-400 mb-2" size={20} />
                    <div className="text-sm text-gray-400">Humidity</div>
                    <div className="font-semibold">{cityData.main.humidity}%</div>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Pressure</span>
                    <span>{cityData.main.pressure} hPa</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Visibility</span>
                    <span>{(cityData.visibility / 1000).toFixed(1)} km</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Cloudiness</span>
                    <span>{cityData.clouds.all}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Sunrise</span>
                    <span>{new Date(cityData.sys.sunrise * 1000).toLocaleTimeString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Sunset</span>
                    <span>{new Date(cityData.sys.sunset * 1000).toLocaleTimeString()}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">7-Day Historical Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Temperature (°C)</th>
                      <th className="pb-2">Humidity (%)</th>
                      <th className="pb-2">Wind (km/h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((data, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-3">{data.date}</td>
                        <td className="py-3">{data.temperature}°C</td>
                        <td className="py-3">{data.humidity}%</td>
                        <td className="py-3">{data.windSpeed} km/h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">No data available for {cityName}</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default CityDetailPage
