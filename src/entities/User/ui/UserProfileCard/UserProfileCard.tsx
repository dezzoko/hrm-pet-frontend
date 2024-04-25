/* eslint-disable i18next/no-literal-string */
import styled from 'styled-components';
import {
    Avatar,
} from '@/shared/ui';
import { User } from '../../model/types/user';
import { Title2 } from '@/shared/ui/micro-components/micro-components';

interface UserProfileCardProps {
    user:User;
}

const MainInfoContainer = styled.div`
    display:flex;
    column-gap: 10px;
    align-items:center;
    margin-bottom: 10px;
    `;

const InformationContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:10px;
    margin-bottom: 10px;
`;

const OrganizationContainer = styled.div`
    display:flex;
    margin-top: 10px;
    column-gap: 10px;
`;
export function UserProfileCard(props: UserProfileCardProps) {
    const { user } = props;

    return (
        <>

            <MainInfoContainer>
                <Avatar src="https://placehold.co/150x150" />
                <Title2>
                    {user?.name}
                    {user?.surname}
                </Title2>
            </MainInfoContainer>

            <InformationContainer>
                <div>Дожность</div>
                <div>Роль</div>
                <div>
                    Профессиональный уровень
                </div>
                <div>Уровень английского</div>
            </InformationContainer>

            <Title2>Организационная информация</Title2>
            <OrganizationContainer>
                <div>Отдел</div>
                <div>Подразделение</div>
            </OrganizationContainer>
        </>
    );
}
