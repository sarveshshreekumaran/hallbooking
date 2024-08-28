import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;
  if (!accessToken) {
    return <Navigate to="/user/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
