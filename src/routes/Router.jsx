import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

// components
import LoadingScreen from '../components/LoadingScreen';

// paths
import { PATH_AFTER_LOGIN, PATH_BEFORE_LOGIN } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

export default function Router() {
  return useRoutes([
    // Auth Routes
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { element: <Navigate to={PATH_BEFORE_LOGIN} replace />, index: true },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'history', element: <HistoryPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },

    // Root redirect
    { path: '/', element: <Navigate to="/auth/login" replace /> },
    
    // 404
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '404', element: <Page404 /> },
  ]);
}

// Lazy loaded components
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
const SearchPage = Loadable(lazy(() => import('../pages/SearchPage')));
const HistoryPage = Loadable(lazy(() => import('../pages/HistoryPage')));
const ProfilePage = Loadable(lazy(() => import('../pages/ProfilePage')));

const Page404 = Loadable(lazy(() => import('../pages/Page404')));
