import { useSelector } from 'react-redux';
import {
    getUser,
    getToken,
    getLoggedIn,
    getIsRefreshing
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isRefreshing = useSelector(getIsRefreshing);
  const user = useSelector(getUser);
  const token = useSelector(getToken);


  return {
    isRefreshing,
    user,
    token, 
  };
};