import { configureStore } from '@reduxjs/toolkit'
import vehicleValuationReducer from './slices/vehicleValuationSlice'
import searchReducer from './slices/searchSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    vehicleValuation: vehicleValuationReducer,
    search: searchReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['vehicleValuation/setSearchResults'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['vehicleValuation.searchResults'],
      },
    }),
})
