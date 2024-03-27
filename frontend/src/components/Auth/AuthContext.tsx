import { Context, createContext } from 'react';
import { IAuthData } from './Auth';

const AuthContext: Context<IAuthData | null> = createContext<IAuthData | null>(null);

export default AuthContext;