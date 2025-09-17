import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginWithGoogle } from '../../store/slices/userSlice';
import { PATH_AUTH, PATH_AFTER_LOGIN } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.user);
  const [localError, setLocalError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');

    try {
      await dispatch(loginWithGoogle(credentialResponse)).unwrap();
      navigate(PATH_AFTER_LOGIN);
    } catch (err) {
      setLocalError(err.message || 'Google login failed');
    }
  };

  const handleGoogleError = () => {
    setLocalError('Google login failed. Please try again.');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      // background: 'linear-gradient(135deg, #151718 0%, #1a1d1e 100%)',
      py: 4
    }}>
      <Card variant="info" sx={{ 
        maxWidth: 400, 
        width: '100%',
        mx: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              color: '#FFFFFF', 
              fontWeight: 700, 
              mb: 1,
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              Welcome
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#A0A0A0',
              fontSize: '0.95rem'
            }}>
              Sign in to your Drive Value AI account
            </Typography>
          </Box>
          
          {(error || localError) && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                '& .MuiAlert-message': {
                  color: '#EF4444'
                }
              }}
            >
              {error || localError}
            </Alert>
          )}

          {/* Google OAuth Login */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              size="large"
              shape="rectangular"
              theme="filled_black"
              text="signin_with"
              disabled={loading}
            />
          </Box>
          
          {/* Divider */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            '&::before, &::after': {
              content: '""',
              flex: 1,
              height: '1px',
              bgcolor: '#2b2f31'
            }
          }}>
            <Typography variant="body2" sx={{ 
              color: '#A0A0A0', 
              px: 2,
              fontSize: '0.875rem'
            }}>
              Secure Authentication
            </Typography>
          </Box>
          
          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 1 }}>
              New to Drive Value AI?
            </Typography>
            <Link 
              component={RouterLink} 
              to={PATH_AUTH.register} 
              variant="body2"
              sx={{ 
                color: '#C3FF51', 
                textDecorationColor: '#C3FF51',
                fontWeight: 500,
                '&:hover': { 
                  color: '#B0E647',
                  textDecorationColor: '#B0E647'
                }
              }}
            >
              Create your account
            </Link>
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
}
