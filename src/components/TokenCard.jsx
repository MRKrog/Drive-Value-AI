import React from 'react'
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material'
import { Icon } from '@iconify/react'

const TokenCard = ({ token }) => {
  const { name, symbol, amount, value, change, icon } = token
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <Card sx={{ 
      borderRadius: 4,
      marginBottom: 0,
    }}>
      <CardContent sx={{ py: 3, px: 3, cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
                fontSize: '16px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon icon={icon} width={20} height={20} />
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#FFFFFF' }}>
                {name}
              </Typography>
              <Typography variant="body2" color="#A0A0A0">
                {amount} {symbol}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#FFFFFF' }}>
              ${value.toLocaleString()}
            </Typography>
            <Typography 
              variant="body2" 
              color={
                isNeutral 
                  ? '#A0A0A0' 
                  : isPositive 
                    ? '#00D4AA' 
                    : '#EF4444'
              }
              sx={{ fontWeight: 500 }}
            >
              {change < 0 ? '-' : ''}${Math.abs(change).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TokenCard 