import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userApi, userReducer } from '@/entities/User';
import { authApi } from '@/features/UserAuth/model/api/auth.api';
import { rtkQueryErrorLogger } from '@/shared/middlewares/error-toast.middleware';

export const store = configureStore({
    reducer: combineReducers({
        userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        rtkQueryErrorLogger,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
