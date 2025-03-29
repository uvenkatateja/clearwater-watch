
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [isDemoUser, setIsDemoUser] = useState(false);
  const location = useLocation();

  // Check if user accessed this route after clicking Demo Login
  useEffect(() => {
    // Get demo login status from session storage
    const demoStatus = sessionStorage.getItem('demoLogin');
    if (demoStatus === 'true') {
      setIsDemoUser(true);
    }
    
    // Check if this is a direct navigation from login page
    const fromLogin = location.state?.fromDemoLogin;
    if (fromLogin) {
      setIsDemoUser(true);
      sessionStorage.setItem('demoLogin', 'true');
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 p-10">
        <Skeleton className="h-[50px] w-3/4 rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    );
  }

  // Allow access if user is authenticated or is using demo mode
  if (!currentUser && !isDemoUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
