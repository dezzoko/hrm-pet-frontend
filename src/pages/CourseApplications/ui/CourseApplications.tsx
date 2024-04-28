import { useState } from 'react';
import { useGetCourseApplicationsQuery, useGetCourseByIdMutation } from '@/entities/Courses';
import { CoursesList } from '@/entities/Courses/ui/CoursesList/CourseList';
import { Modal } from '@/shared/ui';
import { CourseCard } from '@/entities/Courses/ui/CourseCard/CourseCard';

export function CourseApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const { data, isLoading } = useGetCourseApplicationsQuery(currentPage);
    const [getCourseById, { data: course, isLoading: isCourseLoading }] = useGetCourseByIdMutation();
    const [isOpenCourse, setIsOpenCourse] = useState(false);

    const closeModal = () => {
        setIsOpenCourse(false);
    };
    console.log(isLoading, data);

    const onItemChange = (open:boolean) => {
        setIsOpenCourse(open);
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
                            onItemChange={onItemChange}
                            onClose={() => setIsOpenCourse(false)}
                            course={course!}
                        />
                    )}
                </div>
            </Modal>
            <CoursesList
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
