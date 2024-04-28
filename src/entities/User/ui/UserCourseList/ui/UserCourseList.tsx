import { useState } from 'react';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { useCreateCourseMutation, useGetCourseByIdMutation, useGetMyCoursesQuery } from '@/entities/Courses';
import { Course } from '@/entities/Courses/model/types/course';
import { CourseCard } from '@/entities/Courses/ui/CourseCard/CourseCard';
import { CoursesList } from '@/entities/Courses/ui/CoursesList/CourseList';
import { CreateCourseCard } from '@/entities/Courses/ui/CreateCourseCard/CreateCourseCard';
import { Button, Modal } from '@/shared/ui';

interface UserCourseListProps {
}
export function UserCourseList(props: UserCourseListProps) {
    const userId = useAppSelector((state) => state.userReducer.user?.id);
    const [courseMutation, { data: course, isLoading: isCourseLoading }] = useGetCourseByIdMutation();
    const [createCourseMutation, { isLoading: isCourseCreateLoading }] = useCreateCourseMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const {
        data, isLoading, error,
    } = useGetMyCoursesQuery(currentPage);

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };
    const onItemSaved = (item:Partial<Course> & {courseCategoryId:number}) => {
        setIsCreateModalOpen(false);
        createCourseMutation({ userId: userId!, ...item });
    };

    const onItemChange = (open:boolean) => {
        setIsOpen(open);
    };
    const onItemSelect = (courseId:number) => {
        courseMutation(courseId).unwrap().then(() => {
            setIsOpen(true);
        });
    };
    return (
        <>
            <Modal isOpen={isCreateModalOpen} setClose={closeCreateModal}>
                <div style={{
                    padding: '',
                    // width: '200px',
                    background: 'white',
                }}
                >
                    <CreateCourseCard onClose={() => setIsCreateModalOpen(false)} onItemSaved={onItemSaved} />
                </div>
            </Modal>

            <Modal isOpen={isOpen} setClose={closeModal}>
                <div style={{
                    padding: '',
                    // width: '200px',
                    background: 'white',
                }}
                >
                    {isCourseLoading ? 'Loading...' : (
                        <CourseCard
                            onItemChange={onItemChange}
                            onClose={() => setIsOpen(false)}
                            course={course!}
                        />
                    )}
                </div>
            </Modal>

            <CoursesList
                currentPage={currentPage}
                data={data?.data}
                isLoading={isLoading}
                onCourseSelected={onItemSelect}
                totalPages={data?.totalPages}
                handlePageChange={(page) => setCurrentPage(page)}

            />
            <Button onClick={() => { setIsCreateModalOpen(true); }}>Добавить</Button>

        </>
    );
}