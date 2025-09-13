import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      <Box sx={{ 
        backgroundColor: 'background.default',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        pt: 10, // Add top padding for fixed header
        pb: 10, // Add bottom padding for fixed navigation
        overflow: 'auto',
      }}>
        <Outlet />
      </Box>
      <BottomNavigation />
    </Box>
  );
}
