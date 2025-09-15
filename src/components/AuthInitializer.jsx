import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initialize } from '../store/slices/userSlice';

export default function AuthInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage
    // This handles both custom auth and Google OAuth since both
    // store their data in localStorage via our Redux thunks
    dispatch(initialize());
  }, [dispatch]);

  return children;
}
