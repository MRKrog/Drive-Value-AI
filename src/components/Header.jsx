import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar
} from '@mui/material'
import {
  ContentCopy,
  Fullscreen
} from '@mui/icons-material'
import { Icon } from '@iconify/react'

const Header = ({ accountName = "Drive ValueAI", accountId = "CW" }) => {
  return (
    <AppBar position="sticky" elevation={1} sx={{ py: 1 }}>
      <Toolbar>
        <Avatar sx={{ mr: 2, bgcolor: 'primary.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon="mdi:car" width={18} height={18} />
        </Avatar>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {accountName}
        </Typography>
        <IconButton color="inherit" size="small">
          <ContentCopy fontSize="small" />
        </IconButton>
        <IconButton color="inherit" size="small">
          <Fullscreen />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header 