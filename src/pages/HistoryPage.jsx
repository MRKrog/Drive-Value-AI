import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent
} from '@mui/material'

const HistoryPage = () => {
  return (
    <Box sx={{ flex: 1, minHeight: '100%' }}>
      <Container maxWidth="md" sx={{ py: 2 }}>
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