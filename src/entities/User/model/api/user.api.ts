import { createApi } from '@reduxjs/toolkit/query/react';
import { userActions } from '../slices/user.slice';
import { User } from '../types/user';
import { customBaseQuery } from '@/shared/api/base-query';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => 'user/profile',
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userActions.setUserData(data));
                    dispatch(userActions.setAuth(true));
                } catch (error) {
                    dispatch(userActions.setAuth(false));
                    dispatch(userActions.setUserData(undefined));
                }
            },
            providesTags: ['User'],
        }),
        getUser: builder.query<User, number>({
            query: (id) => `user/${id}`,
            providesTags: ['User'],
        }),
    }),
});

export const { useGetMeQuery, useGetUserQuery } = userApi;
