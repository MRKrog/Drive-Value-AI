import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Container,
  Card,
  CardContent,
  Stack,
  Alert,
  Paper
} from '@mui/material'
import { 
  DirectionsCar, 
  Build, 
  Person, 
  Close, 
  AttachMoney,
  TrendingUp,
  Assessment,
  Warning,
  Info,
  Star
} from '@mui/icons-material'

export const VehicleInfoDrawer = ({ searchResults, onClose, open = false }) => {
  if (!searchResults || !searchResults.analysis) return null

  // Parse the analysis data
  const parseAnalysisData = (analysisData) => {
    const marketValues = analysisData.market_values;
    const marketAnalysis = analysisData.market_analysis;
    
    return {
      retailPricing: {
        min: marketValues.retail_value.min,
        max: marketValues.retail_value.max,
        average: Math.round((marketValues.retail_value.min + marketValues.retail_value.max) / 2)
      },
      privateParty: {
        min: marketValues.private_party_value.min,
        max: marketValues.private_party_value.max,
        average: Math.round((marketValues.private_party_value.min + marketValues.private_party_value.max) / 2)
      },
      tradeIn: {
        min: marketValues.trade_in_value.min,
        max: marketValues.trade_in_value.max,
        average: Math.round((marketValues.trade_in_value.min + marketValues.trade_in_value.max) / 2)
      },
      marketTrends: {
        demand: marketAnalysis.demand_level,
        trend: marketAnalysis.price_trend,
        supply: 'Balanced'
      },
      keyFactors: [
        analysisData.key_factors.condition_impact,
        analysisData.key_factors.mileage_considerations,
        analysisData.key_factors.common_issues,
        analysisData.key_factors.resale_outlook
      ],
      recommendations: {
        buyerTarget: Math.round(marketValues.private_party_value.min * 1.05),
        dealerBid: Math.round(marketValues.trade_in_value.min * 0.9),
        retailPrice: Math.round((marketValues.retail_value.min + marketValues.retail_value.max) / 2),
        quickSale: Math.round(marketValues.private_party_value.min * 0.95)
      },
      summary: analysisData.summary,
      strategicRecommendations: analysisData.strategic_recommendations,
      riskAssessment: analysisData.risk_assessment
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatPriceRange = (min, max) => {
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const parsedAnalysis = parseAnalysisData(searchResults.analysis);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#1A1A1A',
          borderTop: '1px solid #2A2A2A',
          height: '100vh',
          width: '100%',
        }
      }}
    >
      <Box sx={{ height: '100%', overflow: 'auto' }}>
        {/* Drawer Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2,
          borderBottom: '1px solid #2A2A2A',
          position: 'sticky',
          top: 0,
          bgcolor: '#1A1A1A',
          zIndex: 1
        }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
            Vehicle Market Valuation
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: '#A0A0A0' }}
          >
            <Close />
          </IconButton>
        </Box>

        <Container maxWidth="lg" sx={{ py: 3, pb: 7 }}>
          {/* Vehicle Basic Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1, color: '#FFFFFF', fontWeight: 600 }}>
              {searchResults?.vehicle?.year} {searchResults?.vehicle?.make} {searchResults?.vehicle?.model}
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
              VIN: {searchResults?.vin} | Engine: {searchResults?.vehicle?.engine} | Transmission: {searchResults?.vehicle?.transmission}
            </Typography>
            {/* Condition Display */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label={`Condition: ${searchResults?.condition?.charAt(0).toUpperCase() + searchResults?.condition?.slice(1)}`}
                sx={{
                  bgcolor: searchResults?.condition === 'excellent' ? 'rgba(76, 175, 80, 0.2)' :
                           searchResults?.condition === 'good' ? 'rgba(33, 150, 243, 0.2)' :
                           searchResults?.condition === 'fair' ? 'rgba(255, 152, 0, 0.2)' :
                           'rgba(244, 67, 54, 0.2)',
                  color: searchResults?.condition === 'excellent' ? '#4CAF50' :
                         searchResults?.condition === 'good' ? '#2196F3' :
                         searchResults?.condition === 'fair' ? '#FF9800' :
                         '#F44336',
                  border: `1px solid ${
                    searchResults?.condition === 'excellent' ? 'rgba(76, 175, 80, 0.5)' :
                    searchResults?.condition === 'good' ? 'rgba(33, 150, 243, 0.5)' :
                    searchResults?.condition === 'fair' ? 'rgba(255, 152, 0, 0.5)' :
                    'rgba(244, 67, 54, 0.5)'
                  }`,
                  fontWeight: 500
                }}
              />
            </Box>
          </Box>

          {/* Executive Summary */}
          <Card sx={{ 
            mb: 3, 
            bgcolor: 'rgba(171, 159, 242, 0.1)', 
            border: '1px solid rgba(171, 159, 242, 0.3)' 
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                <Star sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                Executive Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    Overall Assessment
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {parsedAnalysis.summary.overall_assessment}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    Recommended Action
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                    {parsedAnalysis.summary.recommended_action}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    Confidence Level
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgb(171, 159, 242)', fontWeight: 500 }}>
                    {parsedAnalysis.summary.confidence_level}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Current Market Values */}
          <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
            Current Market Values
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Retail Value */}
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>
                    Retail Value
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#4CAF50', mb: 1, fontWeight: 'bold' }}>
                    {formatPriceRange(parsedAnalysis.retailPricing.min, parsedAnalysis.retailPricing.max)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                    Dealer lot price
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(76, 175, 80, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Average:</Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      {formatPrice(parsedAnalysis.retailPricing.average)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Private Party */}
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9C27B0', mb: 1 }}>
                    Private Party
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#9C27B0', mb: 1, fontWeight: 'bold' }}>
                    {formatPriceRange(parsedAnalysis.privateParty.min, parsedAnalysis.privateParty.max)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                    Individual seller
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(156, 39, 176, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Average:</Typography>
                    <Typography variant="body2" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                      {formatPrice(parsedAnalysis.privateParty.average)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Trade-In Value */}
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#2196F3', mb: 1 }}>
                    Trade-In Value
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#2196F3', mb: 1, fontWeight: 'bold' }}>
                    {formatPriceRange(parsedAnalysis.tradeIn.min, parsedAnalysis.tradeIn.max)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                    Dealer trade
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(33, 150, 243, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Average:</Typography>
                    <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                      {formatPrice(parsedAnalysis.tradeIn.average)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Strategic Pricing Recommendations */}
          <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
            Strategic Pricing Recommendations
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} />
                    For Buyers
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 1 }}>
                    <strong>Target Price: {formatPrice(parsedAnalysis.recommendations.buyerTarget)}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    Negotiate around this price for good condition vehicles.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#2196F3', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Build sx={{ mr: 1 }} />
                    For Dealers
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 1 }}>
                    <strong>Max Bid: {formatPrice(parsedAnalysis.recommendations.dealerBid)}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    Conservative bid for auction/wholesale purchases.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9C27B0', mb: 1 }}>
                    Retail Listing
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 1 }}>
                    <strong>Suggested Price: {formatPrice(parsedAnalysis.recommendations.retailPrice)}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    Competitive retail pricing for dealer lots.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244, 67, 54, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#F44336', mb: 1 }}>
                    Quick Sale
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 1 }}>
                    <strong>Quick Sale: {formatPrice(parsedAnalysis.recommendations.quickSale)}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    For immediate liquidation or cash needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Market Intelligence Grid */}
          <Grid container spacing={3}>
            {/* Left Column - Market Intelligence */}
            <Grid item xs={12} lg={8}>
              {/* Market Intelligence */}
              <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1 }} />
                    Market Intelligence
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Market Timing</Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                        {parsedAnalysis.strategicRecommendations.best_time}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Negotiation Strategy</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.strategicRecommendations.negotiation_points}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1 }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Competitive Position</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.strategicRecommendations.market_positioning}
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
                    {searchResults.analysis.market_analysis.regional_variations}
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
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Reliability Outlook</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.riskAssessment.reliability_concerns}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Depreciation Forecast</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.riskAssessment.depreciation_outlook}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1 }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Market Saturation</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.riskAssessment.market_saturation}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Sidebar */}
            <Grid item xs={12} lg={4}>
              {/* Market Trends */}
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
                        {parsedAnalysis.marketTrends.demand}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Supply Level</Typography>
                      <Typography variant="body2" sx={{ color: 'rgb(171, 159, 242)', fontWeight: 500 }}>
                        {parsedAnalysis.marketTrends.supply}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Price Trend</Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                        {parsedAnalysis.marketTrends.trend}
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
                    {parsedAnalysis.keyFactors.map((factor, index) => (
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
                    ))}
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
                    {Object.entries(searchResults.analysis.key_factors).map(([key, value], index) => (
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
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Report Metadata */}
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #2A2A2A' }}>
            <Grid container spacing={2} sx={{ color: '#A0A0A0', fontSize: '0.75rem' }}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Report ID: {searchResults.report_id}</Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
                <Typography variant="caption">
                  Generated: {new Date(searchResults.timestamp).toLocaleString()} | {searchResults.generated_by}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Drawer>
  )
}