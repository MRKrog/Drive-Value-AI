import React from 'react'
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
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Divider,
  Chip
} from '@mui/material'
import { Search, Info, Help } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { 
  fetchVehicleValuation, 
  setValuationParameters,
  clearSearchResults,
  setError,
  clearError
} from '../store/slices/vehicleValuationSlice'
import { setDrawerOpen } from '../store/slices/uiSlice'
import { VehicleInfoDrawer } from '../components/VehicleInfoDrawer/index'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  
  // Get state from Redux
  const { 
    searchResults, 
    isSearching, 
    error, 
    valuationParameters 
  } = useAppSelector(state => state.vehicleValuation);
  // console.log('searchResults', searchResults);
  
  const { isDrawerOpen } = useAppSelector(state => state.ui)

  // Test VINs for quick selection
  const testVins = [
    { name: 'Subaru WRX STI', vin: 'JF1GR8H6XBL831881' },
    // { name: 'Honda Civic', vin: '1HGBH41JXMN109186' },
    // { name: 'Ford F-150', vin: '1FTFW1ET5DFC10312' }
  ]

  const handleSearch = async () => {
    if (!valuationParameters.vin.trim()) {
      dispatch(setError('Please enter a VIN number'))
      return
    }

    if (valuationParameters.vin.length < 17) {
      dispatch(setError('VIN must be 17 characters long'))
      return
    }

    dispatch(clearError())
    dispatch(clearSearchResults())

    try {
      await dispatch(fetchVehicleValuation({
        vin: valuationParameters.vin,
        condition: valuationParameters.condition,
        mileage: valuationParameters.mileage,
        isTest: valuationParameters.isTestMode,
      })).unwrap()
      
      // Open drawer when results are received
      dispatch(setDrawerOpen(true))
    } catch (error) {
      // Error is handled by the async thunk
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleTestVinSelect = (selectedVin) => {
    dispatch(setValuationParameters({ vin: selectedVin }))
  }

  const handleClear = () => {
    dispatch(setValuationParameters({
      vin: '',
      condition: 'good',
      mileage: ''
    }))
    dispatch(clearSearchResults())
    dispatch(setDrawerOpen(false))
    dispatch(clearError())
  }

  const handleCloseDrawer = () => {
    dispatch(setDrawerOpen(false))
  }

  return (
    <Box sx={{
      overflow: 'auto',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      flex: 1,
      minHeight: '100%'
    }}>

      <Container maxWidth="md" sx={{ py: 2 }}>

        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 1 }}>
              Vehicle Search & Valuation
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
              Get AI-powered vehicle valuations using VIN numbers
            </Typography>
          </Box>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* API Mode Toggle */}
            <Tooltip title="Test Mode uses predefined responses for demonstration. Live Mode uses real API data.">
              <FormControlLabel
                control={
                  <Switch
                    checked={valuationParameters.isTestMode}
                    onChange={(e) => dispatch(setValuationParameters({ isTestMode: e.target.checked }))}
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
                    {valuationParameters.isTestMode ? 'Test Mode' : 'Live Mode'}
                  </Typography>
                }
              />
            </Tooltip>
            
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
        
        {/* Search Input Section */}
        <Card variant="info" sx={{ mb: 4 }}>
          <CardContent sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                Vehicle Information
              </Typography>
              
            </Box>
            
            <Typography variant="body1" sx={{ mb: 4, color: '#A0A0A0', lineHeight: 1.6, maxWidth: '600px', textAlign: 'left' }}>
              Enter the 17-character Vehicle Identification Number (VIN) and optional details for accurate AI-powered valuation
            </Typography>
            
            <Grid container spacing={3}>
              {/* VIN Input */}
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="VIN Number (Required)"
                    placeholder="1G1ZD5ST8JF134138"
                    value={valuationParameters.vin}
                    onChange={(e) => dispatch(setValuationParameters({ vin: e.target.value.toUpperCase() }))}
                    onKeyPress={handleKeyPress}
                    error={!!error}
                    helperText={error || "Enter the 17-character VIN found on your vehicle"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        '& fieldset': {
                          borderColor: '#2b2f31',
                        },
                        '&:hover fieldset': {
                          borderColor: '#C3FF51',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#C3FF51',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#A0A0A0',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#C3FF51',
                      },
                    }}
                  />
                  <Tooltip title="VIN is a 17-character code that uniquely identifies your vehicle. Find it on your registration, insurance card, or driver's side dashboard.">
                    <Help sx={{ 
                      position: 'absolute', 
                      right: 12, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#A0A0A0',
                      fontSize: 20,
                      cursor: 'pointer'
                    }} />
                  </Tooltip>
                </Box>
              </Grid>

              {/* Mileage Input */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Mileage (Optional)"
                  placeholder="80000"
                  type="number"
                  value={valuationParameters.mileage}
                  onChange={(e) => dispatch(setValuationParameters({ mileage: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  helperText="Enter current mileage for more accurate valuation"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#2b2f31',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C3FF51',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#C3FF51',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#A0A0A0',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#C3FF51',
                    },
                  }}
                />
              </Grid>

              {/* Condition Select */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#A0A0A0' }}>Vehicle Condition</InputLabel>
                  <Select
                    value={valuationParameters.condition}
                    onChange={(e) => dispatch(setValuationParameters({ condition: e.target.value }))}
                    label="Vehicle Condition"
                    sx={{
                      color: '#FFFFFF',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2b2f31',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C3FF51',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#C3FF51',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#A0A0A0',
                      },
                    }}
                  >
                    <MenuItem value="excellent">Excellent</MenuItem>
                    <MenuItem value="good">Good</MenuItem>
                    <MenuItem value="fair">Fair</MenuItem>
                    <MenuItem value="poor">Poor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Search Button */}
              <Grid item xs={12} md={8}>
                <Button
                  fullWidth
                  variant="secondary"
                  size="large"
                  onClick={handleSearch}
                  disabled={isSearching || !valuationParameters.vin.trim()}
                  startIcon={isSearching ? <CircularProgress size={20} /> : <Search />}
                  sx={{
                    height: 56,
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:disabled': {
                      backgroundColor: '#2A2A2A',
                      color: '#666666',
                      borderColor: '#2A2A2A',
                    },
                  }}
                >
                  {isSearching ? 'Analyzing...' : 'Analyze Vehicle'}
                </Button>
              </Grid>
            </Grid>

            {/* Test VIN Quick Select */}
            {valuationParameters.isTestMode && (
              <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(195, 255, 81, 0.05)', border: '1px solid rgba(195, 255, 81, 0.2)', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ mb: 2, color: '#C3FF51', fontWeight: 500 }}>
                  Quick Test VINs (for demonstration):
                </Typography>
                <ButtonGroup variant="outlined" size="small">
                  {testVins.map((testVin) => (
                    <Button
                      key={testVin.vin}
                      onClick={() => handleTestVinSelect(testVin.vin)}
                      sx={{
                        color: '#C3FF51',
                        borderColor: '#C3FF51',
                        '&:hover': {
                          borderColor: '#B0E647',
                          color: '#B0E647',
                          backgroundColor: 'rgba(195, 255, 81, 0.1)',
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
          <Card variant="info" sx={{ textAlign: 'center' }}>
            <CardContent sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Chip 
                  label="Analysis Complete" 
                  sx={{ 
                    bgcolor: 'rgba(195, 255, 81, 0.2)', 
                    color: '#C3FF51',
                    fontWeight: 600,
                    mr: 2
                  }}
                />
                <Typography variant="body1" sx={{ color: '#A0A0A0' }}>
                  Vehicle analysis complete! View detailed results below.
                </Typography>
              </Box>
              <Button
                variant="secondary"
                size="large"
                onClick={() => dispatch(setDrawerOpen(true))}
                startIcon={<Search />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
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