import { createSlice } from '@reduxjs/toolkit';
import { CourseSchema } from '../types/course';

const initialState: CourseSchema = {
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {

    },
});

export const { actions: courseActions } = courseSlice;
export const { reducer: courseReducer } = courseSlice;
