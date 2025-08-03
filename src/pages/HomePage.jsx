import React, { useState } from 'react'
import {
  Box,
  Container,
  Button,
  IconButton
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import Header from '../components/Header'
import BalanceDisplay from '../components/BalanceDisplay'
import ActionButtons from '../components/ActionButtons'
import TokenCard from '../components/TokenCard'
import { tokens } from '../data/tokens'

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('tokens')
  
  // Calculate total balance from tokens
  const totalBalance = tokens.reduce((sum, token) => sum + token.value, 0)
  const totalChange = tokens.reduce((sum, token) => sum + token.change, 0)
  const changePercent = ((totalChange / (totalBalance - totalChange)) * 100).toFixed(2)

  return (
    <Box sx={{ 
      pb: 7, // Space for bottom navigation
      height: '100vh',
      overflow: 'auto', // Allow scrolling
      '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
      msOverflowStyle: 'none', // IE and Edge
      scrollbarWidth: 'none', // Firefox
    }}>
      <Header />
      
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <BalanceDisplay 
          balance={totalBalance}
          change={totalChange}
          changePercent={changePercent}
        />

        <ActionButtons />

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="text"
              onClick={() => setSelectedTab('tokens')}
              sx={{ 
                textTransform: 'none',
                fontSize: '1.1rem', // Bigger font size
                fontWeight: 500,
                color: selectedTab === 'tokens' ? '#FFFFFF' : 'rgba(255, 255, 255, .3)', // White when selected, opaque when not
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: selectedTab === 'tokens' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              Tokens
            </Button>
            <Button
              variant="text"
              onClick={() => setSelectedTab('collectibles')}
              sx={{ 
                textTransform: 'none',
                fontSize: '1.1rem', // Bigger font size
                fontWeight: 500,
                color: selectedTab === 'collectibles' ? '#FFFFFF' : 'rgba(255, 255, 255, .3)', // White when selected, opaque when not
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: selectedTab === 'collectibles' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              Collectibles
            </Button>
          </Box>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Token List */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {tokens.map((token, index) => (
            <Box key={index} sx={{ mb: 1 }}> {/* Add 8px margin bottom between cards */}
              <TokenCard token={token} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage 