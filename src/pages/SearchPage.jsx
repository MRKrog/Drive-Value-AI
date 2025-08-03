import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material'
import { Search, DirectionsCar, Build, Person } from '@mui/icons-material'
import Header from '../components/Header'

const SearchPage = () => {
  const [vin, setVin] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!vin.trim()) {
      setError('Please enter a VIN number')
      return
    }

    if (vin.length < 17) {
      setError('VIN must be 17 characters long')
      return
    }

    setIsSearching(true)
    setError('')
    setSearchResults(null)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      // Mock results - in real app, this would be API call
      setSearchResults({
        vin: vin.toUpperCase(),
        make: 'Toyota',
        model: 'Camry',
        year: '2023',
        trim: 'SE',
        engine: '2.5L 4-Cylinder',
        transmission: '8-Speed Automatic',
        drivetrain: 'Front-Wheel Drive',
        fuelType: 'Gasoline',
        bodyStyle: 'Sedan',
        doors: '4',
        seats: '5',
        mileage: '15,234',
        color: 'Pearl White',
        features: ['Bluetooth', 'Backup Camera', 'Lane Departure Warning', 'Adaptive Cruise Control']
      })
    }, 2000)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box sx={{ pb: 7, height: '100vh', overflow: 'auto' }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#FFFFFF' }}>
          Vehicle Search
        </Typography>
        
        {/* Search Input */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
              Enter VIN Number
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#A0A0A0' }}>
              Enter the 17-character Vehicle Identification Number to get detailed vehicle information - ZPBUA1ZL9KLA00848
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="VIN Number"
                  placeholder="ZPBUA1ZL9KLA00848"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  error={!!error}
                  helperText={error}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#2A2A2A',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgb(171, 159, 242)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(171, 159, 242)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#A0A0A0',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'rgb(171, 159, 242)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  disabled={isSearching}
                  startIcon={isSearching ? <CircularProgress size={20} /> : <Search />}
                  sx={{
                    bgcolor: 'rgb(171, 159, 242)',
                    '&:hover': {
                      bgcolor: 'rgb(157, 143, 239)',
                    },
                    '&:disabled': {
                      bgcolor: '#2A2A2A',
                    },
                  }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                Vehicle Information
              </Typography>
              
              {/* Basic Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, color: '#FFFFFF', fontWeight: 600 }}>
                  {searchResults.year} {searchResults.make} {searchResults.model} {searchResults.trim}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                  VIN: {searchResults.vin}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: '#2A2A2A' }} />

              {/* Vehicle Details */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DirectionsCar sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Body Style
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                    {searchResults.bodyStyle}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Build sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Engine
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                    {searchResults.engine}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Seats
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                    {searchResults.seats}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DirectionsCar sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Drivetrain
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                    {searchResults.drivetrain}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 3, borderColor: '#2A2A2A' }} />

              {/* Features */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {searchResults.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(171, 159, 242, 0.1)',
                        color: 'rgb(171, 159, 242)',
                        border: '1px solid rgba(171, 159, 242, 0.3)',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  )
}

export default SearchPage 