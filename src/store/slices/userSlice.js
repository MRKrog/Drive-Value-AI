// store/userSlice.js - Updated Redux User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ENDPOINTS, getFetchOptions } from '../../config/api'

// Async thunks for API calls
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, getFetchOptions('GET'));
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, getFetchOptions('PUT', profileData));
      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferencesData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PREFERENCES, getFetchOptions('PUT', preferencesData));
      if (!response.ok) throw new Error('Failed to update preferences');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addVehicleToFavorites = createAsyncThunk(
  'user/addToFavorites',
  async (vehicleData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.FAVORITES, getFetchOptions('POST', vehicleData));
      if (!response.ok) throw new Error('Failed to add to favorites');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeVehicleFromFavorites = createAsyncThunk(
  'user/removeFromFavorites',
  async (vin, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.USER.FAVORITES}/${vin}`, getFetchOptions('DELETE'));
      if (!response.ok) throw new Error('Failed to remove from favorites');
      return vin;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const recordVehicleSearch = createAsyncThunk(
  'user/recordSearch',
  async (searchData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.SEARCHES, getFetchOptions('POST', searchData));
      if (!response.ok) throw new Error('Failed to record search');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Loading states
  loading: false,
  error: null,
  
  // Authentication
  isAuthenticated: false,
  
  // Basic user profile
  profile: {
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    name: '',
    avatar: null,
    city: '',
    state: '',
    memberSince: null
  },
  
  // User preferences
  preferences: {
    theme: 'dark',
    currency: 'USD',
    units: 'imperial'
  },
  
  // User stats
  stats: {
    totalSearches: 0,
    favoriteVehicles: 0,
    searchStreak: 0
  },
  
  // Subscription info
  subscription: {
    plan: 'free',
    status: 'active',
    price: 0,
    nextBilling: null
  },
  
  // Recent activity
  recentSearches: [],
  
  // Favorites
  favorites: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Local state updates (optimistic updates)
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      return { ...initialState };
    },
    clearError: (state) => {
      state.error = null;
    },
    // Local reducers for immediate UI updates (before API call)
    updateProfileLocal: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    updatePreferencesLocal: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    addToFavoritesLocal: (state, action) => {
      state.favorites.unshift(action.payload)
      state.stats.favoriteVehicles = state.favorites.length
    },
    removeFromFavoritesLocal: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.vin !== action.payload)
      state.stats.favoriteVehicles = state.favorites.length
    },
    addSearchLocal: (state, action) => {
      state.recentSearches.unshift(action.payload)
      state.stats.totalSearches += 1
      // Keep only last 20 in frontend
      if (state.recentSearches.length > 20) {
        state.recentSearches = state.recentSearches.slice(0, 20);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Map backend data to frontend structure
        const userData = action.payload;
        state.profile = {
          id: userData._id,
          email: userData.email,
          firstName: userData.profile?.firstName || '',
          lastName: userData.profile?.lastName || '',
          name: userData.profile?.name || '',
          avatar: userData.profile?.avatar,
          city: userData.profile?.city || '',
          state: userData.profile?.state || '',
          memberSince: userData.createdAt
        };
        state.preferences = userData.preferences || state.preferences;
        state.stats = userData.stats || state.stats;
        state.subscription = userData.subscription || state.subscription;
        state.recentSearches = userData.recentSearches || [];
        state.favorites = userData.favorites || [];
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload.profile };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = { ...state.preferences, ...action.payload.preferences };
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to Favorites
      .addCase(addVehicleToFavorites.fulfilled, (state, action) => {
        // Update with server response (in case of any server-side modifications)
        const newFavorite = action.payload.favorite;
        // Remove if already exists (shouldn't happen but just in case)
        state.favorites = state.favorites.filter(fav => fav.vin !== newFavorite.vin);
        // Add to beginning
        state.favorites.unshift(newFavorite);
        state.stats.favoriteVehicles = state.favorites.length;
      })
      .addCase(addVehicleToFavorites.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Remove from Favorites
      .addCase(removeVehicleFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(fav => fav.vin !== action.payload);
        state.stats.favoriteVehicles = state.favorites.length;
      })
      .addCase(removeVehicleFromFavorites.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Record Search
      .addCase(recordVehicleSearch.fulfilled, (state, action) => {
        const newSearch = action.payload.search;
        state.recentSearches.unshift(newSearch);
        state.stats.totalSearches += 1;
        // Keep only last 20 in frontend
        if (state.recentSearches.length > 20) {
          state.recentSearches = state.recentSearches.slice(0, 20);
        }
      })
      .addCase(recordVehicleSearch.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const {
  setAuthenticated,
  logout,
  clearError,
  updateProfileLocal,
  updatePreferencesLocal,
  addToFavoritesLocal,
  removeFromFavoritesLocal,
  addSearchLocal
} = userSlice.actions;

export default userSlice.reducer;

// Selectors for easy data access
export const selectUser = (state) => state.user;
export const selectProfile = (state) => state.user.profile;
export const selectPreferences = (state) => state.user.preferences;
export const selectStats = (state) => state.user.stats;
export const selectSubscription = (state) => state.user.subscription;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;