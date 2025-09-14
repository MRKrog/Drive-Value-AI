import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Divider,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import { PATH_AUTH, PATH_AFTER_LOGIN } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(PATH_AFTER_LOGIN);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle(credentialResponse);
      navigate(PATH_AFTER_LOGIN);
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Sign In
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Google OAuth Login */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
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

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
            Or sign in with email
          </Typography>
        </Divider>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            Sign In
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Link 
              component={RouterLink} 
              to={PATH_AUTH.register} 
              variant="body2"
              sx={{ color: '#6B7280', textDecorationColor: '#6B7280', '&:hover': { color: '#818181' } }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
