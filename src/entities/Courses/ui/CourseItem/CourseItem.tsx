import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Course } from '../../model/types/course';
import { StyledTRow, StyledTd } from '@/shared/ui/micro-components/micro-components';

interface CourseItemProps {
    course:Course;
    onClick:(courseId:number)=>void;
    showDateCreated?: boolean;
    showDateUpdated?: boolean;
    showCreator?: boolean;
}

const SelectableTrow = styled(StyledTRow)`
&:hover {
    cursor: pointer;
    opacity: 0.7;
}

`;
export function CourseItem(props: CourseItemProps) {
    const {
        course, onClick, showCreator, showDateCreated, showDateUpdated,
    } = props;

    const onClickHandler = () => {
        onClick(course?.id);
    };
    return (
        <SelectableTrow onClick={onClickHandler} height="25px">
            <StyledTd>
                {course?.name}
            </StyledTd>
            <StyledTd
                textAlign="center"
            >
                {course?.courseCategory?.name}
            </StyledTd>
            {showCreator && (
                <StyledTd
                    textAlign="center"
                >
                    {course?.user?.email}
                </StyledTd>
            )}
            {showDateCreated && (
                <StyledTd
                    textAlign="center"
                >
                    {course.created_at && format(new Date(course.created_at), 'dd.MM.yyyy')}
                </StyledTd>
            )}

            {showDateUpdated && (
                <StyledTd
                    textAlign="center"
                >
                    {course?.updated_at && format(new Date(course?.updated_at), 'dd.MM.yyyy')}
                </StyledTd>
            )}
            <StyledTd
                textAlign="center"
            >
                {course?.isApproved ? <FontAwesomeIcon color="green" icon={['fas', 'check']} />
                    : <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />}
            </StyledTd>
            {course.approvedAt && (
                <StyledTd
                    textAlign="center"
                >
                    {format(new Date(course.approvedAt), 'dd.MM.yyyy')}
                </StyledTd>
            )}

        </SelectableTrow>
    );
}
