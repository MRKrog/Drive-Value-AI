import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function AuthLayout() {
  return (
    <Box sx={{ 
      height: '100%',
      width: '100%',
    }}>
      <Box sx={{ 
        // backgroundColor: 'background.default',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}
