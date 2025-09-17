import React, { useState, useEffect } from 'react';
import { Box, Avatar } from '@mui/material';

const ProfileAvatar = ({ 
  src, 
  alt, 
  size = 80, 
  fallbackText, 
  backgroundColor = 'rgb(171, 159, 242)',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // Debug logging
  console.log('ProfileAvatar - original src:', src);

  useEffect(() => {
    if (src) {
      // Reset states when src changes
      setImageError(false);
      setImageLoaded(false);
      
      // Try different Google image URL formats
      let processedSrc = src;
      
      // Remove size restrictions and add proper parameters
      if (src.includes('googleusercontent.com')) {
        // Try different size parameters - Google images work better with specific sizes
        processedSrc = src.replace(/=s\d+-c/, '=s200-c');
        
        // Test if the image is accessible by creating a test image
        const testImg = new Image();
        testImg.onload = () => {
          console.log('Test image loaded successfully:', processedSrc);
          setImageSrc(processedSrc);
        };
        testImg.onerror = () => {
          console.log('Test image failed, trying original URL:', src);
          // If processed URL fails, try original
          setImageSrc(src);
        };
        testImg.src = processedSrc;
      } else {
        setImageSrc(src);
      }
      
      console.log('ProfileAvatar - processed src:', processedSrc);
    } else {
      setImageSrc(null);
    }
  }, [src]);

  const handleImageError = () => {
    console.log('Image failed to load:', imageSrc);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setImageLoaded(true);
  };

  // If we have a src and no error, try to load the image
  const shouldShowImage = imageSrc && !imageError && imageLoaded;
  const shouldShowFallback = !imageSrc || imageError;

  // If image fails to load, use MUI Avatar as fallback
  if (imageError || !imageSrc) {
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          mx: 'auto',
          mb: 2,
          bgcolor: backgroundColor,
          color: '#FFFFFF',
          fontSize: `${size * 0.25}px`,
          fontWeight: 'bold',
          border: '2px solid rgba(255, 255, 255, 0.1)'
        }}
        {...props}
      >
        {fallbackText}
      </Avatar>
    );
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        mx: 'auto',
        mb: 2,
        borderRadius: '50%',
        backgroundColor: shouldShowImage ? 'transparent' : backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size * 0.25}px`,
        color: '#FFFFFF',
        fontWeight: 'bold',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}
      {...props}
    >
      {/* Image element */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            borderRadius: '50%'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {/* Fallback text - always visible until image loads */}
      {fallbackText && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: shouldShowImage ? 0 : 1,
            transition: 'opacity 0.3s ease',
            zIndex: 1
          }}
        >
          {fallbackText}
        </Box>
      )}
    </Box>
  );
};

export default ProfileAvatar;
