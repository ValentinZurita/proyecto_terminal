// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;