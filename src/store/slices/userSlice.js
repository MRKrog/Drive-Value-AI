import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Basic user profile
  profile: {
    id: 'user_123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: null,
    location: 'San Francisco, CA',
    memberSince: 'January 2024'
  },
  
  // User preferences
  preferences: {
    theme: 'dark',
    currency: 'USD',
    units: 'imperial'
  },
  
  // User stats
  stats: {
    totalSearches: 47,
    favoriteVehicles: 12,
    searchStreak: 5
  },
  
  // Subscription info
  subscription: {
    plan: 'premium',
    status: 'active',
    price: 29.99,
    nextBilling: 'February 1, 2024'
  },
  
  // Recent activity
  recentSearches: [
    {
      id: '1',
      vin: 'JF1GR8H6XBL831881',
      make: 'Subaru',
      model: 'Impreza WRX STI',
      year: 2011,
      date: '2024-01-15'
    },
    {
      id: '2',
      vin: '1HGBH41JXMN109186',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      date: '2024-01-14'
    }
  ],
  
  // Favorites
  favorites: [
    {
      id: '1',
      vin: 'JF1GR8H6XBL831881',
      make: 'Subaru',
      model: 'Impreza WRX STI',
      year: 2011,
      notes: 'Dream car - check prices regularly'
    },
    {
      id: '2',
      vin: '1HGBH41JXMN109186',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      notes: 'Good daily driver option'
    }
  ]
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    addToFavorites: (state, action) => {
      state.favorites.unshift(action.payload)
      state.stats.favoriteVehicles = state.favorites.length
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload)
      state.stats.favoriteVehicles = state.favorites.length
    },
    addSearch: (state, action) => {
      state.recentSearches.unshift(action.payload)
      state.stats.totalSearches += 1
    }
  }
})

export const {
  updateProfile,
  updatePreferences,
  addToFavorites,
  removeFromFavorites,
  addSearch
} = userSlice.actions

export default userSlice.reducer
