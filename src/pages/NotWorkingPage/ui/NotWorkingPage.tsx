import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    height:100vh;
    align-items: center;
`;

export function NotWorkingPage() {
    const { t } = useTranslation();
    return (
        <StyledWrapper>
            {t('not_working')}
        </StyledWrapper>
    );
}
