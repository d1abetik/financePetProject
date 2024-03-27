import { User } from '../../../backend/node_modules/@prisma/client';
import { api } from './api';

export type UserData = Omit<User, 'id'>
type ResponseLoginData = User & {token: string};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: '/u/login',
        method: 'POST',
        body: userData
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: '/u/register',
        method: 'POST',
        body: userData
      }),
    }),
    getAll: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: '/u/getAll',
        method: 'GET',
      }),
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useGetAllQuery } = authApi;
export const { endpoints: { login, register, getAll } } = authApi;