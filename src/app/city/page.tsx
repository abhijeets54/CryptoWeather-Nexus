'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllCitiesWeather } from '@/redux/slices/weatherSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa'

const CitiesPage = () => {
  const dispatch = useAppDispatch()
  const { weatherData, predefinedCities, isLoading } = useAppSelector((state: RootState) => state.weather as any)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAllCitiesWeather())
  }, [dispatch])

  const handleGoBack = () => {
    router.push('/')
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
        
        <h1 className="text-3xl font-bold mb-8">Cities Weather</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-40 bg-gray-700 rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedCities.map((city: string) => {
              const cityData = weatherData[city]
              
              return (
                <Link 
                  key={city}
                  href={`/city/${encodeURIComponent(city)}`}
                  className="card hover:bg-gray-800 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <FaMapMarkerAlt className="text-blue-400 mr-2" />
                      <h2 className="text-xl font-semibold">{city}</h2>
                    </div>
                    
                    {cityData ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold">{Math.round(cityData.main.temp)}°C</div>
                            <div className="text-gray-400 capitalize">{cityData.weather[0].description}</div>
                          </div>
                          <img 
                            src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                            alt={cityData.weather[0].description}
                            className="w-16 h-16"
                          />
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-400">
                          <div className="flex justify-between">
                            <span>Humidity</span>
                            <span>{cityData.main.humidity}%</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>Wind</span>
                            <span>{Math.round(cityData.wind.speed)} km/h</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400">Loading weather data...</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default CitiesPage
