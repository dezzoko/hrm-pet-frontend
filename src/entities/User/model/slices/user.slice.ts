import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema, User } from '../types/user';

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
            state._inited = true;
        },
        logout: (state) => {
            state.isAuth = false;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
