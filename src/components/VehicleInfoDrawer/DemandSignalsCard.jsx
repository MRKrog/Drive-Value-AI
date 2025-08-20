import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  LinearProgress
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  Twitter,
  Search,
  Analytics,
  LocalFireDepartment
} from '@mui/icons-material'

export const DemandSignalsCard = ({ demandSignals }) => {
  if (!demandSignals) return null

  const getSentimentColor = (score) => {
    if (score >= 0.7) return '#4CAF50'
    if (score >= 0.4) return '#FF9800'
    return '#F44336'
  }

  const getTrendIcon = (trend) => {
    return trend === 'increasing' ? <TrendingUp /> : <TrendingDown />
  }

  const getDemandLevel = (score) => {
    if (score >= 0.8) return 'Very High'
    if (score >= 0.6) return 'High'
    if (score >= 0.4) return 'Medium'
    if (score >= 0.2) return 'Low'
    return 'Very Low'
  }

  return (
    <Card sx={{ 
      mb: 3, 
      bgcolor: 'rgba(171, 159, 242, 0.1)', 
      border: '1px solid rgba(171, 159, 242, 0.3)' 
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: 'rgb(171, 159, 242)', display: 'flex', alignItems: 'center' }}>
          <LocalFireDepartment sx={{ mr: 1 }} />
          External Demand Intelligence
        </Typography>

        <Grid container spacing={3}>
          {/* Social Media Sentiment */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, display: 'flex', alignItems: 'center' }}>
                <Twitter sx={{ mr: 1, fontSize: 16 }} />
                Social Media Sentiment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: getSentimentColor(demandSignals?.twitter_sentiment || 0.5) }}>
                  {(demandSignals?.twitter_sentiment || 0.5) * 100}%
                </Typography>
                <Chip 
                  label={getDemandLevel(demandSignals?.twitter_sentiment || 0.5)}
                  size="small"
                  sx={{ ml: 1, bgcolor: getSentimentColor(demandSignals?.twitter_sentiment || 0.5) }}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(demandSignals?.twitter_sentiment || 0.5) * 100}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getSentimentColor(demandSignals?.twitter_sentiment || 0.5)
                  }
                }}
              />
            </Box>
          </Grid>

          {/* Search Trends */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, display: 'flex', alignItems: 'center' }}>
                <Search sx={{ mr: 1, fontSize: 16 }} />
                Search Demand
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: '#2196F3' }}>
                  {demandSignals?.search_volume_change || '+0%'}
                </Typography>
                {getTrendIcon(demandSignals?.search_trend || 'stable')}
              </Box>
              <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                Google search volume change
              </Typography>
            </Box>
          </Grid>

          {/* Market Intelligence */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, display: 'flex', alignItems: 'center' }}>
                <Analytics sx={{ mr: 1, fontSize: 16 }} />
                Market Intelligence
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  label={`Inventory: ${demandSignals?.inventory_levels || 'Unknown'}`}
                  size="small"
                  sx={{ 
                    bgcolor: demandSignals?.inventory_levels === 'low' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                    color: demandSignals?.inventory_levels === 'low' ? '#4CAF50' : '#FF9800'
                  }}
                />
                <Chip 
                  label={`Days on Market: ${demandSignals?.days_on_market || 'N/A'}`}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(33, 150, 243, 0.2)',
                    color: '#2196F3'
                  }}
                />
                <Chip 
                  label={`Price Momentum: ${demandSignals?.price_momentum || 'stable'}`}
                  size="small"
                  sx={{ 
                    bgcolor: demandSignals?.price_momentum === 'increasing' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                    color: demandSignals?.price_momentum === 'increasing' ? '#4CAF50' : '#F44336'
                  }}
                />
              </Stack>
            </Box>
          </Grid>

          {/* External Factors */}
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                External Factors
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  label={`Fuel: ${demandSignals?.fuel_prices || 'stable'}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255, 193, 7, 0.2)', color: '#FFC107' }}
                />
                <Chip 
                  label={`Interest Rates: ${demandSignals?.interest_rates || 'stable'}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)', color: '#9C27B0' }}
                />
                <Chip 
                  label={`Seasonal: ${demandSignals?.seasonal_demand || 'normal'}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(33, 150, 243, 0.2)', color: '#2196F3' }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Demand Impact Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            Demand Impact: {demandSignals?.demand_multiplier ? 
              `${((demandSignals.demand_multiplier - 1) * 100).toFixed(1)}% ${demandSignals.demand_multiplier > 1 ? 'increase' : 'decrease'} in market value` : 
              'No significant impact detected'
            }
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
} 