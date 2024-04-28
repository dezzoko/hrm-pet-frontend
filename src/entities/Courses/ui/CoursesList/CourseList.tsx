import styled from 'styled-components';
import { CourseItem } from '../CourseItem/CourseItem';
import { StyledTH, StyledTHead, StyledTable } from '@/shared/ui/micro-components/micro-components';
import { PaginationBar } from '@/shared/ui';
import { Course } from '../../model/types/course';

interface CoursesListProps {
    data?: Course[];
    isLoading: boolean;

    handlePageChange:(page:number)=>void;
    currentPage:number;
    totalPages?:number;
    onCourseSelected:(courseId:number)=>void;
}

const StyledButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
`;
export function CoursesList(props: CoursesListProps) {
    const {
        data, isLoading, onCourseSelected, totalPages,
        handlePageChange, currentPage,
    } = props;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onSelect = (courseId:number) => {
        onCourseSelected(courseId);
    };

    return (
        <>

            <StyledTable width="100%" textAlign="left">
                <StyledTHead height="30px" textAlign="center">
                    <tr>
                        <StyledTH>Название</StyledTH>
                        <StyledTH>Категория</StyledTH>
                        <StyledTH>Подтвержден</StyledTH>
                    </tr>
                </StyledTHead>
                <tbody>
                    {data?.map((course) => (
                        <CourseItem onClick={onSelect} key={course.id} course={course}></CourseItem>
                    ))}
                </tbody>
            </StyledTable>
            <StyledButtonContainer>

            </StyledButtonContainer>
            <PaginationBar currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </>
    );
}
