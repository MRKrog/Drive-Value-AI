import React from 'react'
import {
  Box,
  Typography,
  Chip
} from '@mui/material'

export const VehicleHeader = ({ searchResults, parsedAnalysis }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1, color: '#FFFFFF', fontWeight: 700 }}>
        {searchResults?.vehicle?.year} {searchResults?.vehicle?.make} {searchResults?.vehicle?.model} {searchResults?.vehicle?.trim}
      </Typography>
      <Typography variant="body1" sx={{ color: '#A0A0A0', mb: 2 }}>
        VIN: {searchResults?.vehicle?.vin} | {searchResults?.vehicle?.body_style} | {searchResults?.vehicle?.vehicle_size}
      </Typography>
      
      {/* Key Stats Row */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Chip
          label={`Condition: ${parsedAnalysis?.condition?.charAt(0).toUpperCase() + parsedAnalysis?.condition?.slice(1)}`}
          sx={{
            bgcolor: parsedAnalysis?.condition === 'excellent' ? 'rgba(76, 175, 80, 0.2)' :
                     parsedAnalysis?.condition === 'good' ? 'rgba(33, 150, 243, 0.2)' :
                     parsedAnalysis?.condition === 'fair' ? 'rgba(255, 152, 0, 0.2)' :
                     'rgba(244, 67, 54, 0.2)',
            color: parsedAnalysis?.condition === 'excellent' ? '#4CAF50' :
                   parsedAnalysis?.condition === 'good' ? '#2196F3' :
                   parsedAnalysis?.condition === 'fair' ? '#FF9800' :
                   '#F44336',
            fontWeight: 500
          }}
        />
        {parsedAnalysis?.mileageInfo?.actual && (
          <Chip
            label={`${parsedAnalysis.mileageInfo.actual.toLocaleString()} miles`}
            sx={{
              bgcolor: parsedAnalysis?.mileageInfo?.status === 'below_average' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
              color: parsedAnalysis?.mileageInfo?.status === 'below_average' ? '#4CAF50' : '#FF9800',
              fontWeight: 500
            }}
          />
        )}
        {parsedAnalysis?.mileageInfo?.variance_percentage && (
          <Chip
            label={`${parsedAnalysis.mileageInfo.variance_percentage}% ${parsedAnalysis.mileageInfo.status?.replace('_', ' ')} mileage`}
            sx={{
              bgcolor: 'rgba(171, 159, 242, 0.2)',
              color: 'rgb(171, 159, 242)',
              fontWeight: 500
            }}
          />
        )}
        {parsedAnalysis?.mileageInfo?.status === 'estimated' && (
          <Chip
            label="Standard mileage assumed"
            sx={{
              bgcolor: 'rgba(255, 193, 7, 0.2)',
              color: '#FFC107',
              fontWeight: 500
            }}
          />
        )}
      </Box>
    </Box>
  )
}
