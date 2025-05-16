import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // 1️⃣ While we're waiting for /me → show nothing (or a spinner)
  if (loading) {
    return null; // or return <LoadingSpinner /> if you have one
  }

  // 2️⃣ If loading is done and we still have no user → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ We have a user → render the protected outlet
  return <Outlet />;
}
