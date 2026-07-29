import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const READER_SITE_URL = import.meta.env.VITE_READER_SITE_URL;

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const isAuthor = user?.role === 'AUTHOR';

  useEffect(() => {
    // If auth check is finished, user is logged in, but IS NOT an author
    if (!isLoading && user && !isAuthor) {
      // Redirect to the external reader website
      window.location.href = `${READER_SITE_URL}/login`;
    }
  }, [user, isAuthor, isLoading]);

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthor) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};