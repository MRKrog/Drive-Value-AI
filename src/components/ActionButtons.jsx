import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

const ActionButtons = () => {
  const actions = [
    { label: 'Receive', icon: 'mdi:qrcode-scan' },
    { label: 'Send', icon: 'mdi:send' },
    { label: 'Swap', icon: 'mdi:swap-horizontal' },
    { label: 'Buy', icon: 'mdi:currency-usd' }
  ]

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {actions.map((action, index) => (
        <Grid item xs={3} key={index}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1A1A1A', // Dark grey background
              borderRadius: 3, // Rounded square shape
              py: 2,
              px: 1,
              minHeight: 80,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: '#1F1F1F', // Slightly lighter on hover
              },
            }}
          >
            <Icon 
              icon={action.icon} 
              width={24} 
              height={24} 
              style={{ 
                color: 'rgb(171, 159, 242)', // New purple color
                marginBottom: 7
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FFFFFF', // White text
                fontWeight: 500,
                textAlign: 'center',
                fontSize: '0.75rem'
              }}
            >
              {action.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default ActionButtons 