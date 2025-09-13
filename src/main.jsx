import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { theme } from './theme'
import { store } from './store'
import { AuthProvider } from './contexts/AuthContext'
import Router from './routes/Router'
import './global.css'

function DriveValueApp() {
  // You'll need to set this in your environment variables
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your_google_client_id_here"
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DriveValueApp />
  </React.StrictMode>
)