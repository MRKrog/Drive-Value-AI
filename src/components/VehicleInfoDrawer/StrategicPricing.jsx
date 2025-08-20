import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import { 
  Person, 
  Build, 
  TrendingUp 
} from '@mui/icons-material'

export const StrategicPricing = ({ parsedAnalysis, formatPrice }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
        <TrendingUp sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
        Strategic Pricing Recommendations
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* For Buyers */}
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

        {/* For Dealers */}
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

        {/* Retail Listing */}
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

        {/* Quick Sale */}
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
    </>
  )
}
