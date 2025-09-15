import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { theme } from './theme'
import { store } from './store'
import AuthInitializer from './components/AuthInitializer'
import Router from './routes/Router'
import './global.css'

function DriveValueApp() {
  // You'll need to set this in your environment variables
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "181168409570-cgi2dgpi40rqrveeklijvkj70suk0ks9.apps.googleusercontent.com"
  
  // Debug: Log the client ID to console
  console.log('Google Client ID:', googleClientId)
  console.log('Environment variables:', import.meta.env)
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        <AuthInitializer>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </AuthInitializer>
      </Provider>
    </GoogleOAuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DriveValueApp />
  </React.StrictMode>
)