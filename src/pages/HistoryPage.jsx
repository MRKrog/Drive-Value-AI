import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import Header from '../components/Header'

const HistoryPage = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Transaction History
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Transaction history coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default HistoryPage 