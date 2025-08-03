import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import Header from '../components/Header'

const SwapPage = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Swap Tokens
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Swap functionality coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default SwapPage 