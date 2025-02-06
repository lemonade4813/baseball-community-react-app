import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/Authcontext';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
  const {isLogined} = useAuth();

  return isLogined ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
