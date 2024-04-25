import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action:any) => {
    if (isRejectedWithValue(action)) {
        if (action.payload.status === 'FETCH_ERROR') {
            toast.error('Failed to fetch data');

            return next(action);
        }
        const { message } = action?.payload?.data as {message:string};
        toast.warn(message);
    }

    return next(action);
};
