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
  TrendingUp,
  Verified,
  Schedule,
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
            <Card 
              variant="info"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(195, 255, 81, 0.15)',
                  borderColor: '#C3FF51',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Speed sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2,
                  transition: 'color 0.3s ease',
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
            <Card 
              variant="info"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(195, 255, 81, 0.15)',
                  borderColor: '#C3FF51',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Analytics sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2,
                  transition: 'color 0.3s ease',
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
            <Card 
              variant="info"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(195, 255, 81, 0.15)',
                  borderColor: '#C3FF51',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Security sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2,
                  transition: 'color 0.3s ease',
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

        {/* Stats Section */}
        <Card variant="info" sx={{ mb: 4 }}>
          <CardContent sx={{ py: 3 }}>
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <TrendingUp sx={{ color: '#C3FF51', fontSize: 24 }} />
                  <Typography variant="h4" sx={{ 
                    color: '#FFFFFF', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif'
                  }}>
                    50K+
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mt: 0.5 }}>
                  Vehicles Valued
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Verified sx={{ color: '#C3FF51', fontSize: 24 }} />
                  <Typography variant="h4" sx={{ 
                    color: '#FFFFFF', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif'
                  }}>
                    98%
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mt: 0.5 }}>
                  Accuracy Rate
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Schedule sx={{ color: '#C3FF51', fontSize: 24 }} />
                  <Typography variant="h4" sx={{ 
                    color: '#FFFFFF', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif'
                  }}>
                    &lt;5s
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: '#A0A0A0', mt: 0.5 }}>
                  Average Response
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      </Container>
    </Box>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage 