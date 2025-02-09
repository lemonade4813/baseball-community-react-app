import { Navigate } from 'react-router-dom';
import { useUserInfo } from '../../store/useUserInfoStore';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
  const { isLogined } = useUserInfo();

  return isLogined ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
