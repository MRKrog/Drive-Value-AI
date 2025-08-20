import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper
} from '@mui/material'
import { 
  TrendingUp, 
  Info, 
  Warning, 
  Assessment 
} from '@mui/icons-material'

export const MarketIntelligence = ({ parsedAnalysis, searchResults }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        {/* Market Intelligence */}
        <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Market Intelligence
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Demand Level</Typography>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                  {parsedAnalysis.marketIntelligence?.demand_level || 'Moderate demand'}
                </Typography>
              </Box>
              <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Price Trend</Typography>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                  {parsedAnalysis.marketIntelligence?.price_trend || 'Stable pricing'}
                </Typography>
              </Box>
              <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Seasonal Factors</Typography>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                  {parsedAnalysis.marketIntelligence?.seasonal_factors || 'Seasonal variations apply'}
                </Typography>
              </Box>
              <Box sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Regional Factors</Typography>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                  {parsedAnalysis.marketIntelligence?.regional_factors || 'Regional variations apply'}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Regional Insights */}
        <Card sx={{ mb: 3, bgcolor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#FF9800', display: 'flex', alignItems: 'center' }}>
              <Info sx={{ mr: 1 }} />
              Regional Market Insights
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF', lineHeight: 1.6 }}>
              {parsedAnalysis.marketIntelligence?.regional_factors || 'Regional market variations may apply based on local demand, weather conditions, and buyer preferences.'}
            </Typography>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card sx={{ bgcolor: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#FFC107', display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ mr: 1 }} />
              Risk Assessment
            </Typography>
            <Stack spacing={2}>
              {parsedAnalysis.riskFactors && Object.keys(parsedAnalysis.riskFactors).length > 0 ? (
                Object.entries(parsedAnalysis.riskFactors).map(([key, value], index) => (
                  <Box key={index} sx={{ py: 1, borderBottom: index < Object.keys(parsedAnalysis.riskFactors).length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                      {value}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  No significant risk factors identified for this vehicle.
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column - Sidebar */}
      <Grid item xs={12} lg={4}>
        {/* Market Analysis */}
        <Card sx={{ mb: 3, bgcolor: 'rgba(171, 159, 242, 0.1)', border: '1px solid rgba(171, 159, 242, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: 'rgb(171, 159, 242)', display: 'flex', alignItems: 'center' }}>
              <Assessment sx={{ mr: 1 }} />
              Market Analysis
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Demand Level</Typography>
                <Typography variant="body2" sx={{ color: '#FFC107', fontWeight: 500 }}>
                  {parsedAnalysis.marketIntelligence?.demand_level || 'Moderate'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Price Trend</Typography>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                  {parsedAnalysis.marketIntelligence?.price_trend || 'Stable'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Seasonal Impact</Typography>
                <Typography variant="body2" sx={{ color: 'rgb(171, 159, 242)', fontWeight: 500 }}>
                  {parsedAnalysis.marketIntelligence?.seasonal_factors ? 'Yes' : 'Minimal'}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Key Factors */}
        <Card sx={{ mb: 3, bgcolor: 'rgba(171, 159, 242, 0.1)', border: '1px solid rgba(171, 159, 242, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: 'rgb(171, 159, 242)' }}>
              Key Market Factors
            </Typography>
            <Stack spacing={1}>
              {parsedAnalysis.keyFactors && parsedAnalysis.keyFactors.length > 0 ? (
                parsedAnalysis.keyFactors.map((factor, index) => (
                  <Paper 
                    key={index} 
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {factor}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Paper 
                  sx={{ 
                    p: 1.5, 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    Market factors analysis available in standard mode
                  </Typography>
                </Paper>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Value Drivers */}
        <Card sx={{ bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#9C27B0' }}>
              Value Drivers
            </Typography>
            <Stack spacing={1}>
              {searchResults?.analysis?.key_factors && Object.keys(searchResults.analysis.key_factors).length > 0 ? (
                Object.entries(searchResults.analysis.key_factors).map(([key, value], index) => (
                  <Box key={index}>
                    <Typography variant="caption" sx={{ color: '#A0A0A0', textTransform: 'capitalize' }}>
                      {key.replace('_', ' ')}
                    </Typography>
                    <Paper sx={{ 
                      p: 1, 
                      mt: 0.5,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {value}
                      </Typography>
                    </Paper>
                  </Box>
                ))
              ) : (
                <Paper sx={{ 
                  p: 1.5, 
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    Value drivers analysis available in standard mode
                  </Typography>
                </Paper>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
