import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/micro-components/micro-components';

interface UserAuthFormProps {
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
      box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.75);

    border-radius:${({ theme }) => theme.sizes.borderRadius.medium}px;
    height:400px;
    width:500px;
    padding: 40px 60px;
    background-color:transparent;
`;
const TitleContainer = styled.div`
    
`;
const InputContainer = styled.div`
    height:100%;
    width:100%;
    display:flex;
    row-gap:10px;
    flex-direction:column;
    justify-content:center;
`;
export function UserAuthForm(props: UserAuthFormProps) {
    const { t } = useTranslation();
    return (

        <StyledForm>
            <TitleContainer>
                {t('sign-in')}
            </TitleContainer>
            <InputContainer>
                <Input label="Username" placeholder="Login" />
                <Input label="Password" placeholder="Password" type="password" />
            </InputContainer>

        </StyledForm>
    );
}
