import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material'
import { 
  Search, 
  DirectionsCar, 
  CalendarToday, 
  AttachMoney,
  Star,
  MoreVert,
  Refresh,
  Visibility
} from '@mui/icons-material'
import { useAppSelector } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { PATH_DASHBOARD } from '../routes/paths'

const HistoryPage = () => {
  const navigate = useNavigate()
  const { recentSearches, stats } = useAppSelector(state => state.user)
  
  const handleReSearch = (searchData) => {
    // Navigate to search page with pre-filled data
    navigate(PATH_DASHBOARD.search, { 
      state: { 
        prefillData: {
          vin: searchData.vin,
          year: searchData.year,
          make: searchData.make,
          model: searchData.model
        }
      }
    })
  }

  const handleViewDetails = (searchData) => {
    // Navigate to search results or open drawer
    console.log('View details for:', searchData)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Box sx={{ flex: 1, minHeight: '100%' }}>
      <Container maxWidth="md" sx={{ py: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 1 }}>
            Search History
          </Typography>
          <Typography variant="body1" sx={{ color: '#A0A0A0' }}>
            Track your vehicle valuations and search activity
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center' }}>
                <Search sx={{ fontSize: 32, color: '#C3FF51', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                  {stats.totalSearches || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  Total Searches
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center' }}>
                <Star sx={{ fontSize: 32, color: '#C3FF51', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                  {stats.searchStreak || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  Day Streak
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center' }}>
                <DirectionsCar sx={{ fontSize: 32, color: '#C3FF51', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                  {recentSearches?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  Recent Searches
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center' }}>
                <AttachMoney sx={{ fontSize: 32, color: '#C3FF51', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                  {recentSearches?.length > 0 ? 'Avg' : '0'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  Avg Valuation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search History List */}
        {recentSearches && recentSearches.length > 0 ? (
          <Stack spacing={2}>
            {recentSearches.map((search, index) => (
              <Card key={search.id || index} variant="info">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    {/* Vehicle Info */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: 'rgba(195, 255, 81, 0.1)', 
                          color: '#C3FF51', 
                          mr: 2,
                          width: 48,
                          height: 48
                        }}>
                          <DirectionsCar />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 0.5 }}>
                            {search.year} {search.make} {search.model}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                            VIN: {search.vin}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Search Details */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                            Search Date
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                            {formatDate(search.createdAt || search.date)}
                          </Typography>
                        </Grid>
                        
                        {search.valuation && (
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                              Valuation
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#C3FF51', fontWeight: 600 }}>
                              {formatCurrency(search.valuation)}
                            </Typography>
                          </Grid>
                        )}
                        
                        {search.mileage && (
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                              Mileage
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                              {search.mileage.toLocaleString()} mi
                            </Typography>
                          </Grid>
                        )}
                        
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                            Status
                          </Typography>
                          <Chip 
                            label={search.status || 'Completed'} 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(0, 212, 170, 0.2)', 
                              color: '#00D4AA',
                              fontWeight: 500
                            }}
                          />
                        </Grid>
                      </Grid>
                      
                      {/* Notes or Additional Info */}
                      {search.notes && (
                        <Typography variant="body2" sx={{ color: '#A0A0A0', fontStyle: 'italic' }}>
                          "{search.notes}"
                        </Typography>
                      )}
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                      <Tooltip title="Search Again">
                        <Button
                          variant="secondary"
                          size="small"
                          startIcon={<Refresh />}
                          onClick={() => handleReSearch(search)}
                          sx={{ minWidth: 'auto', px: 2 }}
                        >
                          Re-search
                        </Button>
                      </Tooltip>
                      
                      <Tooltip title="View Details">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleViewDetails(search)}
                          sx={{ minWidth: 'auto', px: 2 }}
                        >
                          Details
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          /* Enhanced Empty State */
          <Box>
            {/* Main Empty State */}
            <Card variant="info" sx={{ mb: 3 }}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Search sx={{ fontSize: 64, color: '#A0A0A0', mb: 2 }} />
                <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 1, fontWeight: 600 }}>
                  No Search History Yet
                </Typography>
                <Typography variant="body1" sx={{ color: '#A0A0A0', mb: 3, maxWidth: '400px', mx: 'auto' }}>
                  Start searching for vehicles to build your valuation history and track your automotive insights
                </Typography>
                <Button
                  variant="secondary"
                  size="large"
                  startIcon={<Search />}
                  onClick={() => navigate(PATH_DASHBOARD.search)}
                  sx={{ mb: 4 }}
                >
                  Start Your First Search
                </Button>
              </CardContent>
            </Card>

            {/* Sample Data Preview */}
            <Card variant="info" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
                  <DirectionsCar sx={{ mr: 1, color: '#C3FF51' }} />
                  What You'll See Here
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 3 }}>
                  Once you start searching, your history will look like this:
                </Typography>

                {/* Sample Search Cards */}
                <Stack spacing={2}>
                  {/* Sample 1 */}
                  <Card sx={{ 
                    bgcolor: 'rgba(195, 255, 81, 0.05)', 
                    border: '1px solid rgba(195, 255, 81, 0.2)',
                    opacity: 0.7
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: 'rgba(195, 255, 81, 0.1)', 
                              color: '#C3FF51', 
                              mr: 2,
                              width: 48,
                              height: 48
                            }}>
                              <DirectionsCar />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 0.5 }}>
                                2020 Tesla Model 3
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                                VIN: 5YJ3E1EA4LF123456
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Search Date
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                                Dec 15, 2024
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Valuation
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#C3FF51', fontWeight: 600 }}>
                                $32,500
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Mileage
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                                45,000 mi
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Status
                              </Typography>
                              <Chip 
                                label="Completed" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(0, 212, 170, 0.2)', 
                                  color: '#00D4AA',
                                  fontWeight: 500
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                          <Button
                            variant="secondary"
                            size="small"
                            startIcon={<Refresh />}
                            disabled
                            sx={{ minWidth: 'auto', px: 2, opacity: 0.5 }}
                          >
                            Re-search
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            disabled
                            sx={{ minWidth: 'auto', px: 2, opacity: 0.5 }}
                          >
                            Details
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Sample 2 */}
                  <Card sx={{ 
                    bgcolor: 'rgba(195, 255, 81, 0.05)', 
                    border: '1px solid rgba(195, 255, 81, 0.2)',
                    opacity: 0.5
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: 'rgba(195, 255, 81, 0.1)', 
                              color: '#C3FF51', 
                              mr: 2,
                              width: 48,
                              height: 48
                            }}>
                              <DirectionsCar />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 0.5 }}>
                                2018 BMW 3 Series
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                                VIN: WBA3A5C58JE123456
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Search Date
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                                Dec 10, 2024
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Valuation
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#C3FF51', fontWeight: 600 }}>
                                $28,750
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Mileage
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                                62,000 mi
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" sx={{ color: '#A0A0A0', display: 'block' }}>
                                Status
                              </Typography>
                              <Chip 
                                label="Completed" 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(0, 212, 170, 0.2)', 
                                  color: '#00D4AA',
                                  fontWeight: 500
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                          <Button
                            variant="secondary"
                            size="small"
                            startIcon={<Refresh />}
                            disabled
                            sx={{ minWidth: 'auto', px: 2, opacity: 0.5 }}
                          >
                            Re-search
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            disabled
                            sx={{ minWidth: 'auto', px: 2, opacity: 0.5 }}
                          >
                            Details
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Stack>
              </CardContent>
            </Card>

            {/* Quick Start Guide */}
            <Card variant="info">
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ mr: 1, color: '#C3FF51' }} />
                  Getting Started
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        bgcolor: 'rgba(195, 255, 81, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mx: 'auto', 
                        mb: 2 
                      }}>
                        <Typography variant="h4" sx={{ color: '#C3FF51', fontWeight: 700 }}>1</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                        Enter VIN
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                        Start with a 17-character Vehicle Identification Number for instant vehicle details
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        bgcolor: 'rgba(195, 255, 81, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mx: 'auto', 
                        mb: 2 
                      }}>
                        <Typography variant="h4" sx={{ color: '#C3FF51', fontWeight: 700 }}>2</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                        Get AI Valuation
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                        Our AI analyzes thousands of data points to provide accurate market valuations
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        bgcolor: 'rgba(195, 255, 81, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mx: 'auto', 
                        mb: 2 
                      }}>
                        <Typography variant="h4" sx={{ color: '#C3FF51', fontWeight: 700 }}>3</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                        Track History
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                        View all your searches, compare valuations, and build your automotive knowledge
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default HistoryPage 