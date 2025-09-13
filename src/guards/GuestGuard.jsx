import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PATH_AFTER_LOGIN } from '../routes/paths';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={PATH_AFTER_LOGIN} replace />;
  }

  return <>{children}</>;
}
