import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDrawerOpen: false,
  theme: 'dark',
  sidebarCollapsed: false,
  notifications: [],
  loadingStates: {
    search: false,
    valuation: false,
    history: false
  },
  modals: {
    settings: false,
    help: false,
    about: false
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload
      }
      state.notifications = [notification, ...state.notifications.slice(0, 4)]
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notif => notif.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload
      state.loadingStates[key] = isLoading
    },
    setModalOpen: (state, action) => {
      const { modal, isOpen } = action.payload
      state.modals[modal] = isOpen
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false
      })
    }
  }
})

export const {
  setDrawerOpen,
  toggleDrawer,
  setTheme,
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoadingState,
  setModalOpen,
  closeAllModals
} = uiSlice.actions

export default uiSlice.reducer
