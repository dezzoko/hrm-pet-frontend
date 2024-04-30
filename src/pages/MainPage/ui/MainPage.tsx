import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Title1 } from '@/shared/ui';
import { RoutePath } from '@/app/providers/router/config/route-config';

const StyledMainPage = styled.div`
display:flex;
flex-direction: column;
height:100vh;
justify-content:center;
align-items:center;
`;
const StyledButtonContainer = styled.div`
display:flex;
margin-top:10px;
column-gap: 10px;
`;
export function MainPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <StyledMainPage>
            <Title1>
                {t('main_page_name')}
            </Title1>
            <StyledButtonContainer>
                <Button width="150" onClick={() => navigate(RoutePath.sign_in)}>{t('sign-in')}</Button>
                <Button onClick={() => navigate('')} width="150">{t('view_readme')}</Button>
            </StyledButtonContainer>
        </StyledMainPage>
    );
}
