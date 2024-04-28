import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema, User } from '../types/user';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_REFRESH_TOKEN_KEY } from '@/shared/constants';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
            state._inited = true;
        },
        setUserData: (state, action:PayloadAction<User | undefined>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
            localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
