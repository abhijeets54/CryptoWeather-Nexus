import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  type: 'price_alert' | 'weather_alert'
  message: string
  timestamp: number
  read: boolean
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const { type, message } = action.payload
      state.notifications.unshift({
        id: Date.now().toString(),
        type,
        message,
        timestamp: Date.now(),
        read: false,
      })
      
      // Keep only the latest 20 notifications
      if (state.notifications.length > 20) {
        state.notifications = state.notifications.slice(0, 20)
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true
      })
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
