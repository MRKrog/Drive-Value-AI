import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, register, loginWithGoogle, logout } from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error, isInitialized } = useAppSelector(state => state.user);

  return {
    // State
    isAuthenticated,
    user,
    loading,
    error,
    isInitialized,
    
    // Actions
    login: (email, password) => dispatch(login({ email, password })),
    register: (email, password, firstName, lastName) => 
      dispatch(register({ email, password, firstName, lastName })),
    loginWithGoogle: (credentialResponse) => dispatch(loginWithGoogle(credentialResponse)),
    logout: () => dispatch(logout()),
  };
};
