import { configureStore } from '@reduxjs/toolkit'
import { cryptoReducer } from './slices/cryptoSlice'
import { weatherReducer } from './slices/weatherSlice'
import { newsReducer } from './slices/newsSlice'
import { favoritesReducer } from './slices/favoritesSlice'
import { notificationsReducer } from './slices/notificationsSlice'

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
