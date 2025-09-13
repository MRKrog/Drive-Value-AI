import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography variant="h1" sx={{ mb: 2, fontSize: '6rem', fontWeight: 'bold' }}>
        404
      </Typography>
      
      <Typography variant="h4" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist.
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/dashboard/home')}
      >
        Go Home
      </Button>
    </Box>
  );
}
