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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, loginWithGoogle } from '../../store/slices/userSlice';
import { PATH_AUTH, PATH_AFTER_LOGIN } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      await dispatch(register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      })).unwrap();
      navigate(PATH_AFTER_LOGIN);
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');

    try {
      await dispatch(loginWithGoogle(credentialResponse)).unwrap();
      navigate(PATH_AFTER_LOGIN);
    } catch (err) {
      setLocalError(err.message || 'Google registration failed');
    }
  };

  const handleGoogleError = () => {
    setLocalError('Google registration failed. Please try again.');
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Sign Up
        </Typography>
        
        {(error || localError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || localError}
          </Alert>
        )}

        {/* Google OAuth Registration */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            shape="rectangular"
            theme="filled_black"
            text="signup_with"
            disabled={loading}
          />
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
            Or create account with email
          </Typography>
        </Divider>

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Box>
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            Sign Up
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to={PATH_AUTH.login} variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
