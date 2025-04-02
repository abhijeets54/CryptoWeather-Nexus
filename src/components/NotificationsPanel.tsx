'use client'

import { useState } from 'react'
import { FaBell, FaTimes, FaCheck } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { markAsRead, markAllAsRead, clearNotifications } from '@/redux/slices/notificationsSlice'

const NotificationsPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications } = useAppSelector(state => state.notifications)
  const dispatch = useAppDispatch()
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const togglePanel = () => {
    setIsOpen(!isOpen)
  }
  
  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }
  
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }
  
  const handleClearAll = () => {
    dispatch(clearNotifications())
  }
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
        onClick={togglePanel}
        aria-label="Notifications"
      >
        <FaBell className="text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex space-x-2">
              <button
                className="text-xs text-gray-400 hover:text-white"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
              <button
                className="text-xs text-gray-400 hover:text-white"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                    !notification.read ? 'bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <span className={`text-xs ${
                      notification.type === 'price_alert' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {notification.type === 'price_alert' ? 'Price Alert' : 'Weather Alert'}
                    </span>
                    <span className="text-xs text-gray-400">{formatTime(notification.timestamp)}</span>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                  {!notification.read && (
                    <button
                      className="mt-2 text-xs flex items-center text-blue-400 hover:text-blue-300"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <FaCheck className="mr-1" /> Mark as read
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsPanel
