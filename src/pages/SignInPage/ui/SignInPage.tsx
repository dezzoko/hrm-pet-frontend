import styled from 'styled-components';
import { UserAuthForm } from '@/features/UserAuth';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

export function SignInPage() {
    return (
        <StyledWrapper>
            <UserAuthForm />
        </StyledWrapper>
    );
}
