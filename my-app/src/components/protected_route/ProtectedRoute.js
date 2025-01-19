import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ authedUser, children }) {
  const location = useLocation();
  console.log("AuthedUser in protectedroute:", authedUser)

  if (!authedUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
