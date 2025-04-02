'use client'

const Footer = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-800">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CryptoWeather Nexus. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Powered by CoinCap, CoinGecko, OpenWeatherMap, and NewsData.io
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
