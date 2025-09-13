import React from 'react';
import { Box, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={64} thickness={3} />
    </Box>
  );
}
