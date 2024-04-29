import styled from 'styled-components';
import { useMemo } from 'react';
import { CourseItem } from '../CourseItem/CourseItem';
import { PaginationBar } from '@/shared/ui';
import { Course } from '../../model/types/course';

const StyledTable = styled.div`
    display: flex;
    border: 1px solid rgb(204, 204, 204,0.5);
    flex-direction: column;
    border-collapse: collapse;
    width: 100%; 
`;

export const StyledRow = styled.div`
    display: flex;

    &.header{
    font-weight: bold;
    background-color: #f2f2f2;
    }

    &.selectable{
        cursor: pointer;
        opacity: 0.7;
    }
`;

export const StyledCell = styled.div`
    border: 1px solid #ccc;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    flex: 1; 

    &.small{
        flex: 0 0 10%; 
    }

`;

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

    const showDateApproved = useMemo(() => !!data?.find((item) => item.isApproved), [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onSelect = (courseId:number) => {
        onCourseSelected(courseId);
    };

    return (
        <>

            <StyledTable>
                <StyledRow className="header">
                    <StyledCell>Название</StyledCell>
                    <StyledCell>Категория</StyledCell>
                    {showCreator && <StyledCell>Создатель</StyledCell>}
                    {showDateCreated && <StyledCell className="small">Дата создания</StyledCell>}
                    {showDateUpdated && <StyledCell className="small">Дата обновления</StyledCell>}
                    <StyledCell className="small">Подтвержден</StyledCell>
                    {showDateApproved && <StyledCell>Дата подтверждения</StyledCell>}
                </StyledRow>
                {data?.map((course) => (
                    <CourseItem
                        showCreator={showCreator}
                        showDateCreated={showDateCreated}
                        showDateUpdated={showDateUpdated}
                        showDateApproved={showDateApproved}
                        onClick={onSelect}
                        key={course.id}
                        course={course}
                    >
                    </CourseItem>
                ))}
            </StyledTable>
            <StyledButtonContainer>

            </StyledButtonContainer>
            <PaginationBar currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </>
    );
}
