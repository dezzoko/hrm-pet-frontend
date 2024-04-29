import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/shared/api/base-query';
import { Paginated } from '@/shared/api';
import { Course } from '../types/course';

export interface SearchParams {
    searchField?:string,
    approved?:boolean,
    categoryId?:number,
    page?:number
}
export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        getCourseApplications: builder.query<Paginated<Course>, SearchParams>({
            query: ({
                page = 1, approved = false, categoryId, searchField,
            }) => {
                let query = `teacher/course/?page=${page}&approved=${approved}`;
                if (categoryId) {
                    query = `${query}&course-category-id=${categoryId}`;
                }
                if (searchField) {
                    query = `${query}&search-field=${searchField}`;
                }
                return query;
            },
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
        createCourse: builder.mutation<
        Course,
        Partial<Course & { userId: number }>>({
            query: (body) => ({ body, url: 'course/', method: 'POST' }),
            invalidatesTags: ['Course'],
        }),
        getMyCourses: builder.query<Paginated<Course>, number>({
            query: (page = 1) => `course/my-courses/?page=${page}`,
            providesTags: ['Course'],
        }),
        approveCourse: builder.mutation<Course, number>({
            query: (id) => ({ url: `teacher/course/approve/${id}`, method: 'PATCH' }),
            invalidatesTags: ['Course'],
        }),
    }),
});

export const {
    useGetMyCoursesQuery,
    useGetCourseByIdMutation,
    useUpdateCourseMutation,
    useCreateCourseMutation,
    useGetCourseApplicationsQuery,
    useApproveCourseMutation,
} = courseApi;
