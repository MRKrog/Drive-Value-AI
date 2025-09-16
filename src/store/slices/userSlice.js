// store/userSlice.js - Updated Redux User Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ENDPOINTS, getFetchOptions } from '../../config/api'

// Auth thunks
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, getFetchOptions('POST', {
        email,
        password,
      }));
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store tokens and user data
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, getFetchOptions('POST', {
        email,
        password,
        firstName,
        lastName,
      }));
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Store tokens and user data
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (credentialResponse, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.GOOGLE, getFetchOptions('POST', {
        token: credentialResponse.credential
      }));
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Google login failed');
      }
      
      const data = await response.json();
      
      // Store tokens and user data
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  isInitialized: false,
  
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
    initialize: (state) => {
      // Check localStorage for existing auth (both custom and Google OAuth)
      const savedUser = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          state.isAuthenticated = true;
          state.profile = {
            id: user.id,
            email: user.email,
            firstName: user.profile?.firstName || '',
            lastName: user.profile?.lastName || '',
            name: user.profile?.name || '',
            avatar: user.profile?.avatar,
            city: user.profile?.city || '',
            state: user.profile?.state || '',
            memberSince: user.createdAt
          };
          state.preferences = user.preferences || state.preferences;
          state.stats = user.stats || state.stats;
          state.subscription = user.subscription || state.subscription;
          state.recentSearches = user.recentSearches || [];
          state.favorites = user.favorites || [];
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
      
      // Note: Google OAuth state is handled by the GoogleLogin component
      // and our loginWithGoogle thunk, so no additional Google-specific
      // initialization is needed here
      
      state.isInitialized = true;
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      console.log('Logout called');
      // Clear any Google OAuth related storage
      // Note: Google OAuth doesn't store additional state in localStorage
      // but we clear our own auth tokens
      
      // Reset state to initial values but keep isInitialized true
      return { ...initialState, isInitialized: true };
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
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Map backend data to frontend structure
        const userData = action.payload;
        state.profile = {
          id: userData.id,
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
        state.stats = {
          totalSearches: userData.stats?.totalSearches || 0,
          favoriteVehicles: userData.stats?.favoriteVehicles || 0,
          searchStreak: userData.stats?.searchStreak || 0
        };
        state.subscription = userData.subscription || state.subscription;
        state.recentSearches = userData.recentSearches || [];
        state.favorites = userData.favorites || [];
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Map backend data to frontend structure
        const userData = action.payload;
        state.profile = {
          id: userData.id,
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
        state.stats = {
          totalSearches: userData.stats?.totalSearches || 0,
          favoriteVehicles: userData.stats?.favoriteVehicles || 0,
          searchStreak: userData.stats?.searchStreak || 0
        };
        state.subscription = userData.subscription || state.subscription;
        state.recentSearches = userData.recentSearches || [];
        state.favorites = userData.favorites || [];
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Map backend data to frontend structure
        const userData = action.payload;
        state.profile = {
          id: userData.id,
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
        state.stats = {
          totalSearches: userData.stats?.totalSearches || 0,
          favoriteVehicles: userData.stats?.favoriteVehicles || 0,
          searchStreak: userData.stats?.searchStreak || 0
        };
        state.subscription = userData.subscription || state.subscription;
        state.recentSearches = userData.recentSearches || [];
        state.favorites = userData.favorites || [];
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
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
        state.stats = {
          totalSearches: userData.stats?.totalSearches || 0,
          favoriteVehicles: userData.stats?.favoriteVehicles || 0,
          searchStreak: userData.stats?.searchStreak || 0
        };
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
  initialize,
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