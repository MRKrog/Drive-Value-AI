import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button
} from '@mui/material'
import {
  ContentCopy,
  Fullscreen,
  Logout
} from '@mui/icons-material'
import { Icon } from '@iconify/react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { PATH_AUTH } from '../routes/paths'

const Header = ({ accountName = "Drive Value AI", accountId = "DV" }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      // Navigate to login page after logout
      navigate(PATH_AUTH.login, { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AppBar position="fixed" elevation={1} sx={{ py: 1, zIndex: 1200 }}>
      <Toolbar>
        <Avatar sx={{ mr: 2, bgcolor: 'primary.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon="mdi:car" width={18} height={18} />
        </Avatar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1
          }}
        >
          {accountName}
        </Typography>
        
        {/* Logout Button */}
        <Button
          color="inherit"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header 