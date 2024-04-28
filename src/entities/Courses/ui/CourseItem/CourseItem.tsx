import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Course } from '../../model/types/course';
import { StyledTRow, StyledTd } from '@/shared/ui/micro-components/micro-components';

interface CourseItemProps {
    course:Course;
    onClick:(courseId:number)=>void;
}

const SelectableTrow = styled(StyledTRow)`
&:hover {
    cursor: pointer;
    opacity: 0.7;
}

`;
export function CourseItem(props: CourseItemProps) {
    const { course, onClick } = props;

    const onClickHandler = () => {
        onClick(course?.id);
    };
    return (
        <SelectableTrow onClick={onClickHandler} height="25px">
            <StyledTd width="33%">
                {course?.name}
            </StyledTd>
            <StyledTd
                width="33%"
                textAlign="center"
            >
                {course?.courseCategory?.name}
            </StyledTd>
            <StyledTd
                width="33%"
                textAlign="center"
            >
                {course?.isApproved ? <FontAwesomeIcon color="green" icon={['fas', 'check']} />
                    : <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />}
            </StyledTd>

        </SelectableTrow>
    );
}
