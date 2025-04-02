'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchNewsData, setCategory } from '@/redux/slices/newsSlice'
import { FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa'
import { RootState } from '@/redux/store'
import { NewsItem } from '@/types/news'

const NewsWidget = () => {
  const dispatch = useAppDispatch()
  const { newsItems, category, isLoading, error } = useAppSelector((state: RootState) => state.news)

  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory))
    dispatch(fetchNewsData(newCategory))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <FaNewspaper className="mr-2 text-blue-400" />
          News
        </h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              category === 'crypto' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
            onClick={() => handleCategoryChange('crypto')}
          >
            Crypto
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              category === 'finance' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
            onClick={() => handleCategoryChange('finance')}
          >
            Finance
          </button>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-700 rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {newsItems.length > 0 ? (
            newsItems.map((item: NewsItem, index: number) => (
              <div key={index} className="border-b border-gray-700 pb-3 last:border-0">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <h3 className="font-medium mb-1 flex items-start">
                    <span>{item.title}</span>
                    <FaExternalLinkAlt className="text-xs ml-1 mt-1 text-gray-400" />
                  </h3>
                </a>
                <p className="text-sm text-gray-400 mb-1 line-clamp-2">
                  {item.description || 'No description available'}
                </p>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{item.source_id}</span>
                  <span>{formatDate(item.published_at)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-4">
              No news available for this category.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NewsWidget
