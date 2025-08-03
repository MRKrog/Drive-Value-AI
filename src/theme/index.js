import { createTheme } from '@mui/material/styles'

// Create a theme matching the exact color scheme from the image
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(171, 159, 242)', // Exact purple color from user
      light: 'rgb(185, 175, 245)',
      dark: 'rgb(157, 143, 239)',
    },
    secondary: {
      main: 'rgb(171, 159, 242)', // Same purple for consistency
    },
    background: {
      default: 'rgb(31, 31, 31)', // Exact background color from user
      paper: '#1A1A1A', // Slightly lighter dark grey for cards
    },
    text: {
      primary: '#FFFFFF', // Pure white text
      secondary: '#A0A0A0', // Light grey for secondary text
    },
    success: {
      main: '#00D4AA', // Keep green for gains
    },
    error: {
      main: '#EF4444', // Desaturated red/orange-red from the image
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A', // Slightly lighter dark grey
          marginBottom: 0, // Remove default margin to control spacing manually
          borderRadius: 12,
          border: 'none', // No border to match the clean look
          '&:hover': {
            backgroundColor: '#1F1F1F', // Very subtle hover effect
            transition: 'background-color 0.2s ease',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          // paddingBottom: '12px !important', // Override the last-child padding

          '&:last-child': {
            paddingBottom: '24px !important', // Ensure last child has same padding
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(31, 31, 31)', // Exact background color from user
          borderBottom: 'none', // No border for seamless look
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        outlined: {
          borderColor: '#2A2A2A', // Very subtle border
          color: '#FFFFFF',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(171, 159, 242, 0.1)', // Very subtle purple tint
            borderColor: 'rgb(171, 159, 242)',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(42, 42, 42)', // Exact footer background color from user
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px -6px 10px', // Exact box shadow from user
          borderTop: '1px solid rgb(50, 50, 50)', // Exact border from user
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A', // Dark grey like the image
          color: '#FFFFFF',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White icons
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body1: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body2: {
      color: '#A0A0A0',
    },
  },
}) 