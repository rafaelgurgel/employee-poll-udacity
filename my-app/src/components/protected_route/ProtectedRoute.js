import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ authedUser, children }) {
  const location = useLocation();

  if (!authedUser) {
    // Redirect to login with the original path as state
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}