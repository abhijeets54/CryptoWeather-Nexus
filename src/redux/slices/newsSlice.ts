import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { NewsItem } from '@/types/news'

interface NewsState {
  newsItems: NewsItem[]
  category: string
  isLoading: boolean
  error: string | null
}

const initialState: NewsState = {
  newsItems: [],
  category: 'crypto',
  isLoading: false,
  error: null,
}

// Async thunk for fetching news data
export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEWS_API_URL}?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&q=${category}&language=en&size=5`
      )
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.status === 'success' && data.results) {
        return data.results
      } else {
        throw new Error(data.results?.message || 'Failed to fetch news')
      }
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.isLoading = false
        state.newsItems = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCategory } = newsSlice.actions
export const newsReducer = newsSlice.reducer
