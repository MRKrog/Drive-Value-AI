import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
} from '@mui/material'
import { 
  Search, 
  DirectionsCar,
} from '@mui/icons-material'

const HomePage = ({ onPageChange }) => {
  
  const handleSearchClick = () => {
    onPageChange('search')
  }

  return (
    <Box sx={{ 
      overflow: 'auto',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(171, 159, 242, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)' ,
      py: 3
    }}>
      <Container maxWidth="sm">

        <Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ 
                color: '#FFFFFF', 
                fontWeight: 700, 
                mb: 3,
                // lineHeight: 1.2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}>
                AI-Powered Vehicle
                <Box component="span" sx={{ 
                  background: 'linear-gradient(45deg, rgb(171, 159, 242), #4CAF50)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>
                  Valuation Platform
                </Box>
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: '#A0A0A0', 
                mb: 4, 
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}>
                Get instant, accurate vehicle valuations powered by advanced AI. 
                Trusted by dealers, auction houses, and individual buyers nationwide.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Search />}
                  onClick={handleSearchClick}
                  sx={{
                    bgcolor: 'rgb(171, 159, 242)',
                    color: '#FFFFFF',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgb(157, 143, 239)',
                    },
                  }}
                >
                  Start Vehicle Search
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#FFFFFF',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'rgb(171, 159, 242)',
                      bgcolor: 'rgba(171, 159, 242, 0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Box sx={{
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(171, 159, 242, 0.2), rgba(76, 175, 80, 0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <DirectionsCar sx={{ 
                    fontSize: 120, 
                    color: 'rgb(171, 159, 242)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                  }} />
                </Box>
                
                {/* Floating elements */}
                <Box sx={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  bgcolor: 'rgba(76, 175, 80, 0.9)',
                  color: '#FFFFFF',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  AI Powered
                </Box>
                
                <Box sx={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '5%',
                  bgcolor: 'rgba(33, 150, 243, 0.9)',
                  color: '#FFFFFF',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  Real-time Data
                </Box>
              </Box>
            </Grid>
          </Grid>
          
        </Box>
      </Container>

    </Box>
  )
}

export default HomePage 