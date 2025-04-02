import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { WeatherData } from '@/types/weather'

// Define the predefined cities
const PREDEFINED_CITIES = ['New York', 'London', 'Tokyo']

interface WeatherState {
  weatherData: Record<string, WeatherData>
  selectedCity: string
  predefinedCities: string[]
  isLoading: boolean
  error: string | null
}

const initialState: WeatherState = {
  weatherData: {},
  selectedCity: PREDEFINED_CITIES[0],
  predefinedCities: PREDEFINED_CITIES,
  isLoading: false,
  error: null,
}

// Async thunk for fetching weather data for a city
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      return { city, data }
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Async thunk for fetching weather data for all predefined cities
export const fetchAllCitiesWeather = createAsyncThunk(
  'weather/fetchAllCitiesWeather',
  async (_, { dispatch, getState }) => {
    const state = getState() as { weather: WeatherState }
    const { predefinedCities } = state.weather
    
    const promises = predefinedCities.map(city => 
      dispatch(fetchWeatherData(city))
    )
    
    await Promise.all(promises)
    return true
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload
    },
    addPredefinedCity: (state, action: PayloadAction<string>) => {
      if (!state.predefinedCities.includes(action.payload)) {
        state.predefinedCities.push(action.payload)
      }
    },
    removePredefinedCity: (state, action: PayloadAction<string>) => {
      state.predefinedCities = state.predefinedCities.filter(
        city => city !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.isLoading = false
        state.weatherData[action.payload.city] = action.payload.data
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedCity, addPredefinedCity, removePredefinedCity } = weatherSlice.actions
export const weatherReducer = weatherSlice.reducer
