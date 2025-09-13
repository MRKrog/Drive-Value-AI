import React from 'react'
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Person,
  History,
  Search
} from '@mui/icons-material'
import { PATH_DASHBOARD } from '../routes/paths'

const BottomNavigation = ({ sx = {} }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navigationItems = [
    { label: 'Home', value: 'home', path: PATH_DASHBOARD.home, icon: <Home sx={{ fontSize: 30 }} /> },
    { label: 'Search', value: 'search', path: PATH_DASHBOARD.search, icon: <Search sx={{ fontSize: 30 }} /> },
    { label: 'History', value: 'history', path: PATH_DASHBOARD.history, icon: <History sx={{ fontSize: 30 }} /> },
    { label: 'Profile', value: 'profile', path: PATH_DASHBOARD.profile, icon: <Person sx={{ fontSize: 30 }} /> },
  ]

  // Get current page from pathname
  const currentPath = location.pathname
  const currentItem = navigationItems.find(item => item.path === currentPath)
  const currentValue = currentItem ? currentItem.value : 'home'

  const handleChange = (event, newValue) => {
    const item = navigationItems.find(nav => nav.value === newValue)
    if (item) {
      navigate(item.path)
    }
  }

  return (
    <MuiBottomNavigation
      value={currentValue}
      onChange={handleChange}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 5,
        ...sx
      }}
    >
      {navigationItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          value={item.value}
          icon={item.icon}
          sx={{
            '&.Mui-selected': {
              color: 'primary.main',
            },
          }}
        />
      ))}
    </MuiBottomNavigation>
  )
}

export default BottomNavigation 