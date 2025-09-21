import React, { memo, useState, useRef, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

const LazyImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  sx = {},
  placeholder = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <Box
      ref={imgRef}
      sx={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      {!isInView && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1
          }}
        />
      )}
      
      {isInView && !isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1
          }}
        />
      )}
      
      {isInView && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoaded ? 'block' : 'none',
            ...sx
          }}
        />
      )}
      
      {hasError && placeholder && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 1
          }}
        >
          {placeholder}
        </Box>
      )}
    </Box>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage
