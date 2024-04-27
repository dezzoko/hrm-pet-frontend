import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/shared/api/base-query';
import { Paginated } from '@/shared/api';
import { Course } from '../types/course';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        getMyCourses: builder.query<Paginated<Course>, number>({
            query: (page = 1) => `course/my-courses?page=${page}`,
            providesTags: ['Course'],
        }),
        getCourseById: builder.mutation<Course, number>({
            query: (id) => ({ url: `course/${id}`, method: 'GET' }),
            invalidatesTags: ['Course'],
        }),
        updateCourse: builder.mutation<Course, Partial<Course>>({
            query: (body) => ({ body, url: 'course/', method: 'PATCH' }),
            invalidatesTags: ['Course'],
        }),

    }),
});

export const { useGetMyCoursesQuery, useGetCourseByIdMutation, useUpdateCourseMutation } = courseApi;
