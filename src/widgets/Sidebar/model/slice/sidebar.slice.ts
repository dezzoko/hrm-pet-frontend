import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarSchema } from '../types/sidebar';

const initialState: SidebarSchema = {
    isOpen: true,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setPath(state, action: PayloadAction<string>) {
            state.selectedPath = action.payload;
        },
    },
});

export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;
