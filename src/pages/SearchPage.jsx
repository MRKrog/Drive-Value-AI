import React, { useState, useEffect, useCallback } from 'react'
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
  Chip,
  LinearProgress,
  Snackbar,
  Fade,
  Collapse
} from '@mui/material'
import { Search, Info, Help, Keyboard, Save, Restore, CheckCircle, Error } from '@mui/icons-material'
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

  // Enhanced UX state
  const [draftSaved, setDraftSaved] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchSteps, setSearchSteps] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [vinValidation, setVinValidation] = useState({ isValid: false, message: '' })
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Test VINs for quick selection
  const testVins = [
    { name: 'Subaru WRX STI', vin: 'JF1GR8H6XBL831881' },
    // { name: 'Honda Civic', vin: '1HGBH41JXMN109186' },
    // { name: 'Ford F-150', vin: '1FTFW1ET5DFC10312' }
  ]

  // VIN validation function
  const validateVIN = useCallback((vin) => {
    if (!vin) return { isValid: false, message: '' }
    if (vin.length < 17) return { isValid: false, message: 'VIN must be 17 characters' }
    if (vin.length > 17) return { isValid: false, message: 'VIN must be exactly 17 characters' }
    
    // Basic VIN format validation (no I, O, Q)
    const invalidChars = /[IOQ]/
    if (invalidChars.test(vin)) {
      return { isValid: false, message: 'VIN contains invalid characters (I, O, Q)' }
    }
    
    return { isValid: true, message: 'VIN format looks good!' }
  }, [])

  // Auto-save draft functionality
  const saveDraft = useCallback(() => {
    const draft = {
      vin: valuationParameters.vin,
      mileage: valuationParameters.mileage,
      condition: valuationParameters.condition,
      timestamp: Date.now()
    }
    localStorage.setItem('searchDraft', JSON.stringify(draft))
    setDraftSaved(true)
    setSnackbarMessage('Draft saved automatically')
    setSnackbarOpen(true)
    setHasUnsavedChanges(false)
  }, [valuationParameters])

  // Load draft functionality
  const loadDraft = useCallback(() => {
    const savedDraft = localStorage.getItem('searchDraft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        dispatch(setValuationParameters({
          vin: draft.vin || '',
          mileage: draft.mileage || '',
          condition: draft.condition || 'good'
        }))
        setSnackbarMessage('Draft restored')
        setSnackbarOpen(true)
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
  }, [dispatch])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + Enter to search
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        if (valuationParameters.vin.trim() && !isSearching) {
          handleSearch()
        }
      }
      
      // Ctrl/Cmd + S to save draft
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        saveDraft()
      }
      
      // Ctrl/Cmd + R to restore draft
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault()
        loadDraft()
      }
      
      // Escape to clear
      if (event.key === 'Escape') {
        handleClear()
      }
      
      // ? to show keyboard shortcuts
      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        setShowKeyboardShortcuts(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [valuationParameters.vin, isSearching, saveDraft, loadDraft])

  // Auto-save draft when parameters change
  useEffect(() => {
    if (valuationParameters.vin || valuationParameters.mileage) {
      setHasUnsavedChanges(true)
      const timer = setTimeout(() => {
        saveDraft()
      }, 2000) // Auto-save after 2 seconds of inactivity
      
      return () => clearTimeout(timer)
    }
  }, [valuationParameters.vin, valuationParameters.mileage, valuationParameters.condition, saveDraft])

  // VIN validation on change
  useEffect(() => {
    const validation = validateVIN(valuationParameters.vin)
    setVinValidation(validation)
  }, [valuationParameters.vin, validateVIN])

  // Search progress simulation
  useEffect(() => {
    if (isSearching) {
      setSearchSteps([
        'Validating VIN...',
        'Fetching vehicle data...',
        'Analyzing market conditions...',
        'Calculating valuation...',
        'Generating report...'
      ])
      
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        if (progress > 90) progress = 90
        setSearchProgress(progress)
      }, 500)
      
      return () => clearInterval(interval)
    } else {
      setSearchProgress(0)
      setSearchSteps([])
    }
  }, [isSearching])

  const handleSearch = async () => {
    if (!valuationParameters.vin.trim()) {
      dispatch(setError('Please enter a VIN number'))
      setSnackbarMessage('Please enter a VIN number')
      setSnackbarOpen(true)
      return
    }

    if (!vinValidation.isValid) {
      dispatch(setError(vinValidation.message))
      setSnackbarMessage(vinValidation.message)
      setSnackbarOpen(true)
      return
    }

    dispatch(clearError())
    dispatch(clearSearchResults())
    setSearchProgress(0)

    try {
      await dispatch(fetchVehicleValuation({
        vin: valuationParameters.vin,
        condition: valuationParameters.condition,
        mileage: valuationParameters.mileage,
        isTest: valuationParameters.isTestMode,
      })).unwrap()
      
      // Complete progress and open drawer
      setSearchProgress(100)
      setTimeout(() => {
        dispatch(setDrawerOpen(true))
        setSnackbarMessage('Search completed successfully!')
        setSnackbarOpen(true)
      }, 500)
    } catch (error) {
      setSearchProgress(0)
      setSnackbarMessage('Search failed. Please try again.')
      setSnackbarOpen(true)
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
    setSearchProgress(0)
    setSearchSteps([])
    setHasUnsavedChanges(false)
    setVinValidation({ isValid: false, message: '' })
    setSnackbarMessage('Form cleared')
    setSnackbarOpen(true)
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
            {/* Draft Status */}
            {hasUnsavedChanges && (
              <Chip
                icon={<Save />}
                label="Unsaved changes"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 193, 7, 0.2)',
                  color: '#FFC107',
                  fontSize: '0.75rem'
                }}
              />
            )}
            
            {/* Draft Actions */}
            <Button
              variant="outlined"
              size="small"
              onClick={saveDraft}
              disabled={isSearching || !hasUnsavedChanges}
              startIcon={<Save />}
              sx={{
                color: '#A0A0A0',
                borderColor: '#2A2A2A',
                fontSize: '0.75rem',
                px: 2,
                '&:hover': {
                  borderColor: '#C3FF51',
                  color: '#C3FF51',
                },
                '&:disabled': {
                  borderColor: '#2A2A2A',
                  color: '#2A2A2A',
                },
              }}
            >
              Save Draft
            </Button>
            
            <Button
              variant="outlined"
              size="small"
              onClick={loadDraft}
              disabled={isSearching}
              startIcon={<Restore />}
              sx={{
                color: '#A0A0A0',
                borderColor: '#2A2A2A',
                fontSize: '0.75rem',
                px: 2,
                '&:hover': {
                  borderColor: '#C3FF51',
                  color: '#C3FF51',
                },
                '&:disabled': {
                  borderColor: '#2A2A2A',
                  color: '#2A2A2A',
                },
              }}
            >
              Restore
            </Button>
            
            {/* Keyboard Shortcuts */}
            <Tooltip title="Press ? for keyboard shortcuts">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                startIcon={<Keyboard />}
                sx={{
                  color: '#A0A0A0',
                  borderColor: '#2A2A2A',
                  fontSize: '0.75rem',
                  px: 2,
                  '&:hover': {
                    borderColor: '#C3FF51',
                    color: '#C3FF51',
                  },
                }}
              >
                Shortcuts
              </Button>
            </Tooltip>
            
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
                    error={!!error || (valuationParameters.vin && !vinValidation.isValid)}
                    helperText={
                      error || 
                      (valuationParameters.vin && vinValidation.message) || 
                      "Enter the 17-character VIN found on your vehicle"
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        '& fieldset': {
                          borderColor: vinValidation.isValid && valuationParameters.vin ? '#00D4AA' : '#2b2f31',
                        },
                        '&:hover fieldset': {
                          borderColor: vinValidation.isValid && valuationParameters.vin ? '#00D4AA' : '#C3FF51',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: vinValidation.isValid && valuationParameters.vin ? '#00D4AA' : '#C3FF51',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#A0A0A0',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: vinValidation.isValid && valuationParameters.vin ? '#00D4AA' : '#C3FF51',
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

        {/* Search Progress */}
        {isSearching && (
          <Card variant="info" sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CircularProgress size={20} sx={{ mr: 2, color: '#C3FF51' }} />
                <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                  Analyzing Vehicle...
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={searchProgress} 
                sx={{ 
                  mb: 2,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(195, 255, 81, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#C3FF51',
                    borderRadius: 4,
                  }
                }}
              />
              
              <Typography variant="body2" sx={{ color: '#A0A0A0', textAlign: 'center' }}>
                {searchSteps[Math.floor((searchProgress / 100) * searchSteps.length)] || 'Processing...'}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Keyboard Shortcuts Modal */}
        <Collapse in={showKeyboardShortcuts}>
          <Card variant="info" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
                <Keyboard sx={{ mr: 1, color: '#C3FF51' }} />
                Keyboard Shortcuts
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Ctrl + Enter" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Start search
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Ctrl + S" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Save draft
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Ctrl + R" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Restore draft
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Escape" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Clear form
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="?" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Show shortcuts
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Enter" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(195, 255, 81, 0.2)', 
                        color: '#C3FF51',
                        mr: 2,
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      Search (in VIN field)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Collapse>

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

        {/* Snackbar Notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="info"
            sx={{ 
              bgcolor: 'rgba(195, 255, 81, 0.1)',
              border: '1px solid rgba(195, 255, 81, 0.3)',
              color: '#C3FF51',
              '& .MuiAlert-icon': {
                color: '#C3FF51'
              }
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default SearchPage 