import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ authedUser, children }) {
  const location = useLocation();
  localStorage.setItem("lastAccessedPage", location.pathname);

  if (!authedUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
