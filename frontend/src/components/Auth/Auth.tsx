import React, { useCallback, useMemo, useState } from "react";
import AuthContext from "./AuthContext";

interface IProps {
  children: React.ReactNode;
}

export interface IData {
  username: string;
  password: string;
  email: string;
  id: number;
}

export interface IAuthData {
  logIn: (data: IData) => void;
  logOut: () => void;
  user: IData | null;
}

const Auth: React.FC<IProps> = ({ children }) => {
  const saveUserDataString = localStorage.getItem('user');
  const saveUserData = saveUserDataString ? JSON.parse(saveUserDataString) : null;
  const [user, setUser] = useState<IData | null>(saveUserData ? {
    username: saveUserData.username,
    password: saveUserData.password,
    email: saveUserData.email,
    id: saveUserData.id,
  }: null);

  const logIn = useCallback((data:IData) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser({ username: data.username, password: data.password, email: data.email, id:data.id });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const data:IAuthData = useMemo(() => ({
    logIn,
    logOut,
    user
  }), [logIn, logOut, user]);

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth;