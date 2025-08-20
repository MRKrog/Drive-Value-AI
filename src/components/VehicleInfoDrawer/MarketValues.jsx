import React from 'react'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box
} from '@mui/material'
import { AttachMoney } from '@mui/icons-material'

export const MarketValues = ({ parsedAnalysis }) => {
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

  return (
    <>
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
    </>
  )
}
