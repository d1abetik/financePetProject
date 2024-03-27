import { useContext } from 'react';
import { IAuthData } from './Auth.tsx';

import AuthContext from './AuthContext.tsx';

const useAuth = (): IAuthData => {
  const authData = useContext(AuthContext);
  return authData || { logIn: () => {}, logOut: () => {}, user: null };
};

export default useAuth;