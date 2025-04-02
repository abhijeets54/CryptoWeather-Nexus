# CryptoWeather Nexus

A comprehensive cryptocurrency and weather dashboard with real-time price tracking, historical charts, weather information, and crypto news.

## Features

- **Real-time Cryptocurrency Data**: Track top cryptocurrencies with live price updates via WebSocket
- **Interactive Charts**: View historical price data with multiple timeframe options
- **Weather Widget**: Check current weather conditions for any city
- **News Feed**: Stay updated with the latest crypto and finance news
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling the application
- **Chart.js**: For rendering interactive cryptocurrency charts
- **SWR**: For data fetching and caching
- **React Icons**: For UI icons

## APIs Used

- **CoinCap API**: For cryptocurrency data and WebSocket price updates
- **CoinGecko API**: For additional cryptocurrency data
- **OpenWeatherMap API**: For weather information
- **NewsData.io API**: For crypto and finance news

## Getting Started

### Prerequisites

- Node.js 18.18 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cryptoweather-nexus.git
cd cryptoweather-nexus
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with your API keys (already provided in this project)

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm run start
```

## Deployment on Vercel

This project is configured for easy deployment on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "New Project" and import your repository

4. Configure the following environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_WEATHER_API_KEY`
   - `NEXT_PUBLIC_WEATHER_API_URL`
   - `NEXT_PUBLIC_COINGECKO_API_KEY`
   - `NEXT_PUBLIC_COINGECKO_API_URL`
   - `NEXT_PUBLIC_NEWS_API_KEY`
   - `NEXT_PUBLIC_NEWS_API_URL`

5. Click "Deploy" and wait for the build to complete

6. Your application will be available at the provided Vercel URL

## License

This project is licensed under the MIT License.
