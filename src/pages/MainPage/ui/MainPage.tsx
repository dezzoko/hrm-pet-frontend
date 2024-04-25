import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Title1 } from '@/shared/ui';
import { RoutePath } from '@/app/providers/router/config/route-config';

const StyledMainPage = styled.div`
display:flex;
flex-direction: column;
height:100%;
justify-content:center;
align-items:center;
`;
const StyledButtonContainer = styled.div`
display:flex;
column-gap: 10px;
`;
export function MainPage() {
    const navigate = useNavigate();
    return (
        <StyledMainPage>
            <Title1>
                HRM DIPLOMA PROJECT
            </Title1>
            <StyledButtonContainer>
                <Button width="150" onClick={() => navigate(RoutePath.sign_in)}>Signin</Button>
                <Button onClick={() => navigate('')} width="150">View README</Button>
            </StyledButtonContainer>
        </StyledMainPage>
    );
}
