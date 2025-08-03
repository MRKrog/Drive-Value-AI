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
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
  ButtonGroup
} from '@mui/material'
import { Search } from '@mui/icons-material'
import Header from '../components/Header'
import { VehicleInfoDrawer } from '../components/VehicleInfoDrawer'

const SearchPage = () => {
  const [vin, setVin] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [error, setError] = useState('')
  const [isTestMode, setIsTestMode] = useState(false)

  // Test VINs for quick selection
  const testVins = [
    { name: 'Chevrolet Malibu', vin: '1G1ZD5ST8JF134138' },
    { name: 'Honda Civic', vin: '1HGBH41JXMN109186' },
    { name: 'Ford F-150', vin: '1FTFW1ET5DFC10312' }
  ]

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

    try {
      const apiEndpoint = isTestMode 
        ? 'https://autovalidation-backend-production.up.railway.app/api/test-valuation'
        : 'https://autovalidation-backend-production.up.railway.app/api/valuation'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin: vin.toUpperCase() })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.analysis) {
        // Parse the analysis data and extract vehicle information
        const analysis = data.analysis
        const results = {
          vin: vin.toUpperCase(),
          analysis: analysis,
          vehicle: data.vehicle, // Include the vehicle object
          report_id: data.report_id,
          timestamp: data.timestamp,
          generated_by: data.generated_by,
          // Extract basic vehicle info from vehicle object
          make: data.vehicle?.make || 'Unknown',
          model: data.vehicle?.model || 'Unknown',
          year: data.vehicle?.year || 'Unknown',
          trim: data.vehicle?.trim || 'Unknown',
          engine: data.vehicle?.engine || 'Unknown',
          transmission: data.vehicle?.transmission || 'Unknown',
          drivetrain: data.vehicle?.drivetrain || 'Unknown',
          fuelType: data.vehicle?.fuelType || 'Unknown',
          bodyStyle: data.vehicle?.bodyStyle || 'Unknown',
          doors: data.vehicle?.doors || 'Unknown',
          seats: data.vehicle?.seats || 'Unknown',
          mileage: data.vehicle?.mileage || 'Unknown',
          color: data.vehicle?.color || 'Unknown',
          features: data.vehicle?.features || []
        }
        setSearchResults(results)
        setIsDrawerOpen(true) // Open drawer when results are received
      } else {
        throw new Error('No analysis data received from API')
      }
    } catch (error) {
      console.error('API Error:', error)
      setError(`Failed to get vehicle information: ${error.message}`)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleTestVinSelect = (selectedVin) => {
    setVin(selectedVin)
  }

  const handleClear = () => {
    setVin('')
    setSearchResults(null)
    setIsDrawerOpen(false)
    setError('')
  }

  const handleOpenDrawer = () => {
    if (searchResults) {
      setIsDrawerOpen(true)
    }
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <Box sx={{ pb: 7, height: '100vh', overflow: 'auto' }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: '#FFFFFF' }}>
            Vehicle Search
          </Typography>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* API Mode Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={isTestMode}
                  onChange={(e) => setIsTestMode(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'rgb(171, 159, 242)',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'rgb(171, 159, 242)',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: '#FFFFFF', fontSize: '0.875rem' }}>
                  {isTestMode ? 'Test Mode' : 'Live Mode'}
                </Typography>
              }
            />
            
            {/* Clear Button */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleClear}
              disabled={isSearching}
              sx={{
                color: '#A0A0A0',
                borderColor: '#2A2A2A',
                fontSize: '0.75rem',
                px: 2,
                '&:hover': {
                  borderColor: '#A0A0A0',
                  color: '#FFFFFF',
                },
                '&:disabled': {
                  borderColor: '#2A2A2A',
                  color: '#2A2A2A',
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        
        {/* Mode Description */}
        <Typography variant="body2" sx={{ mb: 3, color: '#A0A0A0' }}>
          {isTestMode ? 'Using test API with predefined responses' : 'Using live API with real-time analysis'}
        </Typography>
        
        {/* Search Input */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
              Enter VIN Number
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#A0A0A0' }}>
              Enter the 17-character Vehicle Identification Number to get detailed vehicle information
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="VIN Number"
                  placeholder="1G1ZD5ST8JF134138"
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

            {/* Test VIN Quick Select */}
            {isTestMode && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ mb: 2, color: '#A0A0A0' }}>
                  Quick Test VINs:
                </Typography>
                <ButtonGroup variant="outlined" size="small">
                  {testVins.map((testVin) => (
                    <Button
                      key={testVin.vin}
                      onClick={() => handleTestVinSelect(testVin.vin)}
                      sx={{
                        color: 'rgb(171, 159, 242)',
                        borderColor: 'rgb(171, 159, 242)',
                        '&:hover': {
                          borderColor: 'rgb(157, 143, 239)',
                          color: 'rgb(157, 143, 239)',
                        },
                      }}
                    >
                      {testVin.name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* View Results Button */}
        {searchResults && !isDrawerOpen && (
          <Card sx={{ mt: 2, bgcolor: 'rgba(171, 159, 242, 0.1)', border: '1px solid rgba(171, 159, 242, 0.3)' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                Vehicle analysis complete! View detailed results below.
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenDrawer}
                startIcon={<Search />}
                sx={{
                  bgcolor: 'rgb(171, 159, 242)',
                  '&:hover': {
                    bgcolor: 'rgb(157, 143, 239)',
                  },
                }}
              >
                View {searchResults?.vehicle?.year} {searchResults?.vehicle?.make} {searchResults?.vehicle?.model} Analysis
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Vehicle Information Drawer */}
        <VehicleInfoDrawer 
          searchResults={searchResults}
          onClose={handleCloseDrawer}
          open={isDrawerOpen}
        />

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