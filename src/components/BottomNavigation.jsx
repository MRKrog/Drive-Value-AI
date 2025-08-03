import React from 'react'
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material'
import {
  Home,
  SwapHoriz,
  History,
  Search
} from '@mui/icons-material'

const BottomNavigation = ({ currentPage, onPageChange }) => {
  const navigationItems = [
    { label: 'Home', value: 'home', icon: <Home sx={{ fontSize: 30 }} /> },
    { label: 'Swap', value: 'swap', icon: <SwapHoriz sx={{ fontSize: 30 }} /> },
    { label: 'History', value: 'history', icon: <History sx={{ fontSize: 30 }} /> },
    { label: 'Search', value: 'search', icon: <Search sx={{ fontSize: 30 }} /> }
  ]

  return (
    <MuiBottomNavigation
      value={currentPage}
      onChange={(event, newValue) => onPageChange(newValue)}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 4
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