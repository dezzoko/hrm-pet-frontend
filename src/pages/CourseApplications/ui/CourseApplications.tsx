import { useState } from 'react';
import {
    SearchParams, useApproveCourseMutation, useGetCourseApplicationsQuery, useGetCourseByIdMutation,
} from '@/entities/Courses';
import { CoursesList } from '@/entities/Courses/ui/CoursesList/CourseList';
import { Modal } from '@/shared/ui';
import { CourseCard } from '@/entities/Courses/ui/CourseCard/CourseCard';
import { Course } from '@/entities/Courses/model/types/course';
import { FindSortAndFilterCourses, SortFilterCoursesInputs } from '@/features/FindSortAndFilterCourses';

export function CourseApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [filterParams, setFilterParams] = useState<SearchParams>({
        searchField: '',
        approved: false,
    });
    const { data, isLoading } = useGetCourseApplicationsQuery({ page: currentPage, ...filterParams });
    const [approveCourse] = useApproveCourseMutation();
    const [getCourseById, { data: course, isLoading: isCourseLoading }] = useGetCourseByIdMutation();
    const [isOpenCourse, setIsOpenCourse] = useState(false);

    const closeModal = () => {
        setIsOpenCourse(false);
    };

    const onFilterApply = (data:SortFilterCoursesInputs) => {
        setCurrentPage(1);
        setFilterParams({
            searchField: data.search,
            approved: data.approved,
            categoryId: data.categoryId,
        });
    };

    const onItemSave = (course:Partial<Course>) => {
        approveCourse(course.id!);
        setIsOpenCourse(false);
    };

    const onCourseSelected = (courseId:number) => {
        getCourseById(courseId).unwrap().then(() => {
            setIsOpenCourse(true);
        });
    };

    return (
        <div>
            <Modal isOpen={isOpenCourse} setClose={closeModal}>
                <div style={{
                    padding: '',
                    // width: '200px',
                    background: 'white',
                }}
                >
                    {isCourseLoading ? 'Loading...' : (
                        <CourseCard
                            isApproveEditing
                            isLoading={isCourseLoading}
                            onSave={onItemSave}
                            onClose={() => setIsOpenCourse(false)}
                            course={course!}
                        />
                    )}
                </div>
            </Modal>
            <FindSortAndFilterCourses onSubmitInfo={onFilterApply} />
            <CoursesList
                showCreator
                showDateCreated
                showDateUpdated
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                isLoading={isLoading}
                onCourseSelected={onCourseSelected}
                data={data?.data}
                totalPages={data?.totalPages}
            >
            </CoursesList>
        </div>
    );
}
