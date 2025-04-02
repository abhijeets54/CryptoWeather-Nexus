import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CryptoData, CryptoHistoryData, CryptoDetails } from '@/types/crypto'

interface CryptoState {
  cryptoList: CryptoData[]
  cryptoHistory: CryptoHistoryData[]
  cryptoDetails: CryptoDetails | null
  selectedCrypto: string
  isLoading: boolean
  error: string | null
}

const initialState: CryptoState = {
  cryptoList: [],
  cryptoHistory: [],
  cryptoDetails: null,
  selectedCrypto: 'bitcoin',
  isLoading: false,
  error: null,
}

// Async thunk for fetching crypto list
export const fetchCryptoList = createAsyncThunk(
  'crypto/fetchCryptoList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
      )
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Transform CoinGecko data to match our expected format
      return data.map((coin: any) => ({
        id: coin.id,
        rank: coin.market_cap_rank.toString(),
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        supply: coin.circulating_supply?.toString() || '0',
        maxSupply: coin.total_supply?.toString() || null,
        marketCapUsd: coin.market_cap.toString(),
        volumeUsd24Hr: coin.total_volume.toString(),
        priceUsd: coin.current_price.toString(),
        changePercent24Hr: coin.price_change_percentage_24h?.toString() || '0',
        vwap24Hr: coin.current_price.toString(), // CoinGecko doesn't provide VWAP
        image: coin.image,
      }))
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Async thunk for fetching cryptocurrency history data
export const fetchCryptoHistory = createAsyncThunk(
  'crypto/fetchCryptoHistory',
  async (cryptoId: string, { rejectWithValue }) => {
    try {
      const days = '7' // Default to 7 days
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
      )
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      return data.prices.map((price: [number, number]) => ({
        timestamp: price[0],
        price: price[1]
      }))
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Async thunk for fetching cryptocurrency details
export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async (cryptoId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
      )
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload
    },
    updateCryptoPrices: (state, action: PayloadAction<Record<string, string>>) => {
      const newPrices = action.payload
      
      state.cryptoList = state.cryptoList.map(crypto => {
        if (newPrices[crypto.id]) {
          const oldPrice = parseFloat(crypto.priceUsd)
          const newPrice = parseFloat(newPrices[crypto.id])
          
          return {
            ...crypto,
            priceUsd: newPrices[crypto.id],
            priceChange: newPrice - oldPrice,
          }
        }
        return crypto
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCryptoList.fulfilled, (state, action) => {
        state.isLoading = false
        state.cryptoList = action.payload
      })
      .addCase(fetchCryptoList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchCryptoHistory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
        state.isLoading = false
        state.cryptoHistory = action.payload
      })
      .addCase(fetchCryptoHistory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.cryptoDetails = action.payload
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedCrypto, updateCryptoPrices } = cryptoSlice.actions
export const cryptoReducer = cryptoSlice.reducer
