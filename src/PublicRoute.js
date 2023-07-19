import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

export default function PublicRoute  ({ component: Component, redirectTo = '/' }) {
  const { token } = useAuth();

  return token ? <Navigate to={redirectTo} /> : Component;
};
