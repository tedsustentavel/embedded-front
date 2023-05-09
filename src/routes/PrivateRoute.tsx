import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext, AuthContextType } from '../hooks/auth';

function PrivateRoute({ children }: any) {
  const { user } = useContext(AuthContext) as AuthContextType;

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
