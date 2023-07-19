import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';

export default function PrivateRoute ({ component: Component, redirectTo = '/' }) {
  const { token, isRefreshing } = useAuth();

  const shouldRedirect = !token && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
