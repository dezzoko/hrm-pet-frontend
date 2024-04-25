import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_REFRESH_TOKEN_KEY, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../constants';
import { baseQuery } from '.';

interface RefreshTokensResult {
    accessToken: string;
    refreshToken: string;
}
export const customBaseQuery: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const { dispatch } = api;

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: '/auth/grant-tokens',
                method: 'POST',
                body: {
                    refreshToken: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY),
                },
            },
            api,
            extraOptions,
        );
        const data = refreshResult.data as RefreshTokensResult;
        if (data) {
            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken);
            localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data.refreshToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, '');
            localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, '');
            dispatch(userActions.setUserData(undefined));
        }
    }
    return result;
};
