import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[var(--color-gardens)] border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_var(--color-gardens)]"></div>
          <p className="text-[var(--text-high-emphasis)] text-lg font-medium tracking-wide">
            Loading Kibun...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
