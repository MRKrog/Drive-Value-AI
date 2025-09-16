import React from 'react';
import { Box } from '@mui/material';

const ProfileAvatar = ({ 
  src, 
  alt, 
  size = 80, 
  fallbackText, 
  backgroundColor = 'rgb(171, 159, 242)',
  ...props 
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        mx: 'auto',
        mb: 2,
        borderRadius: '50%',
        backgroundImage: src ? `url(${src})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: src ? 'transparent' : backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size * 0.25}px`,
        color: '#FFFFFF',
        fontWeight: 'bold'
      }}
      {...props}
    >
      {!src && fallbackText}
    </Box>
  );
};

export default ProfileAvatar;
