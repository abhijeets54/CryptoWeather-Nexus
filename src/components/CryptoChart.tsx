'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchCryptoHistory } from '@/redux/slices/cryptoSlice'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { RootState } from '@/redux/store'
import { ChartData } from '@/types/crypto'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CryptoChartProps {
  selectedCrypto: string
}

const CryptoChart = ({ selectedCrypto }: CryptoChartProps) => {
  const dispatch = useAppDispatch()
  const { cryptoHistory, isLoading } = useAppSelector((state: RootState) => state.crypto)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [timeframe, setTimeframe] = useState<string>('week')

  useEffect(() => {
    if (selectedCrypto) {
      dispatch(fetchCryptoHistory(selectedCrypto))
    }
  }, [dispatch, selectedCrypto])

  useEffect(() => {
    if (cryptoHistory && cryptoHistory.length > 0) {
      // Format data for chart
      const labels = cryptoHistory.map((item: any) => {
        const date = new Date(item.timestamp)
        return date.toLocaleDateString()
      })
      
      const prices = cryptoHistory.map((item: any) => item.price)
      
      setChartData({
        labels,
        datasets: [
          {
            label: `${selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Price (USD)`,
            data: prices,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      })
    }
  }, [cryptoHistory, selectedCrypto])

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    // In a real app, we would fetch different timeframe data here
  }

  if (isLoading || !chartData) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-40 w-full bg-gray-700 rounded-md"></div>
          <div className="h-6 w-1/2 bg-gray-700 rounded-md mt-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <button
          className={`px-3 py-1 rounded-md text-sm ${timeframe === 'day' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => handleTimeframeChange('day')}
        >
          24H
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${timeframe === 'week' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => handleTimeframeChange('week')}
        >
          7D
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${timeframe === 'month' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => handleTimeframeChange('month')}
        >
          30D
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${timeframe === 'year' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => handleTimeframeChange('year')}
        >
          1Y
        </button>
      </div>
      
      <div className="h-60">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 7
                }
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  callback: function(value) {
                    return '$' + value.toLocaleString()
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || ''
                    if (label) {
                      label += ': '
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                      }).format(context.parsed.y)
                    }
                    return label
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default CryptoChart
