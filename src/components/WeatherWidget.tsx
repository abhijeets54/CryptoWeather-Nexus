'use client'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchWeatherData, setSelectedCity, addPredefinedCity } from '@/redux/slices/weatherSlice'
import { toggleFavoriteCity } from '@/redux/slices/favoritesSlice'
import { FaMapMarkerAlt, FaTemperatureHigh, FaWind, FaCloudRain, FaStar, FaExternalLinkAlt } from 'react-icons/fa'
import { RootState } from '@/redux/store'
import Link from 'next/link'

const WeatherWidget = () => {
  const dispatch = useAppDispatch()
  const { weatherData, selectedCity, predefinedCities, isLoading, error } = useAppSelector((state: RootState) => state.weather as any)
  const { favoriteCities } = useAppSelector((state: RootState) => state.favorites as any)
  const [newCity, setNewCity] = useState('')

  const handleLocationChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCity.trim()) {
      dispatch(setSelectedCity(newCity))
      dispatch(fetchWeatherData(newCity))
      setNewCity('')
    }
  }

  const handleAddToPreset = () => {
    if (selectedCity && !predefinedCities.includes(selectedCity)) {
      dispatch(addPredefinedCity(selectedCity))
    }
  }

  const handleCityClick = (city: string) => {
    dispatch(setSelectedCity(city))
    dispatch(fetchWeatherData(city))
  }

  const handleToggleFavorite = (city: string) => {
    dispatch(toggleFavoriteCity(city))
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const isFavorite = (city: string): boolean => {
    return favoriteCities.includes(city)
  }

  const currentWeather = weatherData[selectedCity]

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          Weather
          <Link href="/weather" className="ml-2 text-blue-400 hover:text-blue-300">
            <FaExternalLinkAlt size={12} />
          </Link>
        </h2>
        <div className="flex space-x-1">
          {predefinedCities.map((city: string) => (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className={`px-2 py-1 text-xs rounded-md ${selectedCity === city ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleLocationChange} className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter city name"
          className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary rounded-l-none"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-24 bg-gray-700 rounded-md mb-2"></div>
          <div className="h-12 bg-gray-700 rounded-md"></div>
        </div>
      ) : currentWeather ? (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    {currentWeather.name}, {currentWeather.sys.country}
                    <Link 
                      href={`/city/${encodeURIComponent(currentWeather.name)}`} 
                      className="ml-2 text-blue-400 hover:text-blue-300"
                    >
                      <FaExternalLinkAlt size={12} />
                    </Link>
                  </h3>
                  <button
                    onClick={() => handleToggleFavorite(selectedCity)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <FaStar className={isFavorite(selectedCity) ? 'text-yellow-400' : ''} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <img 
                  src={getWeatherIcon(currentWeather.weather[0].icon)} 
                  alt={currentWeather.weather[0].description}
                  className="w-16 h-16 mr-2"
                />
                <div>
                  <div className="text-3xl font-bold">
                    {Math.round(currentWeather.main.temp)}°C
                  </div>
                  <div className="text-gray-300 capitalize">
                    {currentWeather.weather[0].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
            <div className="bg-gray-700 p-2 rounded-md">
              <FaTemperatureHigh className="inline-block mb-1 text-yellow-500" />
              <div>Feels like</div>
              <div className="font-medium">{Math.round(currentWeather.main.feels_like)}°C</div>
            </div>
            <div className="bg-gray-700 p-2 rounded-md">
              <FaWind className="inline-block mb-1 text-blue-400" />
              <div>Wind</div>
              <div className="font-medium">{Math.round(currentWeather.wind.speed)} m/s</div>
            </div>
            <div className="bg-gray-700 p-2 rounded-md">
              <FaCloudRain className="inline-block mb-1 text-blue-300" />
              <div>Humidity</div>
              <div className="font-medium">{currentWeather.main.humidity}%</div>
            </div>
          </div>
          
          {!predefinedCities.includes(selectedCity) && (
            <button
              onClick={handleAddToPreset}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
            >
              Add to Preset Cities
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No weather data available. Search for a city to view weather information.
        </div>
      )}
    </div>
  )
}

export default WeatherWidget
