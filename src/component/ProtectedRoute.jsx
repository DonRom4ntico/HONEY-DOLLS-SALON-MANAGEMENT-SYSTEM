import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  // 🚫 If no token → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // normalize role (prevents spacing/case bugs)
    const role = decoded?.role?.trim().toLowerCase();

    console.log("Decoded Role:", role);
    console.log("Allowed Roles:", allowedRoles);
    console.log("Access Allowed:", allowedRoles.includes(role));

    // 🚫 If role not allowed
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/dashboard" replace />;
    }

    // ✅ Allowed
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}
