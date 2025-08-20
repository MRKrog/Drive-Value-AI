import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching vehicle valuation
export const fetchVehicleValuation = createAsyncThunk(
  'vehicleValuation/fetchValuation',
  async ({ vin, condition, mileage, isTest, isEnhanced }, { rejectWithValue }) => {
    try {
      const apiEndpoint = 'https://autovalidation-backend-production.up.railway.app/api/valuation'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          vin: vin.toUpperCase(),
          condition,
          ...(mileage && { mileage: parseInt(mileage) }),
          isTest,
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.ai_valuation || data.analysis) {
        return {
          ...data,
          analysis: data.ai_valuation || data.analysis,
          make: data.vehicle?.make || 'Unknown',
          model: data.vehicle?.model || 'Unknown',
          year: data.vehicle?.year || 'Unknown',
        }
      } else {
        throw new Error('No analysis data received from API')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  searchResults: null,
  isSearching: false,
  error: null,
  searchHistory: [],
  favoriteVehicles: [],
  currentVehicle: null,
  valuationParameters: {
    vin: '',
    condition: 'good',
    mileage: '',
    isTestMode: false,
    isEnhancedMode: false,
  }
}

const vehicleValuationSlice = createSlice({
  name: 'vehicleValuation',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
      state.error = null
    },
    clearSearchResults: (state) => {
      state.searchResults = null
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isSearching = false
    },
    clearError: (state) => {
      state.error = null
    },
    setValuationParameters: (state, action) => {
      state.valuationParameters = { ...state.valuationParameters, ...action.payload }
    },
    addToHistory: (state, action) => {
      const newEntry = {
        ...action.payload,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }
      state.searchHistory = [newEntry, ...state.searchHistory.slice(0, 9)] // Keep last 10
    },
    addToFavorites: (state, action) => {
      const vehicle = action.payload
      const exists = state.favoriteVehicles.find(fav => fav.vin === vehicle.vin)
      if (!exists) {
        state.favoriteVehicles.push({
          ...vehicle,
          addedAt: new Date().toISOString()
        })
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoriteVehicles = state.favoriteVehicles.filter(
        fav => fav.vin !== action.payload
      )
    },
    setCurrentVehicle: (state, action) => {
      state.currentVehicle = action.payload
    },
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleValuation.pending, (state) => {
        state.isSearching = true
        state.error = null
      })
      .addCase(fetchVehicleValuation.fulfilled, (state, action) => {
        state.isSearching = false
        state.searchResults = action.payload
        state.error = null
        // Add to history
        state.searchHistory = [
          {
            ...action.payload,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
          },
          ...state.searchHistory.slice(0, 9)
        ]
      })
      .addCase(fetchVehicleValuation.rejected, (state, action) => {
        state.isSearching = false
        state.error = action.payload || 'Failed to fetch vehicle valuation'
      })
  }
})

export const {
  setSearchResults,
  clearSearchResults,
  setError,
  clearError,
  setValuationParameters,
  addToHistory,
  addToFavorites,
  removeFromFavorites,
  setCurrentVehicle,
  clearCurrentVehicle
} = vehicleValuationSlice.actions

export default vehicleValuationSlice.reducer
