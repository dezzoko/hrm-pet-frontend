import {
    fetchBaseQuery,

} from '@reduxjs/toolkit/query/react';
import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
} from '../constants';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
    },
});
