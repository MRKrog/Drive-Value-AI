import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

const AuthContext = createContext(null);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if user is logged in (from localStorage, cookies, etc.)
        const savedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken && savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    // TODO: Implement actual login logic
    // For now, simulate login
    const user = {
      id: '1',
      email,
      displayName: 'Demo User',
      role: 'user',
    };
    
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    // TODO: Implement actual registration logic
    const user = {
      id: '1',
      email,
      displayName: `${firstName} ${lastName}`,
      role: 'user',
    };
    
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      // Decode the Google JWT token
      const decoded = jwtDecode(credentialResponse.credential);
      
      // Create user object from Google data
      const user = {
        id: decoded.sub,
        email: decoded.email,
        displayName: decoded.name,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        picture: decoded.picture,
        role: 'user',
        authProvider: 'google',
      };
      
      // Store tokens and user data
      localStorage.setItem('accessToken', credentialResponse.credential);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
      
      return user;
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Google login failed');
    }
  };

  const logout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'local', // or 'firebase', 'cognito', etc.
        login,
        loginWithGoogle,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) throw new Error('Auth context must be used inside AuthProvider');
  
  return context;
};
