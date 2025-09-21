import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Box, List, ListItem } from '@mui/material'

const VirtualList = memo(({ 
  items, 
  itemHeight = 60, 
  containerHeight = 400, 
  renderItem,
  overscan = 5 
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    )
    return { start: Math.max(0, start - overscan), end }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index
    }))
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop)
  }, [])

  return (
    <Box
      sx={{
        height: containerHeight,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#2b2f31',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#C3FF51',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#B0E647',
        },
      }}
      onScroll={handleScroll}
    >
      <Box sx={{ height: totalHeight, position: 'relative' }}>
        <Box
          sx={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item) => (
            <Box
              key={item.index}
              sx={{
                height: itemHeight,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderItem(item, item.index)}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
})

VirtualList.displayName = 'VirtualList'

export default VirtualList
