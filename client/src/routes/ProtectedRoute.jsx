import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  if (!accessToken) {
    return <Navigate to="/user/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
