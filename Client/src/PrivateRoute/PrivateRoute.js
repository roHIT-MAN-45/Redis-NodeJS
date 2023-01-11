import React from "react";

// React Router
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Accessing local storage 📦
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // This code redirects User to the login page on refresh(did not log out user 🔒)
  return userDetails?._id ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
