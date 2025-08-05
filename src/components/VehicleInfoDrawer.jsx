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
import { DemandSignalsCard } from './DemandSignalsCard'

export const VehicleInfoDrawer = ({ searchResults, onClose, open = false }) => {
  if (!searchResults || (!searchResults.analysis && !searchResults.ai_valuation)) return null

  // Parse the new comprehensive analysis data
  const parseAnalysisData = (data) => {
    // Handle both new and legacy data structures
    const aiValuation = data.ai_valuation || data.analysis || {};
    const marketValues = aiValuation.market_values || {};
    const baseline = data.baseline_data || {};
    
    return {
      // AI-powered market values
      retailPricing: {
        min: marketValues.retail_value?.min || 0,
        max: marketValues.retail_value?.max || 0,
        suggested: marketValues.retail_value?.suggested_ai_price || 0,
        description: marketValues.retail_value?.description || 'Dealer retail price range',
        baselineComparison: marketValues.retail_value?.baseline_comparison || 'AI analysis provides enhanced accuracy',
        confidence: marketValues.retail_value?.confidence_level || 'High confidence',
        baseline: baseline.retail_value || 0
      },
      privateParty: {
        min: marketValues.private_party_value?.min || 0,
        max: marketValues.private_party_value?.max || 0,
        suggested: marketValues.private_party_value?.suggested_ai_price || 0,
        description: marketValues.private_party_value?.description || 'Private seller price range',
        baselineComparison: marketValues.private_party_value?.baseline_comparison || 'AI analysis provides enhanced accuracy',
        confidence: marketValues.private_party_value?.confidence_level || 'High confidence',
        baseline: baseline.private_party_value || 0
      },
      tradeIn: {
        min: marketValues.trade_in_value?.min || 0,
        max: marketValues.trade_in_value?.max || 0,
        suggested: marketValues.trade_in_value?.suggested_ai_price || 0,
        description: marketValues.trade_in_value?.description || 'Dealer trade-in offer range',
        baselineComparison: marketValues.trade_in_value?.baseline_comparison || 'AI analysis provides enhanced accuracy',
        confidence: marketValues.trade_in_value?.confidence_level || 'High confidence',
        baseline: baseline.trade_in_value || 0
      },
      auctionValue: {
        min: marketValues.auction_value?.min || 0,
        max: marketValues.auction_value?.max || 0,
        suggested: marketValues.auction_value?.suggested_ai_price || 0,
        description: marketValues.auction_value?.description || 'Wholesale/auction price range',
        baselineComparison: marketValues.auction_value?.baseline_comparison || 'AI analysis provides enhanced accuracy',
        confidence: marketValues.auction_value?.confidence_level || 'High confidence'
      },
      // Analysis sections - with safe fallbacks
      analysis: aiValuation.analysis || {},
      valueAdjustments: aiValuation.value_adjustments || {},
      performanceAssessment: aiValuation.performance_assessment || {},
      marketIntelligence: aiValuation.market_intelligence || {},
      riskAnalysis: aiValuation.risk_analysis || {},
      recommendations: aiValuation.recommendations || {},
      confidenceMetrics: aiValuation.confidence_metrics || {},
      // Vehicle parameters
      mileageInfo: data.valuation_parameters?.mileage || {},
      condition: data.valuation_parameters?.condition || 'good',
      // Summary data
      summary: data.summary || {}
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

  const parsedAnalysis = parseAnalysisData(searchResults);

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
            <Typography variant="h4" sx={{ mb: 1, color: '#FFFFFF', fontWeight: 700 }}>
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
                  label={`${parsedAnalysis.mileageInfo.variance_percentage}% ${parsedAnalysis.mileageInfo.status?.replace('_', ' ')}`}
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

          {/* Executive Summary */}
          <Card sx={{ 
            mb: 3, 
            bgcolor: 'rgba(171, 159, 242, 0.1)', 
            border: '1px solid rgba(171, 159, 242, 0.3)' 
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                <Star sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
                AI Valuation Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    Recommended Price
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                    {formatPrice(parsedAnalysis.summary?.recommended_price?.private_party || parsedAnalysis.privateParty.suggested)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0' }}>
                    Private Party
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    AI vs Baseline
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgb(171, 159, 242)', fontWeight: 600 }}>
                    {parsedAnalysis.privateParty.baseline > 0 ? 
                      `${Math.round(((parsedAnalysis.privateParty.suggested - parsedAnalysis.privateParty.baseline) / parsedAnalysis.privateParty.baseline) * 100) >= 0 ? '+' : ''}${Math.round(((parsedAnalysis.privateParty.suggested - parsedAnalysis.privateParty.baseline) / parsedAnalysis.privateParty.baseline) * 100)}%` 
                      : 'N/A'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0' }}>
                    Above Baseline
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    Confidence Level
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFC107', fontWeight: 600 }}>
                    {parsedAnalysis.confidenceMetrics?.overall_confidence?.valuation_accuracy?.split(' ')[0] || 'High'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0' }}>
                    Accuracy Range
                  </Typography>
                </Grid>
              </Grid>
              
              {/* Key Highlights */}
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1 }}>
                  Key Highlights
                </Typography>
                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                   {parsedAnalysis.summary?.key_highlights?.map((highlight, index) => (
                     <Chip
                       key={index}
                       label={highlight}
                       size="small"
                       sx={{
                         bgcolor: 'rgba(171, 159, 242, 0.2)',
                         color: 'rgb(171, 159, 242)',
                         fontWeight: 500
                       }}
                     />
                   )) || (
                     <Chip
                       label="AI-powered analysis"
                       size="small"
                       sx={{
                         bgcolor: 'rgba(171, 159, 242, 0.2)',
                         color: 'rgb(171, 159, 242)',
                         fontWeight: 500
                       }}
                     />
                   )}
                 </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Enhanced Vehicle Specifications */}
          <Card sx={{ mb: 3, bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#2196F3', display: 'flex', alignItems: 'center' }}>
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

          {/* External Demand Intelligence */}
          <DemandSignalsCard demandSignals={searchResults?.analysis?.demand_signals} />

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

          {/* AI Market Values */}
          <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
            AI-Powered Market Values
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Retail Value */}
            <Grid item xs={12} md={3}>
              <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>
                    Retail Value
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#4CAF50', mb: 1, fontWeight: 'bold' }}>
                    {formatPrice(parsedAnalysis.retailPricing.suggested)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0', mb: 1, display: 'block' }}>
                    AI Suggested • Range: {formatPriceRange(parsedAnalysis.retailPricing.min, parsedAnalysis.retailPricing.max)}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(76, 175, 80, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Baseline:</Typography>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      {formatPrice(parsedAnalysis.retailPricing.baseline)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>AI Advantage:</Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      +{Math.round(((parsedAnalysis.retailPricing.suggested - parsedAnalysis.retailPricing.baseline) / parsedAnalysis.retailPricing.baseline) * 100)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Private Party */}
            <Grid item xs={12} md={3}>
              <Card sx={{ bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9C27B0', mb: 1 }}>
                    Private Party
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#9C27B0', mb: 1, fontWeight: 'bold' }}>
                    {formatPrice(parsedAnalysis.privateParty.suggested)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0', mb: 1, display: 'block' }}>
                    AI Suggested • Range: {formatPriceRange(parsedAnalysis.privateParty.min, parsedAnalysis.privateParty.max)}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(156, 39, 176, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Baseline:</Typography>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      {formatPrice(parsedAnalysis.privateParty.baseline)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>AI Advantage:</Typography>
                    <Typography variant="body2" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                      +{Math.round(((parsedAnalysis.privateParty.suggested - parsedAnalysis.privateParty.baseline) / parsedAnalysis.privateParty.baseline) * 100)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Trade-In Value */}
            <Grid item xs={12} md={3}>
              <Card sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#2196F3', mb: 1 }}>
                    Trade-In Value
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#2196F3', mb: 1, fontWeight: 'bold' }}>
                    {formatPrice(parsedAnalysis.tradeIn.suggested)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0', mb: 1, display: 'block' }}>
                    AI Suggested • Range: {formatPriceRange(parsedAnalysis.tradeIn.min, parsedAnalysis.tradeIn.max)}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(33, 150, 243, 0.3)', mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Baseline:</Typography>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                      {formatPrice(parsedAnalysis.tradeIn.baseline)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#A0A0A0' }}>AI Advantage:</Typography>
                    <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                      +{Math.round(((parsedAnalysis.tradeIn.suggested - parsedAnalysis.tradeIn.baseline) / parsedAnalysis.tradeIn.baseline) * 100)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Auction Value */}
            <Grid item xs={12} md={3}>
              <Card sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FF9800', mb: 1 }}>
                    Auction Value
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#FF9800', mb: 1, fontWeight: 'bold' }}>
                    {formatPrice(parsedAnalysis.auctionValue.suggested)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A0A0A0', mb: 1, display: 'block' }}>
                    AI Suggested • Range: {formatPriceRange(parsedAnalysis.auctionValue.min, parsedAnalysis.auctionValue.max)}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255, 152, 0, 0.3)', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#A0A0A0', textAlign: 'center' }}>
                    Wholesale/Auction Market
                  </Typography>
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
                    <strong>Target Price: {formatPrice(parsedAnalysis.privateParty.suggested)}</strong>
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
                    <strong>Max Bid: {formatPrice(parsedAnalysis.tradeIn.suggested)}</strong>
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
                    <strong>Suggested Price: {formatPrice(parsedAnalysis.retailPricing.suggested)}</strong>
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
                    <strong>Quick Sale: {formatPrice(Math.round(parsedAnalysis.privateParty.suggested * 0.95))}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                    For immediate liquidation or cash needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Performance Factors */}
          {parsedAnalysis.performanceFactors && Object.keys(parsedAnalysis.performanceFactors).length > 0 && (
            <Card sx={{ mb: 3, bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#9C27B0', display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 1 }} />
                  Performance Factors
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(parsedAnalysis.performanceFactors).map(([key, value], index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Recommendations */}
          {parsedAnalysis.recommendations && Object.keys(parsedAnalysis.recommendations).length > 0 && (
            <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ mr: 1 }} />
                  Enhanced Recommendations
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(parsedAnalysis.recommendations).map(([key, value], index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

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
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Demand Level</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.marketIntelligence.demand_level || 'Moderate demand'}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Price Trend</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.marketIntelligence.price_trend || 'Stable pricing'}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Seasonal Factors</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.marketIntelligence.seasonal_factors || 'Seasonal variations apply'}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1 }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>Regional Factors</Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        {parsedAnalysis.marketIntelligence.regional_factors || 'Regional variations apply'}
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
                    {parsedAnalysis.marketIntelligence.regional_factors || 'Regional market variations may apply based on local demand, weather conditions, and buyer preferences.'}
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
                    {parsedAnalysis.riskFactors && Object.entries(parsedAnalysis.riskFactors).map(([key, value], index) => (
                      <Box key={index} sx={{ py: 1, borderBottom: index < Object.keys(parsedAnalysis.riskFactors).length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                        <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                          {value}
                        </Typography>
                      </Box>
                    ))}
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
                        {parsedAnalysis.marketIntelligence.demand_level || 'Moderate'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Price Trend</Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                        {parsedAnalysis.marketIntelligence.price_trend || 'Stable'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#A0A0A0' }}>Seasonal Impact</Typography>
                      <Typography variant="body2" sx={{ color: 'rgb(171, 159, 242)', fontWeight: 500 }}>
                        {parsedAnalysis.marketIntelligence.seasonal_factors ? 'Yes' : 'Minimal'}
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
                    {searchResults.analysis.key_factors && Object.keys(searchResults.analysis.key_factors).length > 0 ? (
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

          {/* Confidence Assessment */}
          {parsedAnalysis.confidenceAssessment && Object.keys(parsedAnalysis.confidenceAssessment).length > 0 && (
            <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                  <Assessment sx={{ mr: 1 }} />
                  Confidence Assessment
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(parsedAnalysis.confidenceAssessment).map(([key, value], index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

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