import { useState } from 'react';
import { useGetCourseByIdMutation, useGetMyCoursesQuery } from '../../model/api/course.api';
import { CourseItem } from '../CourseItem/CourseItem';
import { StyledTH, StyledTHead, StyledTable } from '@/shared/ui/micro-components/micro-components';
import { Modal, PaginationBar } from '@/shared/ui';
import { CourseCard } from '../CourseCard/CourseCard';

interface CoursesListProps {
}
export function CoursesList(props: CoursesListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data, isLoading, error,
    } = useGetMyCoursesQuery(currentPage);
    const [isOpen, setIsOpen] = useState(false);

    const [courseMutation, { data: course, isLoading: isCourseLoading }] = useGetCourseByIdMutation();
    const closeModal = () => {
        setIsOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return error;
    }
    const handlePageChange = (page:any) => {
        setCurrentPage(page);
    };

    const onItemSelect = (courseId:number) => {
        courseMutation(courseId).unwrap().then(() => {
            setIsOpen(true);
        });
    };

    const onItemChange = (open:boolean) => {
        setIsOpen(open);
    };

    return (
        <>

            <Modal isOpen={isOpen} setClose={closeModal}>
                <div style={{
                    padding: '',
                    // width: '200px',
                    background: 'white',
                }}
                >
                    {isCourseLoading ? 'Loading...' : <CourseCard onItemChange={onItemChange} course={course!} />}
                </div>
            </Modal>

            <StyledTable width="100%" textAlign="left">
                <StyledTHead height="30px" textAlign="center">
                    <tr>
                        <StyledTH>Name</StyledTH>
                        <StyledTH>Category</StyledTH>
                        <StyledTH>Approved</StyledTH>
                    </tr>
                </StyledTHead>
                <tbody>
                    {data?.data.map((course) => (
                        <CourseItem onClick={onItemSelect} key={course.id} course={course}></CourseItem>
                    ))}
                </tbody>
            </StyledTable>
            <PaginationBar currentPage={currentPage} onPageChange={handlePageChange} totalPages={data?.totalPages} />
        </>
    );
}
