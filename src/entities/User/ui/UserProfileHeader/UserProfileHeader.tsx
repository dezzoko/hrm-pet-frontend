/* eslint-disable i18next/no-literal-string */
import { Tab } from '@headlessui/react';
import styled from 'styled-components';
import { User } from '../../model/types/user';
import { UserProfileCard } from '../..';
import { Typography, TypographyColors } from '@/shared/ui/micro-components/micro-components';
import { CoursesList } from '@/entities/Courses/ui/CoursesList/CourseList';
import { UserCourseList } from '../UserCourseList/ui/UserCourseList';

interface UserProfileHeaderProps {
    user: User;
}

const StyledTabList = styled(Tab.List)`
    display: flex;
    column-gap: 10px;
    margin-bottom: 10px;
    background-color:white;
`;

const StyledTabItem = styled.div<{ selected: boolean }>`
    padding: 10px;
    width:100px;
    border-radius: 10px;
    background-color: ${({ theme, selected }) => (selected ? theme.bgColors.shadowColor : 'white')};
    &:hover {
        opacity: ${({ selected }) => (selected ? 1 : 0.7)};
    }
`;
export function UserProfileHeader(props: UserProfileHeaderProps) {
    const { user } = props;

    return (
        <Tab.Group>
            <StyledTabList>
                <Tab style={{ background: 'none' }}>
                    {({ selected }) => (
                        <StyledTabItem selected={selected}>
                            <Typography color={selected ? TypographyColors.redColor
                                : TypographyColors.primaryColor}
                            >
                                Profile
                            </Typography>
                        </StyledTabItem>
                    )}
                </Tab>
                <Tab style={{ background: 'none' }}>
                    {({ selected }) => (

                        <StyledTabItem selected={selected}>
                            <Typography color={selected ? TypographyColors.redColor
                                : TypographyColors.primaryColor}
                            >
                                Courses
                            </Typography>
                        </StyledTabItem>
                    )}
                </Tab>
            </StyledTabList>
            <Tab.Panels>
                <Tab.Panel>
                    <UserProfileCard user={user} />
                </Tab.Panel>
                <Tab.Panel>
                    <UserCourseList />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
