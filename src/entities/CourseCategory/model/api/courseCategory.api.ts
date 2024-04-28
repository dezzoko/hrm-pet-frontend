import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/shared/api/base-query';
import { CourseCategory } from '../types/courseCategory';

export const courseCategoryApi = createApi({
    reducerPath: 'courseCategoryApi',
    baseQuery: customBaseQuery,
    tagTypes: ['CourseCategory'],
    endpoints: (builder) => ({
        findCoursesCategories: builder.query<CourseCategory[], string>({
            query: (searchField) => `course-category/search?search-field=${searchField}`,
            providesTags: ['CourseCategory'],
        }),
    }),
});

export const {
    useFindCoursesCategoriesQuery,
    useLazyFindCoursesCategoriesQuery,
} = courseCategoryApi;
