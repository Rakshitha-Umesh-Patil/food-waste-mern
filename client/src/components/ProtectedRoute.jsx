import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // Allowed
  return children;
}