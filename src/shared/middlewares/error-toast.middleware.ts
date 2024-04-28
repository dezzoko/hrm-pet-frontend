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
        console.log('ERROR', action.payload.data.message);

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { message } = action?.payload?.data;

        if (Array.isArray(message)) {
            toast.warn(message.join(', '));
        } else {
            toast.warn(message);
        }
    }

    return next(action);
};
