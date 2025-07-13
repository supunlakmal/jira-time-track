import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user, userLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push('/auth/login');
    } else if (roles && user && !roles.includes(user.role)) {
      // Optional: Redirect to an unauthorized page if roles don't match
      router.push('/404'); // Or a specific unauthorized page
    }
  }, [userLoggedIn, user, roles, router]);

  if (userLoggedIn) {
    if (roles && user && !roles.includes(user.role)) {
      return null; // Or a loading spinner while redirecting
    }
    return <>{children}</>;
  }

  return null; // Or a loading spinner while redirecting
};

export default PrivateRoute;
