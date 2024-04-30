import { createApi } from '@reduxjs/toolkit/query/react';
import { SignInInput, SignInResult } from '../types/auth';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_REFRESH_TOKEN_KEY } from '@/shared/constants';
import { userActions, userApi } from '@/entities/User';
import { customBaseQuery } from '@/shared/api/base-query';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<SignInResult, SignInInput>({
            query: (data: any) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(undefined));
                    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken);
                    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data.refreshToken);
                    dispatch(userActions.setAuth(true));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
