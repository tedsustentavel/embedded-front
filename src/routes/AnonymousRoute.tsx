import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../hooks/auth';

export function AnonymousRoute({ children }: any) {
  const { user } = useContext(AuthContext) as AuthContextType;

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
