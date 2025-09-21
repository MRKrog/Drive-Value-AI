import React, { memo, useCallback } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Speed,
  Analytics,
  Security,
} from '@mui/icons-material'
import { PATH_DASHBOARD } from '../routes/paths'

const HomePage = memo(() => {
  const navigate = useNavigate()
  
  const handleSearchClick = useCallback(() => {
    navigate(PATH_DASHBOARD.search)
  }, [navigate])

  return (
    <Box sx={{ flex: 1 }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        
        {/* Hero Section */}
        <Card variant="info" sx={{ mb: 4, textAlign: 'center' }}>
          <CardContent sx={{ py: 6 }}>
            <Typography variant="h3" sx={{ 
              color: '#FFFFFF', 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}>
              AI-Powered Vehicle Valuation
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: '#A0A0A0', 
              mb: 4, 
              lineHeight: 1.6,
              maxWidth: '600px',
              mx: 'auto',
            }}>
              Get instant, accurate vehicle valuations powered by advanced AI. 
              Trusted by dealers, auction houses, and individual buyers nationwide.
            </Typography>

            <Button
              variant="secondary"
              size="large"
              startIcon={<Search />}
              onClick={handleSearchClick}
              sx={{ mb: 3 }}
            >
              Start Vehicle Search
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Speed sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2 
                }} />
                <Typography variant="h6" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 600, 
                  mb: 1
                }}>
                  Instant Results
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}>
                  Get instant vehicle valuations in seconds. 
                  Our AI processes thousands of
                  data points to deliver accurate results.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Analytics sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2 
                }} />
                <Typography variant="h6" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 600, 
                  mb: 1
                }}>
                  AI-Powered
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}>
                  Advanced machine learning algorithms
                  analyze market trends, condition, and
                  history for precise valuations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Security sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2 
                }} />
                <Typography variant="h6" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 600, 
                  mb: 1
                }}>
                  Trusted Data
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}>
                  Reliable market data from trusted
                  sources including dealerships, auctions,
                  and industry databases.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </Box>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage 