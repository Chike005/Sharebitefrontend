import { useUser } from 'context/userContext';
import { Navigate } from 'react-router-dom';
import paths from './path';

const ProtectedRoute = ({ children, staffOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />;
  }

  if (staffOnly && !user?.is_staff) {
    return (
      <Navigate
        to={
          user?.is_donor
            ? paths.donordashboard
            : user?.is_receiver
              ? paths.recieverdashboard
              : paths.home
        }
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
