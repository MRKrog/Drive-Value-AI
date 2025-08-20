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
import { 
  AIValuationSummary, 
  VehicleHeader, 
  VehicleSpecs, 
  MarketValues,
  StrategicPricing,
  MarketIntelligence,
  PerformanceFactors
} from './index'

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
      <Box sx={{ 
        height: '100%', 
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none' 
      }}>
        
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
          zIndex: 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            Vehicle Market Valuation
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: '#A0A0A0' }}
          >
            <Close />
          </IconButton>
        </Box>

        <Container maxWidth="lg" sx={{ py: 3, pb: 5 }}>
          {/* Vehicle Basic Info */}
          <VehicleHeader searchResults={searchResults} parsedAnalysis={parsedAnalysis} />

          {/* AI Valuation Summary - Most Important Section */}
          <AIValuationSummary parsedAnalysis={parsedAnalysis} searchResults={searchResults} />

          {/* Enhanced Vehicle Specifications */}
          <VehicleSpecs searchResults={searchResults} />

          {/* External Demand Intelligence */}
          <DemandSignalsCard demandSignals={searchResults?.analysis?.demand_signals} />

          {/* AI Market Values */}
          <MarketValues parsedAnalysis={parsedAnalysis} />

          {/* Strategic Pricing Recommendations */}
          {/* <StrategicPricing parsedAnalysis={parsedAnalysis} formatPrice={formatPrice} /> */}

          {/* Performance Factors & Enhanced Recommendations */}
          {/* <PerformanceFactors parsedAnalysis={parsedAnalysis} /> */}

          {/* Market Intelligence Grid */}
          {/* <MarketIntelligence parsedAnalysis={parsedAnalysis} searchResults={searchResults} /> */}

        </Container>
      </Box>
    </Drawer>
  )
}