import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 'search',
  searchFilters: {
    make: '',
    model: '',
    year: '',
    priceRange: [0, 100000],
    condition: 'all'
  },
  recentSearches: [],
  searchSuggestions: [],
  isSearching: false
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload }
    },
    clearSearchFilters: (state) => {
      state.searchFilters = initialState.searchFilters
    },
    addRecentSearch: (state, action) => {
      const search = action.payload
      const exists = state.recentSearches.find(s => s.vin === search.vin)
      if (!exists) {
        state.recentSearches = [search, ...state.recentSearches.slice(0, 9)]
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = []
    },
    setSearchSuggestions: (state, action) => {
      state.searchSuggestions = action.payload
    },
    clearSearchSuggestions: (state) => {
      state.searchSuggestions = []
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload
    }
  }
})

export const {
  setCurrentPage,
  setSearchFilters,
  clearSearchFilters,
  addRecentSearch,
  clearRecentSearches,
  setSearchSuggestions,
  clearSearchSuggestions,
  setIsSearching
} = searchSlice.actions

export default searchSlice.reducer
