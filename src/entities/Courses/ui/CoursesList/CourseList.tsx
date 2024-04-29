import styled from 'styled-components';
import { CourseItem } from '../CourseItem/CourseItem';
import { StyledTH, StyledTHead, StyledTable } from '@/shared/ui/micro-components/micro-components';
import { PaginationBar } from '@/shared/ui';
import { Course } from '../../model/types/course';

interface CoursesListProps {
    data?: Course[];
    isLoading: boolean;

    showDateCreated?: boolean;
    showDateUpdated?: boolean;
    showCreator?: boolean;
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
        showCreator, showDateCreated, showDateUpdated,
    } = props;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onSelect = (courseId:number) => {
        onCourseSelected(courseId);
    };

    return (
        <>

            <StyledTable width="100%">
                <StyledTHead height="30px" textAlign="center">
                    <tr>
                        <StyledTH>Название</StyledTH>
                        <StyledTH>Категория</StyledTH>
                        {showCreator && <StyledTH>Создатель</StyledTH>}
                        {showDateCreated && <StyledTH>Дата создания</StyledTH>}
                        {showDateUpdated && <StyledTH>Дата обновления</StyledTH>}
                        <StyledTH>Подтвержден</StyledTH>
                        {data?.find((item) => item.isApproved) && <StyledTH>Дата подтверждения</StyledTH>}
                    </tr>
                </StyledTHead>
                <tbody>
                    {data?.map((course) => (
                        <CourseItem
                            showCreator={showCreator}
                            showDateCreated={showDateCreated}
                            showDateUpdated={showDateUpdated}
                            onClick={onSelect}
                            key={course.id}
                            course={course}
                        >
                        </CourseItem>
                    ))}
                </tbody>
            </StyledTable>
            <StyledButtonContainer>

            </StyledButtonContainer>
            <PaginationBar currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </>
    );
}
