import './index.css';
import  FloatingShape  from "./components/FloatingShape.jsx";
import { Route,Routes, Navigate } from 'react-router-dom';
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import Dashboard from './pages/DashBoard.jsx';
import ForgotPasswordPage from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import LoadingSpinner from "./components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth, selectAuth } from "./store/authStore"; // Importing actions and selectors from the Redux store
import EmailVerificationPage from './pages/EmailVerficationPage.jsx';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(selectAuth); // Accessing state from Redux store

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/email' replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useSelector(selectAuth); // Accessing state from Redux store

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector(selectAuth); // Accessing state from Redux store

  useEffect(() => {
    dispatch(checkAuth()); // Dispatching the checkAuth action on mount
  }, [dispatch]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br
      from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/email'
          element={<EmailVerificationPage />}
        />
        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Catch all other routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;
