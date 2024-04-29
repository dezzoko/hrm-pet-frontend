import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Course } from '../../model/types/course';
import { StyledTRow, StyledTd } from '@/shared/ui/micro-components/micro-components';
import { StyledCell, StyledRow } from '../CoursesList/CourseList';

interface CourseItemProps {
    course:Course;
    onClick:(courseId:number)=>void;
    showDateCreated?: boolean;
    showDateUpdated?: boolean;
    showCreator?: boolean;
    showDateApproved?:boolean;
}

export function CourseItem(props: CourseItemProps) {
    const {
        course, onClick, showCreator, showDateCreated, showDateUpdated,
        showDateApproved,
    } = props;

    const onClickHandler = () => {
        onClick(course?.id);
    };
    return (
        <StyledRow className="selectable" onClick={onClickHandler}>
            <StyledCell>
                {course?.name}
            </StyledCell>
            <StyledCell>
                {course?.courseCategory?.name}
            </StyledCell>
            {showCreator && (
                <StyledCell>
                    {course?.user?.email}
                </StyledCell>
            )}
            {showDateCreated && (
                <StyledCell className="small">
                    {course.created_at && format(new Date(course.created_at), 'dd.MM.yyyy')}
                </StyledCell>
            )}

            {showDateUpdated && (
                <StyledCell className="small">
                    {course?.updated_at && format(new Date(course?.updated_at), 'dd.MM.yyyy')}
                </StyledCell>
            )}
            <StyledCell className="small">
                {course?.isApproved ? <FontAwesomeIcon color="green" icon={['fas', 'check']} />
                    : <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />}
            </StyledCell>
            {showDateApproved && (
                <StyledCell>
                    {course.approvedAt && format(new Date(course.approvedAt), 'dd.MM.yyyy')}
                </StyledCell>
            )}

        </StyledRow>
    );
}
