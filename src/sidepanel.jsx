import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { store } from './store'
import HomePage from './pages/HomePage'
import SwapPage from './pages/SwapPage'
import HistoryPage from './pages/HistoryPage'
import SearchPage from './pages/SearchPage'
import BottomNavigation from './components/BottomNavigation'
import Header from './components/Header'

function CryptoWalletApp() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />
      case 'search':
        return <SearchPage />
      case 'swap':
        return <SwapPage />
      case 'history':
        return <HistoryPage />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          width: '100%',
          overflow: 'hidden',
          pt: 8, // Add top padding for fixed header
        }}>
          <Header />
          {renderPage()}
          <BottomNavigation 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CryptoWalletApp />
  </React.StrictMode>
) 