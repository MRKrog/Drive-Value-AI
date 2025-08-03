import React from 'react'
import { Box, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'

const BalanceDisplay = ({ balance, change, changePercent }) => {
  const isPositive = change >= 0
  
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 600, 
          mb: 1,
          color: '#FFFFFF', // Simple white text like the image
        }}
      >
        ${balance.toLocaleString()}
      </Typography>
      <Typography 
        variant="body1" 
        color={isPositive ? 'success.main' : 'error.main'}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 1,
          fontWeight: 500,
        }}
      >
        {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
        ${Math.abs(change).toLocaleString()} ({changePercent}%)
      </Typography>
    </Box>
  )
}

export default BalanceDisplay 