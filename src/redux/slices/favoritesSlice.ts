import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  favoriteCities: string[]
  favoriteCryptos: string[]
}

const initialState: FavoritesState = {
  favoriteCities: [],
  favoriteCryptos: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter(c => c !== city)
      } else {
        state.favoriteCities.push(city)
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const crypto = action.payload
      if (state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(c => c !== crypto)
      } else {
        state.favoriteCryptos.push(crypto)
      }
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
