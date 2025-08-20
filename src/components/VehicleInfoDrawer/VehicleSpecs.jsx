import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material'
import { Build } from '@mui/icons-material'

export const VehicleSpecs = ({ searchResults }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* Enhanced Vehicle Specifications */}
      <Card sx={{ mb: 3, border: '1px solid rgba(33, 150, 243, 0.3)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <Build sx={{ mr: 1 }} />
            Vehicle Specifications
          </Typography>
          <Grid container spacing={2}>
            {/* Engine Specs */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                Engine Performance
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Engine:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.engine?.displacement}L {searchResults?.vehicle?.engine?.configuration} {searchResults?.vehicle?.engine?.cylinders}-cylinder
                    {searchResults?.vehicle?.engine?.turbo ? ' Turbo' : ''}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Horsepower:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.engine?.horsepower} HP
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Torque:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.engine?.torque} lb-ft
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Fuel Type:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.engine?.fuel_type}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Transmission & Drivetrain */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                Drivetrain & Economy
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Transmission:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.transmission?.speeds}-speed {searchResults?.vehicle?.transmission?.type?.toLowerCase()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Drivetrain:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.drivetrain}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Fuel Economy:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.fuel_economy?.city}/{searchResults?.vehicle?.fuel_economy?.highway} mpg
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Body Style:</Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {searchResults?.vehicle?.body_style} ({searchResults?.vehicle?.doors} door)
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Original MSRP */}
          {searchResults?.vehicle?.original_pricing && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                Original Pricing ({searchResults?.vehicle?.year})
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>MSRP:</Typography>
                  <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                    {formatPrice(searchResults.vehicle.original_pricing.msrp)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Invoice:</Typography>
                  <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 500 }}>
                    {formatPrice(searchResults.vehicle.original_pricing.invoice)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Delivery:</Typography>
                  <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: 500 }}>
                    {formatPrice(searchResults.vehicle.original_pricing.delivery_charges)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Vehicle Specifications */}
      {searchResults?.vehicle?.engine_specs && (
        <Card sx={{ mb: 3, bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#2196F3', display: 'flex', alignItems: 'center' }}>
              <Build sx={{ mr: 1 }} />
              Enhanced Vehicle Specifications
            </Typography>
            <Grid container spacing={2}>
              {/* Engine Specs */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                  Engine Specifications
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Engine:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.engine_specs?.size || 'Unknown'}L {searchResults.vehicle.engine_specs?.configuration || 'Unknown'} {searchResults.vehicle.engine_specs?.cylinder || 'Unknown'}-cylinder
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Horsepower:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.engine_specs?.horsepower || 'Unknown'} HP @ {searchResults.vehicle.engine_specs?.rpm?.horsepower || 'Unknown'}RPM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Torque:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.engine_specs?.torque || 'Unknown'} lb-ft @ {searchResults.vehicle.engine_specs?.rpm?.torque || 'Unknown'}RPM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Fuel Type:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.engine_specs?.fuelType || 'Unknown'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Transmission & Drivetrain */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                  Transmission & Drivetrain
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Transmission:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.transmission_specs?.transmissionType || 'Unknown'} {searchResults.vehicle.transmission_specs?.numberOfSpeeds || ''}-speed
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Drivetrain:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.drivetrain || 'Unknown'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Fuel Economy:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.fuel_economy?.city || 'Unknown'}/{searchResults.vehicle.fuel_economy?.highway || 'Unknown'} mpg
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Body Style:</Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {searchResults.vehicle.categories?.vehicleStyle || 'Unknown'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  )
}
